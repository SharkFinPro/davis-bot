const Discord = require("discord.js"),
    ical = require("ical");

module.exports = {
    enabled: true,
    description: "Shows the next meeting's info",
    type: "general",
    args: "",
    command: (message, bot) => {
        const today = new Date();
        const calendar = new Discord.MessageEmbed()
            .setColor(0x1E90FF)
            .setThumbnail("https://www.troop520redmond.org/system/files/public/graphics/520patch.png")
            .setTitle("Next meeting info")
        ical.fromURL("https://redmond520.mytroop.us/ical/feed/c2150783-afd0-460a-8991-8392632e75b9", {}, (err, data) => {
            for (const k in data) {
                const ev = data[k];
                const startDate = new Date(ev.start);
                if (startDate.getFullYear() >= today.getFullYear() && !(startDate.getFullYear() === today.getFullYear() && (startDate.getMonth() < today.getMonth() || startDate.getDate() < today.getDate())) && ev.summary.startsWith("Troop Meeting")) {
                    calendar.addField("Time & Place", `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()} @${ev.location}`);
                    calendar.addField("Service Patrol", ev.description.split("\n")[4].split(" - theme ")[0].slice(16));
                    calendar.addField("Theme", ev.description.split("\n")[4].split(" - theme ")[1]);
                    calendar.addField("Advancement", ev.description.split("\n")[6].slice(13));
                    message.channel.send(calendar);
                    return;
                }
            }
        });
    }
};

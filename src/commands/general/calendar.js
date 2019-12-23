const Discord = require("discord.js"),
    ical = require("ical");

module.exports = {
    enabled: true,
    description: "Shows the next 15 scouting activities",
    type: "general",
    args: "",
    command(message, bot) {
        const today = new Date();
        const calendar = new Discord.MessageEmbed()
            .setColor(0x1E90FF)
            .setThumbnail("https://www.troop520redmond.org/system/files/public/graphics/520patch.png")
            .setTitle("Troop 520 Calendar");
        ical.fromURL("https://redmond520.mytroop.us/ical/feed/c2150783-afd0-460a-8991-8392632e75b9", {}, (err, data) => {
            let entries = 0;
            for (const k in data) {
                const startDate = new Date(data[k].start);
                const endDate = new Date(data[k].end);
                if (startDate.getFullYear() >= today.getFullYear() && !(startDate.getFullYear() === today.getFullYear() && (startDate.getMonth() < today.getMonth() || startDate.getDate() < today.getDate())) && entries < 15) {
                    if (data[k].location !== "") {
                        if (startDate.getDate() === endDate.getDate()) {
                            calendar.addField(`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()} @${data[k].location} ${startDate.toLocaleTimeString().replace(/:\d+ /, " ")} > ${endDate.toLocaleTimeString().replace(/:\d+ /, " ")}`, `${data[k].summary}`);
                        } else {
                            calendar.addField(`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()} @${data[k].location}`, `${data[k].summary}`);
                        }
                    } else {
                        if (startDate.getDate() === endDate.getDate()) {
                            calendar.addField(`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()} ${startDate.toLocaleTimeString().replace(/:\d+ /, " ")} > ${endDate.toLocaleTimeString().replace(/:\d+ /, " ")}`, `${data[k].summary}`);
                        } else {
                            calendar.addField(`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`, `${data[k].summary}`);
                        }
                    }
                    entries++;
                }
            }
            message.channel.send(calendar);
        });
    }
};

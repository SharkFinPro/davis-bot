const Discord = require('discord.js'),
    ical = require('ical');

module.exports = {
    enabled: true,
    description: "Shows the next meeting's info",
    type: 'general',
    args: '',
    command: (message, bot) => {
        let today = new Date();
        let calendar = new Discord.MessageEmbed()
            .setColor(0x1E90FF)
            .setThumbnail('https://www.troop520redmond.org/system/files/public/graphics/520patch.png')
            .setTitle(`Next meeting info`)
        ical.fromURL('https://redmond520.mytroop.us/ical/feed/c2150783-afd0-460a-8991-8392632e75b9', {}, (err, data) => {
            let today = new Date();
            for (let k in data) {
                let ev = data[k];
                let startDate = new Date(ev.start);
                if (startDate.getFullYear() >= today.getFullYear() && !(startDate.getFullYear() === today.getFullYear() && (startDate.getMonth() < today.getMonth() || startDate.getDate() < today.getDate())) && ev.summary.startsWith("Troop Meeting")) {
                    let patrol = ev.description.split('\n')[4].split(" - theme ")[0].slice(16);
                    let theme = ev.description.split('\n')[4].split(" - theme ")[1];
                    let advancement = ev.description.split('\n')[6].slice(13);
                    calendar.addField('Time & Place', `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()} @${ev.location}`);
                    calendar.addField('Service Patrol', patrol);
                    calendar.addField('Theme', theme);
                    calendar.addField('Advancement', advancement);
                    message.channel.send(calendar)
                    return;
                }
            }
        });
    }
};

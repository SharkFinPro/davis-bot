const Discord = require('discord.js'),
    ical = require('ical');

module.exports = {
    enabled: true,
    description: 'Shows monthly calender',
    type: 'general',
    args: '',
    command: (message, commandList, config, music) => {
        let today = new Date();
        let calendar = new Discord.RichEmbed()
            .setColor(0x1E90FF)
            .setThumbnail('https://www.troop520redmond.org/system/files/public/graphics/520patch.png')
            .setAuthor(`Troop 520 Calendar`)
        ical.fromURL('https://redmond520.mytroop.us/ical/feed/c2150783-afd0-460a-8991-8392632e75b9', {}, function (err, data) {
            for (let k in data) {
                let ev = data[k];
                let today = new Date();
                let startDate = new Date(ev.start);
                let endDate = new Date(ev.end);
                if (startDate.getFullYear() === today.getFullYear()) {
                    if (startDate.getMonth() + 1 === today.getMonth() + 1) {
                        if (ev.location !== '') {
                            if (startDate.getDate() === endDate.getDate()) calendar.addField(`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()} @${ev.location} ${startDate.toLocaleTimeString().replace(/:\d+ /, ' ')} > ${endDate.toLocaleTimeString().replace(/:\d+ /, ' ')}`, `${ev.summary}`);
                            else calendar.addField(`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()} @${ev.location}`, `${ev.summary}`);
                        } else {
                            if (startDate.getDate() === endDate.getDate()) calendar.addField(`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()} ${startDate.toLocaleTimeString().replace(/:\d+ /, ' ')} > ${endDate.toLocaleTimeString().replace(/:\d+ /, ' ')}`, `${ev.summary}`);
                            else calendar.addField(`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`, `${ev.summary}`);
                        }
                    }
                }
            }
            message.channel.send(calendar)
        });
    }
};

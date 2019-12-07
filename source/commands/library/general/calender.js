"use strict";
const Discord = require('discord.js'),
    ical = require('ical');

module.exports = (message, commandList, config, server) => {
    let today = new Date();
    let calendar = new Discord.RichEmbed()
        .setColor(0x1E90FF)
        .setThumbnail('https://www.troop520redmond.org/system/files/public/graphics/520patch.png')
        .setAuthor(`Troop 520 Calendar`)
    ical.fromURL('https://redmond520.mytroop.us/ical/feed/c2150783-afd0-460a-8991-8392632e75b9', {}, function (err, data) {
        let today = new Date();
        for (let k in data) {
            let ev = data[k];
            let startDate = new Date(ev.start);
            if (startDate.getFullYear() === today.getFullYear()) {
                if (startDate.getMonth() + 1 === today.getMonth() + 1) {
                    if (ev.location !== '') calendar.addField(`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()} @${ev.location}`, `${ev.summary}`);
                    else calendar.addField(`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`, `${ev.summary}`);
                }
            }
        }
        message.channel.send(calendar)
    });
};

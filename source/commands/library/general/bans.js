"use strict";
const Discord = require('discord.js');
module.exports = async (message, commandList, config, server) => {
    message.guild.fetchBans()
        .then((bans) => {
            if (bans.size === 0) return message.channel.send('This server has no bans!');
            let embed = new Discord.MessageEmbed()
                .setColor(0x008B00)
                .setTitle(`**${bans.size} Ban${bans.size > 1 ? 's' : ''}**`);
            bans.forEach((ban) => embed.addField(`**${ban.user.username}#${ban.user.discriminator}**`, '**Reason**: ' + ban.reason));
            message.channel.send(embed);
        });
};

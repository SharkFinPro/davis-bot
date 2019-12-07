"use strict";
const Discord = require('discord.js');
module.exports = (message, commandList, config, server) => {
    let commands = {};
    for (let each in commandList) {
        if (commandList[each].enabled) {
            commands[commandList[each].type] ? true : commands[commandList[each].type] = [];
            commands[commandList[each].type].push(config.prefix + each + (commandList[each].args === '' ? '' : ' [' + commandList[each].args.join('] [') + ']') + ': ' + commandList[each].description);
        }
    }
    let embed = new Discord.RichEmbed()
        .setColor(0xFF1493)
        .setTitle('Commands')
        .setFooter('GENTLEMEN!');
    if (commands.hasOwnProperty('general')) embed.addField('General', commands.general);
    if (commands.hasOwnProperty('music')) embed.addField('Music', commands.music)
    if (commands.hasOwnProperty('mod')) embed.addField('Moderator', commands.mod)
    message.channel.send(embed);
};

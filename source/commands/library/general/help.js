"use strict";
const Discord = require('discord.js');
module.exports = (message, commandList, config, server) => {
    let commands = {};
    for (let each in commandList) {
        commands[commandList[each].type] ? true : commands[commandList[each].type] = [];
        commands[commandList[each].type].push(config.prefix + each + (commandList[each].args === '' ? '' : ' [' + commandList[each].args.join('] [') + ']') + ': ' + commandList[each].description);
    }
    message.reply('Sending you commands in a DM!');
    message.author.send({embed: new Discord.MessageEmbed()
        .setColor(0xFF1493)
        .setTitle('Commands')
        .addField('General', commands.general)
        .addField('Music', commands.music)
        .addField('Moderator', commands.mod)
        .setFooter('GENTLEMEN!')});
};

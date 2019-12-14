const Discord = require('discord.js');

module.exports = {
    enabled: true,
    description: 'Shows list of commands',
    type: 'general',
    args: '',
    command: (message, commandList, config, music) => {
        let commands = {};
        for (let each in commandList) {
            if (commandList[each].enabled) {
                commands[commandList[each].type] ? true : commands[commandList[each].type] = [];
                commands[commandList[each].type].push(config.prefix + each + (commandList[each].args === '' ? '' : ' [' + commandList[each].args.join('] [') + ']') + ': ' + commandList[each].description);
            }
        }
        let embed = new Discord.MessageEmbed()
            .setColor(0xFF1493)
            .setTitle('Commands')
            .setFooter('GENTLEMEN!');
        if (commands.hasOwnProperty('general')) embed.addField('General', commands.general);
        if (commands.hasOwnProperty('music')) embed.addField('Music', commands.music)
        if (commands.hasOwnProperty('mod')) embed.addField('Moderator', commands.mod)
        message.channel.send(embed);
    }
};

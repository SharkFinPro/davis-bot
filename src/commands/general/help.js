const Discord = require('discord.js');

module.exports = {
    enabled: true,
    description: 'Shows list of commands',
    type: 'general',
    args: '',
    command: (message, bot) => {
        const commands = {};
        const commandTypes = [];
        for (const each in bot.commandList) {
            if (bot.commandList[each].enabled) {
                if (!commandTypes.includes(bot.commandList[each].type)) commandTypes.push(bot.commandList[each].type);
                if (!commands[bot.commandList[each].type]) commands[bot.commandList[each].type] = [];
                commands[bot.commandList[each].type].push(bot.config.prefix + each + (bot.commandList[each].args === '' ? '' : ' [' + bot.commandList[each].args.join('] [') + ']') + ': ' + bot.commandList[each].description);
            }
        }
        const embed = new Discord.MessageEmbed()
            .setColor(0xFF1493)
            .setTitle('Commands')
            .setFooter('GENTLEMEN!');
        for (const each of commandTypes) embed.addField(each, commands[each]);
        message.channel.send(embed);
    }
};

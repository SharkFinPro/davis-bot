const Discord = require('discord.js');

module.exports = {
    enabled: true,
    description: 'Display info about the server',
    type: 'general',
    args: '',
    command: (message, commandList, config, music) => {
        message.channel.send(new Discord.MessageEmbed()
            .setColor(0x1E90FF)
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.guild.name} | Server Info`, message.guild.iconURL)
            .addField('Name', message.guild.name, true)
            .addField('Roles', message.guild.roles.size, true)
            .addField('Members', message.guild.memberCount, true)
            .addField('ID', message.guild.id, true)
            .addField('Owner', message.guild.owner.user.tag, true)
            .addField('Humans', message.guild.members.filter((member) => !member.user.bot).size, true)
            .addField('Region', message.guild.region, true)
            .addField('Owner ID', message.guild.ownerID, true)
            .addField('Bots', message.guild.members.filter((member) => member.user.bot).size, true)
            .addField('Channels', message.guild.channels.size, true)
            .addField('Online', message.guild.members.filter((member) => member.user.presence.status !== 'offline').size, true)
            .addField('Custom Emojis', message.guild.emojis.size, true));
    }
};

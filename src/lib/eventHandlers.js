const Discord = require('discord.js'),
    config = require('../config.js');

module.exports = {
    channelCreate: async (channel) => {
        if (channel.type === 'dm') return;
        channel.guild.channels.find(channel => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor(channel.guild.name, channel.guild.iconURL())
            .setThumbnail(channel.guild.iconURL())
            .setDescription(`Channel Created: ${channel.name}`)
            .setTimestamp()
            .setColor('#23d160'));
    },
    channelDelete: async (channel) => {
        if (channel.type === 'dm') return;
        channel.guild.channels.find(channel => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor(channel.guild.name, channel.guild.iconURL())
            .setThumbnail(channel.guild.iconURL())
            .setDescription(`Channel Deleted: ${channel.name}`)
            .setTimestamp()
            .setColor('#ff470f'));
    },
    guildBanAdd: async (guild, user) => {
        guild.channels.find(channel => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor('Member Banned', user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`<@${user.id}> ${user.username}#${user.discriminator}`)
            .setFooter(`User ID: ${user.id}`)
            .setTimestamp()
            .setColor('#ff470f'));
    },
    guildBanRemove: async (guild, user) => {
        guild.channels.find(channel => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor('Member Unbanned', user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`<@${user.id}> ${user.username}#${user.discriminator}`)
            .setFooter(`User ID: ${user.id}`)
            .setTimestamp()
            .setColor('#117ea6'));
    },
    guildMemberAdd: async (member) => {
        member.guild.channels.find(channel => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor('Member Joined', member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`<@${member.user.id}> ${member.user.username}#${member.user.discriminator}`)
            .setFooter(`User ID: ${member.user.id}`)
            .setTimestamp()
            .setColor('#23d160'));
    },
    guildMemberRemove: async (member) => {
        member.guild.channels.find(channel => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor('Member Left', member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`<@${member.user.id}> ${member.user.username}#${member.user.discriminator}`)
            .setFooter(`User ID: ${member.user.id}`)
            .setTimestamp()
            .setColor('#ff470f'));
    },
    messageDelete: async (message) => {
        if (message.channel.type === 'dm') return;
        message.guild.channels.find((channel) => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
            .setDescription(`**Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>**\n${message.content}`)
            .setFooter(`User ID: ${message.author.id}`)
            .setTimestamp()
            .setColor('#ff470f'));
    },
    messageDeleteBulk: async (messages) => {
        messages.first().guild.channels.find((channel) => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor('Bulk Message Delete', messages.first().guild.iconURL())
            .setDescription(`${messages.size} Messages deleted in ${messages.first().channel.name}`)
            .setTimestamp()
            .setColor('#ff470f'));
    },
    messageReactionAdd: async (messageReaction, user) => {
        switch(messageReaction.emoji.name) {
            case '⭐':
                let starBoardHasMessage = false;
                await messageReaction.message.guild.channels.find((channel) => channel.name === 'starboard').messages.fetch()
                    .then((messages) => {
                        messages.forEach((message) => {
                            if (message.embeds[0].footer.text.split(' | ')[1] === messageReaction.message.id) starBoardHasMessage = true;
                        });
                    });
                if (messageReaction.count === config.starboardStars && !starBoardHasMessage) {
                    messageReaction.message = await messageReaction.message.guild.channels.find((channel) => channel.name === messageReaction.message.channel.name).messages.fetch(messageReaction.message.id);
                    messageReaction.message.guild.channels.find((channel) => channel.name === 'starboard').send(new Discord.MessageEmbed()
                        .setColor(0x00FF00)
                        .setAuthor(`${messageReaction.message.author.username}#${messageReaction.message.author.discriminator}`, messageReaction.message.author.avatarURL())
                        .setFooter(`${messageReaction.message.reactions.find((reaction) => messageReaction.emoji.name === '⭐').count}⭐ | ${messageReaction.message.id}`)
                        .addField('Channel', messageReaction.message.channel)
                        .addField('Message', `[${messageReaction.message.content !== '' ? messageReaction.message : 'Jump To'}](${messageReaction.message.url})`)
                        .setImage(messageReaction.message.attachments.first() ? messageReaction.message.attachments.first().url : ''));
                } else await messageReaction.message.guild.channels.find((channel) => channel.name === 'starboard').messages.fetch()
                    .then((messages) => {
                        messages.forEach((message) => {
                            if (message.embeds[0].footer.text.split(' | ')[1] === messageReaction.message.id) message.edit(new Discord.MessageEmbed(message.embeds[0]).setFooter(`${messageReaction.message.reactions.find((reaction) => reaction.emoji.name === '⭐').count}⭐ | ${messageReaction.message.id}`));
                        });
                    });
                break;
        }
    },
    messageReactionRemove: async (messageReaction, user) => {
        switch(messageReaction.emoji.name) {
            case '⭐':
                await messageReaction.message.guild.channels.find((channel) => channel.name === 'starboard').messages.fetch()
                    .then((messages) => {
                        messages.forEach((message) => {
                            if (message.embeds[0].footer.text.split(' | ')[1] === messageReaction.message.id) {
                                if (messageReaction.message.reactions.find((reaction) => messageReaction.emoji.name === '⭐')) message.edit(new Discord.MessageEmbed()
                                    .setColor(0x00FF00)
                                    .setAuthor(`${messageReaction.message.author.username}#${messageReaction.message.author.discriminator}`, messageReaction.message.author.avatarURL())
                                    .setFooter(`${messageReaction.message.reactions.find((reaction) => messageReaction.emoji.name === '⭐').count}⭐ | ${messageReaction.message.id}`)
                                    .addField('Channel', messageReaction.message.channel)
                                    .addField('Message', `[${messageReaction.message.content !== '' ? messageReaction.message : 'Jump To'}](${messageReaction.message.url})`)
                                    .setImage(messageReaction.message.attachments.first() ? messageReaction.message.attachments.first().url : ''));
                                else message.edit(new Discord.MessageEmbed(message.embeds[0]).setFooter(`0⭐ | ${messageReaction.message.id}`));
                            }
                        });
                    })
                    .catch(console.error);
                break;
        }
    },
    messageUpdate: async (oldMessage, newMessage) => {
        if (oldMessage.channel.type === 'dm') return;
        if (oldMessage.content === '' || newMessage.content === '') return;
        if (oldMessage.content === newMessage.content) return;
        oldMessage.guild.channels.find((channel) => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor(`${newMessage.author.username}#${newMessage.author.discriminator}`, newMessage.author.displayAvatarURL())
            .addField('Before', oldMessage.content || 'none')
            .addField('After', newMessage.content || 'none')
            .setFooter(`User ID: ${oldMessage.author.id}`)
            .setTimestamp()
            .setColor('#117ea6'));
    },
    roleCreate: async (role) => {
        role.guild.channels.find((channel) => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor(role.guild.name, role.guild.iconURL())
            .setDescription(`Role Created: ${role.name}`)
            .setTimestamp()
            .setColor('#23d160'));
    },
    roleDelete: async (role) => {
        role.guild.channels.find((channel) => channel.name === 'logs').send(new Discord.MessageEmbed()
            .setAuthor(role.guild.name, role.guild.iconURL())
            .setDescription(`Role Deleted: ${role.name}`)
            .setTimestamp()
            .setColor('#ff470f'));
    },
};

const Discord = require("discord.js"),
    config = require("../config.js");

module.exports = {
    embedLog: function(channel, timestamp, author, url, description, color, thumbnail, footer, fields, image) {
        const embed = new Discord.MessageEmbed().setColor(color);
        if (author) embed.setAuthor(author, url)
        if (description) embed.setDescription(description)
        if (thumbnail) embed.setThumbnail(url);
        if (footer) embed.setFooter(footer);
        if (fields) fields.forEach((field) => embed.addField(field.name, field.data));
        if (image) embed.setImage(image);
        if (timestamp) embed.setTimestamp();
        channel.send(embed);
    },
    channelCreate: function(channel) {
        if (channel.type === "dm") return;
        this.embedLog(channel.guild.channels.find(channel => channel.name === "logs"), true, channel.guild.name, channel.guild.iconURL(), `Channel Created: ${channel.name}`, "#23d160", true);
    },
    channelDelete: function(channel) {
        if (channel.type === "dm") return;
        this.embedLog(channel.guild.channels.find(channel => channel.name === "logs"), true, channel.guild.name, channel.guild.iconURL(), `Channel Deleted: ${channel.name}`, "#ff470f", true);
    },
    guildMemberAdd: function(member) {
        this.embedLog(member.guild.channels.find(channel => channel.name === "logs"), true, "Member Joined", member.user.displayAvatarURL(), `<@${member.user.id}> ${member.user.username}#${member.user.discriminator}`, "#23d160", true, `User ID: ${member.user.id}`);
    },
    guildMemberRemove: function(member) {
        this.embedLog(member.guild.channels.find(channel => channel.name === "logs"), true, "Member Left", member.user.displayAvatarURL(), `<@${member.user.id}> ${member.user.username}#${member.user.discriminator}`, "#ff470f", true, `User ID: ${member.user.id}`);
    },
    messageDelete: function(message) {
        if (message.channel.type === "dm") return;
        this.embedLog(message.guild.channels.find((channel) => channel.name === "logs"), true, `${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL(), `**Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>**\n${message.content}`, "#ff470f", false, `User ID: ${message.author.id}`);
    },
    messageDeleteBulk: function(messages) {
        this.embedLog(messages.first().guild.channels.find((channel) => channel.name === "logs"), true, "Bulk Message Delete", messages.first().guild.iconURL(), `${messages.size} Messages deleted in ${messages.first().channel.name}`, "#ff470f");
    },
    messageReactionAdd: async function(messageReaction, user) {
        switch(messageReaction.emoji.name) {
            case "⭐":
                const messageReaction2 = await messageReaction.message.guild.channels.find((channel) => channel.name === messageReaction.message.channel.name).messages.fetch(messageReaction.message.id);
                messageReaction = messageReaction2.reactions.get("⭐");
                const messages = await messageReaction.message.guild.channels.find((channel) => channel.name === "starboard").messages.fetch();
                let starboardMessage;
                messages.forEach((message) => {
                    if (message.embeds[0].footer.text.split(" | ")[1] === messageReaction.message.id) starboardMessage = message;
                });
                if (!starboardMessage && messageReaction.count >= config.starboardStars) this.embedLog(messageReaction.message.guild.channels.find((channel) => channel.name === "starboard"), false, `${messageReaction.message.author.username}#${messageReaction.message.author.discriminator}`, messageReaction.message.author.avatarURL(), false, 0x00FF00, false, `${messageReaction.count}⭐ | ${messageReaction.message.id}`, [{name: "Channel", data: messageReaction.message.channel}, {name: "Message", data: `[${messageReaction.message.content !== "" ? messageReaction.message : "Jump To"}](${messageReaction.message.url})`}], messageReaction.message.attachments.first() ? messageReaction.message.attachments.first().url : "");
                else if (starboardMessage) starboardMessage.edit(new Discord.MessageEmbed(starboardMessage.embeds[0]).setFooter(`${messageReaction.count}⭐ | ${messageReaction.message.id}`));
                break;
        }
    },
    messageReactionRemove: async function(messageReaction, user) {
        switch(messageReaction.emoji.name) {
            case "⭐":
                const messages = await messageReaction.message.guild.channels.find((channel) => channel.name === "starboard").messages.fetch();
                messages.forEach(async (message) => {
                    if (message.embeds[0].footer.text.split(" | ")[1] === messageReaction.message.id) {
                        const messageReaction2 = await messageReaction.message.guild.channels.find((channel) => channel.name === messageReaction.message.channel.name).messages.fetch(messageReaction.message.id);
                        const messageId = messageReaction.message.id;
                        messageReaction = messageReaction2.reactions.get("⭐");
                        message.edit(new Discord.MessageEmbed(message.embeds[0]).setFooter(`${messageReaction ? messageReaction.count : 0}⭐ | ${messageReaction2.channel.messages.get(messageId).id}`));
                    }
                });
                break;
        }
    },
    messageUpdate: async function(oldMessage, newMessage) {
        if (oldMessage.channel.type === "dm" || oldMessage.content === newMessage.content) return;
        newMessage = await newMessage.channel.messages.fetch(newMessage.id);
        this.embedLog(newMessage.guild.channels.find((channel) => channel.name === "logs"), true, `${newMessage.author.username}#${newMessage.author.discriminator}`, newMessage.author.displayAvatarURL(), false, "#117ea6", false, `User ID: ${newMessage.author.id}`, [{name: "Before", data: oldMessage.content || "none"}, {name: "After", data: newMessage.content || "none"}]);
    },
    roleCreate: function(role) {
        this.embedLog(role.guild.channels.find((channel) => channel.name === "logs"), true, role.guild.name, role.guild.iconURL(), `Role Created: ${role.name}`, "#23d160");
    },
    roleDelete: function(role) {
        this.embedLog(role.guild.channels.find((channel) => channel.name === "logs"), true, role.guild.name, role.guild.iconURL(), `Role Deleted: ${role.name}`, "#ff470f")
    },
};

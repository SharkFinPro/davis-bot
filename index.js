const Discord = require('discord.js'),
    request = require('request'),
    commandList = require('./src/commands/index.js'),
    eventHandlers = require('./src/lib/eventHandlers.js'),
    Music = require('./src/lib/music.js'),
    config = require('./config.js');

const client = new Discord.Client();
const music = new Music();

client.login(config.token);
client.on('error', console.error);
client.on('ready', async () => {
    client.user.setActivity(`!help`);
    console.log(`Logged in as ${client.user.tag}`);
});
client.on('raw', async (event) => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t === 'MESSAGE_REACTION_REMOVE') {
        const { d: data } = event;
        const channel = client.channels.get(data.channel_id);
        if (channel.messages.has(data.message_id)) return;
        const message = await channel.messages.fetch(data.message_id);
        client.emit(event.t === 'MESSAGE_REACTION_ADD' ? 'messageReactionAdd' : 'messageReactionRemove', message.reactions.get(data.emoji.id || data.emoji.name), client.users.get(data.user_id));
    }
});
client.on('message', (message) => {
    if (message.author.bot) return;
    if(message.channel.type === 'dm') request(`https://some-random-api.ml/chatbot?message=${message.content}`, (error, response, body) => message.channel.send(JSON.parse(body).response));
    if (message.channel.type !== 'text') return;
    if (message.content.toLowerCase().includes('shower')) {
        message.channel.send('__***G E N T L E M E N !***__');
        return message.delete();
    }
    if (message.mentions.users.has(client.user.id)) message.react('🤔');
    if (message.content === `<@${client.user.id}> help`) return commandList['help'].command(message, commandList, config, this);
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    const command = message.content.toLowerCase().split(' ')[0].substring(config.prefix.length, message.content.toLowerCase().split(' ')[0].length);
    if (Object.keys(commandList).includes(command)) {
        if (!commandList[command].enabled) return message.reply(`${config.prefix}**${command}** is currently disabled!`);
        commandList[command].command(message, commandList, config, music);
    } else message.react('❌');
});
client.on('channelCreate', async (channel) => eventHandlers.channelCreate(channel));
client.on('channelDelete', async (channel) => eventHandlers.channelDelete(channel));
client.on('channelPinsUpdate', async (channel, time) => eventHandlers.channelPinsUpdate(channel, time));
client.on('channelUpdate', async (oldChannel, newChannel) => eventHandlers.channelUpdate(oldChannel, newChannel));
client.on('emojiCreate', async (emoji) => eventHandlers.emojiCreate(emoji));
client.on('emojiDelete', async (emoji) => eventHandlers.emojiDelete(emoji));
client.on('emojiUpdate', async (oldEmoji, newEmoji) => eventHandlers.emojiUpdate(oldEmoji, newEmoji));
client.on('guildBanAdd', async (guild, user) => eventHandlers.guildBanAdd(guild, user));
client.on('guildBanRemove', async (guild, user) => eventHandlers.guildBanRemove(guild, user));
client.on('guildIntegrationsUpdate', async (guild) => eventHandlers.guildIntegrationsUpdate(guild));
client.on('guildMemberAdd', async (member) => eventHandlers.guildMemberAdd(member));
client.on('guildMemberAvailable', async (member) => eventHandlers.guildMemberAvailable(member));
client.on('guildMemberRemove', async (member) => eventHandlers.guildMemberRemove(member));
client.on('guildMembersChunk', async (members, guild) => eventHandlers.guildMembersChunk(members, guild));
client.on('guildMemberSpeaking', async (member, speaking) => eventHandlers.guildMemberSpeaking(member, speaking));
client.on('guildMemberUpdate', async (oldMember, newMember) => eventHandlers.guildMemberUpdate(oldMember, newMember));
client.on('guildUpdate', async (oldGuild, newGuild) => eventHandlers.guildUpdate(oldGuild, newGuild));
client.on('messageDelete', async (message) => eventHandlers.messageDelete(message));
client.on('messageDeleteBulk', async (messages) => eventHandlers.messageDeleteBulk(messages));
client.on('messageReactionAdd', async (messageReaction, user) => eventHandlers.messageReactionAdd(messageReaction, user));
client.on('messageReactionRemove', async (messageReaction, user) => eventHandlers.messageReactionRemove(messageReaction, user));
client.on('messageReactionRemoveAll', async (message) => eventHandlers.messageReactionRemoveAll(message));
client.on('messageUpdate', async (oldMessage, newMessage) => eventHandlers.messageUpdate(oldMessage, newMessage));
client.on('presenceUpdate', async (oldPresence, newPresence) => eventHandlers.presenceUpdate(oldPresence, newPresence));
client.on('roleCreate', async (role) => eventHandlers.roleCreate(role));
client.on('roleDelete', async (role) => eventHandlers.roleDelete(role));
client.on('roleUpdate', async (oldRole, newRole) => eventHandlers.roleUpdate(oldRole, newRole));
client.on('typingStart', async (channel, user) => eventHandlers.typingStart(channel, user));
client.on('typingStop', async (channel, user) => eventHandlers.typingStop(channel, user));
client.on('userUpdate', async (oldUser, newUser) => eventHandlers.userUpdate(oldUser, newUser));
client.on('voiceStateUpdate', async (oldState, newState) => eventHandlers.voiceStateUpdate(oldState, newState));
client.on('webhookUpdate', async (channel) => eventHandlers.webhookUpdate(channel));
process.on('exit', (e) => console.log(`Process exited with code ${e}`));

const Discord = require('discord.js'),
    fs = require('fs'),
    util = require('util'),
    request = require('request'),
    commandList = {},
    eventHandlers = require('./src/lib/eventHandlers.js'),
    Music = require('./src/lib/music.js'),
    config = require('./config.js'),
    readdirAsync = util.promisify(fs.readdir);

class Bot {
    constructor() {
        this.client = new Discord.Client({partials: ['MESSAGE']});
        this.music = new Music();
        this.initBot();
    }

    initBot() {
        this.client.login(config.token);
        this.client.on('error', console.error);
        this.client.on('ready', async () => {
            this.client.user.setActivity(`${config.prefix}help`);
            console.log(`Logged in as ${this.client.user.tag}`);
            this.init();
        });
    }

    async init() {
        let directories = await readdirAsync('./src/commands');
        for (let dir of directories) {
            let files = await readdirAsync('./src/commands/' + dir);
            for (let f of files) commandList[f.split('.js').join('')] = require('./src/commands/' + dir + '/' + f);
        }
        this.client.on('message', message => this.onMessage(message));
        this.client.on('channelCreate', eventHandlers.channelCreate);
        this.client.on('channelDelete', eventHandlers.channelDelete);
        this.client.on('channelPinsUpdate', eventHandlers.channelPinsUpdate);
        this.client.on('channelUpdate', eventHandlers.channelUpdate);
        this.client.on('emojiCreate', eventHandlers.emojiCreate);
        this.client.on('emojiDelete', eventHandlers.emojiDelete);
        this.client.on('emojiUpdate', eventHandlers.emojiUpdate);
        this.client.on('guildBanAdd', eventHandlers.guildBanAdd);
        this.client.on('guildBanRemove', eventHandlers.guildBanRemove);
        this.client.on('guildIntegrationsUpdate', eventHandlers.guildIntegrationsUpdate);
        this.client.on('guildMemberAdd', eventHandlers.guildMemberAdd);
        this.client.on('guildMemberAvailable', eventHandlers.guildMemberAvailable);
        this.client.on('guildMemberRemove', eventHandlers.guildMemberRemove);
        this.client.on('guildMembersChunk', eventHandlers.guildMembersChunk);
        this.client.on('guildMemberSpeaking', eventHandlers.guildMemberSpeaking);
        this.client.on('guildMemberUpdate', eventHandlers.guildMemberUpdate);
        this.client.on('guildUpdate', eventHandlers.guildUpdate);
        this.client.on('messageDelete', eventHandlers.messageDelete);
        this.client.on('messageDeleteBulk', eventHandlers.messageDeleteBulk);
        this.client.on('messageReactionAdd', eventHandlers.messageReactionAdd);
        this.client.on('messageReactionRemove', eventHandlers.messageReactionRemove);
        this.client.on('messageReactionRemoveAll', eventHandlers.messageReactionRemoveAll);
        this.client.on('messageUpdate', eventHandlers.messageUpdate);
        this.client.on('presenceUpdate', eventHandlers.presenceUpdate);
        this.client.on('roleCreate', eventHandlers.roleCreate);
        this.client.on('roleDelete', eventHandlers.roleDelete);
        this.client.on('roleUpdate', eventHandlers.roleUpdate);
        this.client.on('typingStart', eventHandlers.typingStart);
        this.client.on('typingStop', eventHandlers.typingStop);
        this.client.on('userUpdate', eventHandlers.userUpdate);
        this.client.on('voiceStateUpdate', eventHandlers.voiceStateUpdate);
        this.client.on('webhookUpdate', eventHandlers.webhookUpdate);
    }

    onMessage(message) {
        if (message.author.bot) return;
        if (message.channel.type === 'dm') request(`https://some-random-api.ml/chatbot?message=${message.content}`, (error, response, body) => message.channel.send(JSON.parse(body).response));
        if (message.channel.type !== 'text') return;
        if (message.mentions.users.has(this.client.user.id)) message.react('🤔');
        if (message.content === `<@${this.client.user.id}> help`) return commandList['help'].command(message, commandList, config, this);
        if (!message.content.toLowerCase().startsWith(config.prefix)) return;
        const command = message.content.toLowerCase().split(' ')[0].substring(config.prefix.length, message.content.toLowerCase().split(' ')[0].length);
        if (Object.keys(commandList).includes(command)) {
            if (!commandList[command].enabled) return message.reply(`${config.prefix}**${command}** is currently disabled!`);
            commandList[command].command(message, commandList, config, this.music);
        } else message.react('❌');
    }
}

const bot = new Bot();

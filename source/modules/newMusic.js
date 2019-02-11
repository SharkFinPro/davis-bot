"use strict";
const ytdl = require('ytdl-core');
module.exports = class music {
    constructor(server) {
        this.server = server;
        this.servers = new Map();
    }

    clearQueue(message) {
        if (!this.servers.has(message.guild.id)) return message.channel.send('The queue is empty!');
    }

    skip(message) {
        if (message.author.id !== '419151003766620180' && !message.member.roles.has('453715852735414302')) return;
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`);
        if (!this.servers.has(message.guild.id)) return message.channel.send('The queue is empty!');

    }

    pause(message) {
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`);
        if (!this.servers.has(message.guild.id)) return message.channel.send('The queue is empty!');
    }

    resume(message) {
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`);
        if (!this.servers.has(message.guild.id)) return message.channel.send('The queue is empty!');
    }

    setVolume(message, volume) {
        if (message.author.id !== '419151003766620180' && !message.member.roles.has('453715852735414302')) return;
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`);
        if (!this.servers.has(message.guild.id)) return message.channel.send('The queue is empty!');
    }

    addSong(message, args) {
        if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`);
        let voiceChannel = message.member.voice.channel;
        if (!voiceChannel.permissionsfor (message.client.user).has('CONNECT')) return message.channel.send(`I cannot connect to this voice channel!`);
        if (!voiceChannel.permissionsfor (message.client.user).has('SPEAK')) return message.channel.send(`I cannot speak in this voice channel!`);
        if (this.servers.has(message.guild.id)) {
            //
        } else {
            //
            this.servers.set(message.guild.id, {
                voiceChannel: voiceChannel,
                songs: [],
                volume: 1,
                playing: false,
                dispatcher: undefined
            });
        }
    }

    play(guild, song) {
        if (!this.servers.has(guild.id)) return song.message.channel.send('The queue is empty!');
        let server = this.servers.get(guild.id);
        if (server.songs.length === 0) {
            server.textChannel.send('Queue Concluded');
            server.voiceChannel.leave();
            server.textChannel = undefined;
            server.voiceChannel = undefined;
            server.playing = false;
            return;
        }
        server.voiceChannel.join().then((connection) => {
            server.dispatcher = connection.play(ytdl(song.video_url), {
                filter: 'audioonly',
                volume: server.volume,
                passes: 5,
                bitrate: 96000
            })
            .on('end', (reason) => {
                server.songs.shift();
                this.play(guild, server.songs[0]);
            })
            .on('error', (error) => console.error(error));
            server.playing = true;
            server.textChannel.send(`Started playing: **${song.title}**`);
        });
    }
};

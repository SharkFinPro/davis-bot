"use strict";
const Discord = require('discord.js'),
    search = require('youtube-search');
module.exports = (message, commandList, config, server) => {
    if (!message.member.voice.channel) return message.reply(`Please be in a voice channel first!`);
    search(message.content.split(' ').splice(1).join(' '), { maxResults: 25, key: config.ytKey }, (err, results) => {
        if (err) return message.channel.send(`**ERROR**: ${err}`);
        results = results.filter((result) => result.kind === 'youtube#video').slice(0, 5);
        let embed = new Discord.MessageEmbed()
            .setColor(0x008B00)
            .setTitle(`Top 5 results for **${message.content.split(' ').splice(1).join(' ')}**`);
        for (let i = 0; i < results.length; i++) embed.addField(`**${i+1}**) **${results[i].title}**`, results[i].link);
        message.channel.send(embed)
        .then(async (msg) => {
            const filter = (reaction, user) => user.id === message.author.id;
            const collector = msg.createReactionCollector(filter)
            .on('collect', (r) => {
                switch(r.emoji.name) {
                  case '1⃣':
                      server.music.addSong(message, [0, results[0].id]);
                      collector.stop();
                      break;
                  case '2⃣':
                      server.music.addSong(message, [0, results[1].id]);
                      collector.stop();
                      break;
                  case '3⃣':
                      server.music.addSong(message, [0, results[2].id]);
                      collector.stop();
                      break;
                  case '4⃣':
                      server.music.addSong(message, [0, results[3].id]);
                      collector.stop();
                      break;
                  case '5⃣':
                      server.music.addSong(message, [0, results[4].id]);
                      collector.stop();
                      break;
                }
            });
            if (results.length >= 1) await msg.react('1⃣');
            if (results.length >= 2) await msg.react('2⃣');
            if (results.length >= 3) await msg.react('3⃣');
            if (results.length >= 4) await msg.react('4⃣');
            if (results.length >= 5) await msg.react('5⃣');
        });
    });
};

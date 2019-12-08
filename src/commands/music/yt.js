const Discord = require('discord.js'),
    YouTube = new (require('youtube-node'))();

module.exports = {
    enabled: true,
    description: 'Searches songs to play on YT',
    type: 'music',
    args: ['query'],
    command: (message, commandList, config, music) => {
        YouTube.setKey(config.ytKey);
        if (!message.member.voiceChannel) return message.reply(`Please be in a voice channel first!`);
        YouTube.search(message.content.split(' ').splice(1).join(' '), 20, (err, results) => {
            if (err) return message.channel.send(`**ERROR**: ${err}`);
            results = results.items.filter((result) => result.id.kind === 'youtube#video').slice(0, 5);;
            let embed = new Discord.RichEmbed()
                .setColor(0x008B00)
                .setTitle(`Top 5 results for **${message.content.split(' ').splice(1).join(' ')}**`);
            for (let i = 0; i < results.length; i++) embed.addField(`**${i+1}**) **${results[i].snippet.title}**`, 'https://www.youtube.com/watch?v=' + results[i].id.videoId);
            message.channel.send(embed)
            .then(async (msg) => {
                const filter = (reaction, user) => user.id === message.author.id;
                const collector = msg.createReactionCollector(filter)
                .on('collect', (r) => {
                    switch(r.emoji.name) {
                      case '1⃣':
                          music.addSong(message, results[0].id.videoId);
                          collector.stop();
                          break;
                      case '2⃣':
                          music.addSong(message, results[1].id.videoId);
                          collector.stop();
                          break;
                      case '3⃣':
                          music.addSong(message, results[2].id.videoId);
                          collector.stop();
                          break;
                      case '4⃣':
                          music.addSong(message, results[3].id.videoId);
                          collector.stop();
                          break;
                      case '5⃣':
                          music.addSong(message, results[4].id.videoId);
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
    }
};

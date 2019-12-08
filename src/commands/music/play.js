module.exports = {
    enabled: true,
    description: 'Plays a song from YT',
    type: 'music',
    args: ['url'],
    command: (message, commandList, config, music) => music.addSong(message, message.content.split(' ')[1])
};

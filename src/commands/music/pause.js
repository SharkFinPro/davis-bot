module.exports = {
    enabled: true,
    description: 'Pauses current song',
    type: 'music',
    args: '',
    command: (message, commandList, config, music) => music.pause(message)
};

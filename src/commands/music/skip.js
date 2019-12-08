module.exports = {
    enabled: true,
    description: 'Skips current song',
    type: 'music',
    args: '',
    command: (message, commandList, config, music) => music.skip(message)
};

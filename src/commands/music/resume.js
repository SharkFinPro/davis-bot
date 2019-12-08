module.exports = {
    enabled: true,
    description: 'Resumes current song',
    type: 'music',
    args: '',
    command: (message, commandList, config, music) => music.resume(message)
};

module.exports = {
    enabled: true,
    description: "Pauses current song",
    type: "music",
    args: "",
    command: (message, bot) => bot.music.pause(message)
};

module.exports = {
    enabled: true,
    description: "Skips current song",
    type: "music",
    args: "",
    command: (message, bot) => bot.music.skip(message)
};

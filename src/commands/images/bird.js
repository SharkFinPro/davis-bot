module.exports = {
    enabled: true,
    description: "Shows a random bird picture",
    type: "images",
    args: "",
    async command(message, bot) {
        const bird = await bot.fetchURL("https://some-random-api.ml/img/birb");
        message.channel.send({files: [bird.link]});
    }
};

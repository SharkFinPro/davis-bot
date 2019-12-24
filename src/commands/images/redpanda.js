module.exports = {
    enabled: true,
    description: "Shows a random bird picture",
    type: "images",
    args: "",
    async command(message, bot) {
        const redPanda = await bot.fetchURL("https://some-random-api.ml/img/red_panda");
        message.channel.send({files: [redPanda.link]});
    }
};

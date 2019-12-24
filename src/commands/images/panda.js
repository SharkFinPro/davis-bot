module.exports = {
    enabled: true,
    description: "Shows a random panda picture",
    type: "images",
    args: "",
    async command(message, bot) {
        const panda = await bot.fetchURL("https://some-random-api.ml/img/panda");
        message.channel.send({files: [panda.link]});
    }
};

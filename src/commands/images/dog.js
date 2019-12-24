module.exports = {
    enabled: true,
    description: "Shows a random dog picture",
    type: "images",
    args: "",
    async command(message, bot) {
        const dog = await bot.fetchURL("https://api.thedogapi.com/v1/images/search");
        message.channel.send({files: [dog[0].url]});
    }
};

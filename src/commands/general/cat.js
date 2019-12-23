const fetch = require("node-fetch");

module.exports = {
    enabled: true,
    description: "Shows a random cat picture",
    type: "general",
    args: "",
    async command(message, bot) {
        const msg = await bot.fetchURL("https://api.thecatapi.com/v1/images/search");
        message.channel.send({files: [msg[0].url]});
    }
};

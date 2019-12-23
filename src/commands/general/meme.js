const fetch = require("node-fetch");

module.exports = {
    enabled: true,
    description: "Shows a random meme",
    type: "general",
    args: "",
    async command(message, bot) {
        const msg = await bot.fetchURL("https://meme-api.herokuapp.com/gimme");
        message.channel.send({files: [msg.url]});
    }
};

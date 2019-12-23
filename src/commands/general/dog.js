const fetch = require("node-fetch");

module.exports = {
    enabled: true,
    description: "Shows a random dog picture",
    type: "general",
    args: "",
    async command(message, bot) {
        const file = await bot.fetchURL("https://api.thedogapi.com/v1/images/search");
        message.channel.send({files: [file[0].url]});
    }
};

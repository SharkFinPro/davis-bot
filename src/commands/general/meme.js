const fetch = require("node-fetch");

module.exports = {
    enabled: true,
    description: "Shows a random meme",
    type: "general",
    args: "",
    command: (message, bot) => fetch("https://meme-api.herokuapp.com/gimme").then(res => res.text().then(body => message.channel.send({files: [JSON.parse(body).url]})))
};

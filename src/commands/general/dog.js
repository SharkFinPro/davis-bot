const fetch = require("node-fetch");

module.exports = {
    enabled: true,
    description: "Shows a random dog picture",
    type: "general",
    args: "",
    command(message, bot) {
        fetch("https://api.thedogapi.com/v1/images/search").then((res) => res.text().then(body => message.channel.send({files: [JSON.parse(body)[0].url]})));
    }
};

const fetch = require("node-fetch");

module.exports = {
    enabled: true,
    description: "Shows a random cat picture",
    type: "general",
    args: "",
    command(message, bot) {
        fetch("https://api.thecatapi.com/v1/images/search").then((res) => {
            res.text().then(body => {
                message.channel.send({files: [JSON.parse(body)[0].url]});
            });
        });
    }
};

const Discord = require("discord.js");

module.exports = {
    enabled: true,
    description: "Roll a die",
    type: "games",
    args: ["sides"],
    command: (message, bot) => {
        const diceSides = Math.floor(message.content.toLowerCase().split(" ")[1]) || 6;
        message.channel.send(`The die rolled a ${Math.floor((Math.random() * diceSides) + 1)}!`);
    }
};

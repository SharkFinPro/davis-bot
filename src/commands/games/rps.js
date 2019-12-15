const Discord = require('discord.js');

module.exports = {
    enabled: true,
    description: 'Play rock paper scissors with me',
    type: 'games',
    args: ['choice'],
    getWinner: function(c1, c2) {
        if (c1 === "rock") {
            if (c2 === "rock") return 2;
            else if (c2 === "paper") return 1;
            return 0;
        } else if (c1 === "paper") {
            if (c2 === "rock") return 0;
            else if (c2 === "paper") return 2;
            return 1;
        }
        if (c2 === "rock") return 1;
        else if (c2 === "paper") return 0;
        return 2;
    },
    command: function(message, bot) {
        let args = message.content.toLowerCase().split(' ');
        let choice;
        if (args[1]) if (args[1].toLowerCase() === "rock" || args[1].toLowerCase() === "paper" || args[1].toLowerCase() === "scissors") choice = args[1].toLowerCase();
        if (!(choice === "rock" || choice === "paper" || choice === "scissors")) return message.channel.send("Please choose either rock, paper, or scissors!");
        let comChoice = Math.floor(Math.random() * 3 + 1);
        if (comChoice === 1) comChoice = "rock";
        else if (comChoice === 2) comChoice = "paper";
        else comChoice = "scissors";
        let winner = this.getWinner(choice, comChoice);
        if (winner === 0) winner = "You Won!";
        else if(winner === 1) winner = "You Lost!";
        else winner = "We Tied!";
        message.channel.send(`You chose ${choice}, I chose ${comChoice}. ${winner}`);
    }
};

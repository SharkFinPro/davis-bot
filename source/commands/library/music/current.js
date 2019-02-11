"use strict";
const Discord = require('discord.js');
module.exports = (message, commandList, config, server) => {
    let timePlayed = server.queue.dispatcher.streamTime;
    let seconds = timePlayed / 1000;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
};

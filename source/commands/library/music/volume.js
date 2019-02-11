"use strict";
module.exports = (message, commandList, config, server) => isNaN(message.content.toLowerCase().split(' ')[1]) ? message.channel.send('Please choose a number to set the volume!') : server.music.setVolume(message, message.content.toLowerCase().split(' ')[1]);

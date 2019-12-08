"use strict";
module.exports = (message, commandList, config, server) => server.music.addSong(message, message.content.split(' ')[1]);

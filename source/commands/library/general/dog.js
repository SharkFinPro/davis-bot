"use strict";
const request = require('request');
module.exports = (message, commandList, config, server) => {
    request('https://api.thedogapi.com/v1/images/search', (error, response, body) => message.channel.send({files: [JSON.parse(body)[0].image]}));
};

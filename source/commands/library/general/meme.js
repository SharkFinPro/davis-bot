"use strict";
const request = require('request');
module.exports = (message, commandList, config, server) => {
    request('https://some-random-api.ml/meme', (error, response, body) => message.channel.send({files: [JSON.parse(body).image]}));
};

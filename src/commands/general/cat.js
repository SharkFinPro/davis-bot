const request = require('request');

module.exports = {
    enabled: true,
    description: 'Shows a random cat picture',
    type: 'general',
    args: '',
    command: (message, commandList, config, music) => request('https://api.thecatapi.com/v1/images/search', (error, response, body) => message.channel.send({files: [JSON.parse(body)[0].url]}))
};

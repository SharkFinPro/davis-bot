const request = require('request');

module.exports = {
    enabled: true,
    description: 'Shows a random meme',
    type: 'general',
    args: '',
    command: (message, commandList, config, music) => request('https://some-random-api.ml/meme', (error, response, body) => message.channel.send({files: [JSON.parse(body).image]}))
};

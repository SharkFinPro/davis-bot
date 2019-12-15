const request = require('request');

module.exports = {
    enabled: true,
    description: 'Shows a random dog picture',
    type: 'general',
    args: '',
    command: (message, bot) => request('https://api.thedogapi.com/v1/images/search', (error, response, body) => message.channel.send({files: [JSON.parse(body)[0].url]}))
};

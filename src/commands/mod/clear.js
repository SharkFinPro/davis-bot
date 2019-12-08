module.exports = {
    enabled: true,
    description: 'Clears messages',
    type: 'mod',
    args: ['amount'],
    command: (message, commandList, config, music) => {
        if (!message.guild.members.get(message.author.id).hasPermission('MANAGE_MESSAGES')) return message.reply('You do not have permissions to use this command.');
        if (isNaN(message.content.toLowerCase().split(' ')[1])) return message.channel.send('Please specify a number of messages to delete!');
        let x = message.content.toLowerCase().split(' ')[1];
      	message.channel.bulkDelete(Math.floor(x) + 1);
      	message.channel.send(`**Deleted ${x} messages**! 👍`).then((m) => m.delete({timeout: 2000}));
    }
};

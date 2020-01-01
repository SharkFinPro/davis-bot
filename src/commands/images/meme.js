module.exports = {
  enabled: true,
  description: "Shows a random meme",
  type: "images",
  args: "",
  async command(message, bot) {
    const meme = await bot.fetchURL("https://meme-api.herokuapp.com/gimme");
    message.channel.send({files: [meme.url]});
  }
};

module.exports = {
  enabled: true,
  description: "Shows a random cat picture",
  type: "images",
  args: "",
  async command(message, bot) {
    const cat = await bot.fetchURL("https://api.thecatapi.com/v1/images/search");
    message.channel.send({files: [cat[0].url]});
  }
};

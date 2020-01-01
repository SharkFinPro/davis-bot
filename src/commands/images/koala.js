module.exports = {
  enabled: true,
  description: "Shows a random koala picture",
  type: "images",
  args: "",
  async command(message, bot) {
    const koala = await bot.fetchURL("https://some-random-api.ml/img/koala");
    message.channel.send({files: [koala.link]});
  }
};

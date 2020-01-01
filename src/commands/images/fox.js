module.exports = {
  enabled: true,
  description: "Shows a random fox picture",
  type: "images",
  args: "",
  async command(message, bot) {
    const fox = await bot.fetchURL("https://some-random-api.ml/img/fox");
    message.channel.send({files: [fox.link]});
  }
};

module.exports = {
  enabled: true,
  description: "Resumes current song",
  type: "music",
  args: "",
  command(message, bot) {
    bot.music.resume(message);
  }
};

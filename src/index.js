const Discord = require("discord.js"),
  eventHandlers = require("./lib/eventHandlers.js"),
  fs = require("fs");

const bot = {
  client: new Discord.Client({partials: ["MESSAGE"]}),
  music: new (require("./lib/music.js"))(),
  commandList: {},
  config: require("./config.js"),
  async fetchURL(url) {
    const data = await require("node-fetch")(url);
    const body = await data.text();
    return JSON.parse(body);
  },
  async initBot() {
    fs.readdir("./src/commands", (err, directories) => {
      for (const dir of directories) {
        fs.readdir(`./src/commands/${dir}`, (err, files) => {
          for (const f of files) {
            this.commandList[f.split(".js").join("")] = require(`./commands/${dir}/${f}`);
          }
        });
      }
    });
    this.client.login(this.config.token);
    this.client.on("error", console.error);
    this.client.on("ready", async() => {
      this.client.user.setActivity(`${this.config.prefix}help`);
      console.log(`Logged in as ${this.client.user.tag}`);
      for (const each in eventHandlers) {
        if ({}.hasOwnProperty.call(eventHandlers, each)) {
          this.client.on(each, (a, b) => eventHandlers[each](a, b));
        }
      }
      this.client.on("message", (message) => {
        this.onMessage(message);
      });
    });
  },
  async onMessage(message) {
    if (message.author.bot) {
      return;
    }
    if (message.channel.type === "dm") {
      message.channel.startTyping();
      const msg = await this.fetchURL(`https://some-random-api.ml/chatbot?message=${message.content}`);
      message.channel.send(msg.response || "The chat API is down.");
      message.channel.stopTyping();
    }
    if (message.channel.type !== "text") {
      return;
    }
    if (message.mentions.users.has(this.client.user.id)) {
      message.react("🤔");
    }
    if (message.content === `<@!${this.client.user.id}> help`) {
      return this.commandList["help"].command(message, this);
    }
    if (!message.content.toLowerCase().startsWith(this.config.prefix)) {
      return;
    }
    const command = message.content.toLowerCase().split(" ")[0].substring(this.config.prefix.length, message.content.toLowerCase().split(" ")[0].length);
    if (!Object.keys(this.commandList).includes(command)) {
      return message.react("❌");
    }
    if (!this.commandList[command].enabled) {
      return message.reply(`${this.config.prefix}**${command}** is currently disabled!`);
    }
    this.commandList[command].command(message, this);
  }
}.initBot();

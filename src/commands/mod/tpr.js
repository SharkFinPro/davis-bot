const patrols = [ // Role, Text Channel, Voice Channel
  ["Falcons", "falcons", "Falcons"],
  ["Wombats", "wombats", "Wombats"],
  ["Buffaloes", "buffaloes", "Buffaloes"],
  ["Beast Lizards", "beast-lizards", "Beast Lizards"],
  ["Scorpions", "scorpions", "Scorpions"],
  ["Squirrels", "squirrels", "Squirrels"]
];
module.exports = {
  enabled: true,
  description: "Unlock/Lock Patrol Rooms",
  args: "",
  type: "mod",
  command(message, bot) {
    if (!message.guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")) {
      return message.reply("You do not have permissions to use this command.");
    }
    let toggle = false;
    for (let p of patrols) {
      let patrol = message.guild.roles.cache.find((role) => role.name === p[0]);
      toggle = this.togglePerms(message, message.guild.channels.cache.find((channel) => channel.name === p[1]), patrol);
      this.togglePerms(message, message.guild.channels.cache.find((channel) => channel.name === p[2]), patrol);
    }
    message.channel.send(toggle ? "Opened Patrol Rooms" : "Closed Patrol Rooms");
  },
  togglePerms(message, channel, patrol) {
    let spl = message.guild.roles.cache.find((role) => role.name === "SPL");
    let aspl = message.guild.roles.cache.find((role) => role.name === "ASPL");
    let adult = message.guild.roles.cache.find((role) => role.name === "Adult");
    let member = message.guild.roles.cache.find((role) => role.name === "member");

    if (channel.permissionsFor(patrol).has("VIEW_CHANNEL")) {
      channel.overwritePermissions([
        {
           id: spl,
           deny: ["VIEW_CHANNEL"]
        },
        {
           id: aspl,
           deny: ["VIEW_CHANNEL"]
        },
        {
           id: adult,
           deny: ["VIEW_CHANNEL"]
        },
        {
           id: member,
           deny: ["VIEW_CHANNEL"]
        },
        {
           id: patrol,
           deny: ["VIEW_CHANNEL"]
        },
        {
           id: message.guild.roles.everyone.id,
           deny: ["VIEW_CHANNEL"]
        }
      ], "Closed Patrol Rooms");
      return false;
    }
    channel.overwritePermissions([
      {
         id: spl,
         allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "CONNECT"]
      },
      {
         id: aspl,
         allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "CONNECT"]
      },
      {
         id: adult,
         allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "CONNECT"]
      },
      {
         id: member,
         allow: ["VIEW_CHANNEL"],
         deny: ["SEND_MESSAGES", "CONNECT"]
      },
      {
         id: patrol,
         allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "CONNECT"]
      },
      {
         id: message.guild.roles.everyone.id,
         deny: ["VIEW_CHANNEL"]
      }
    ], "Opened Patrol Rooms");
    return true;
  }
};

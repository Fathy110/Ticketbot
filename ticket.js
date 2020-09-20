const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
console.log('[ BOT IS ONLINE ]')
console.log('Alpha support')
console.log('by   FireKing 🔥#0444')
});
client.login("التوكن");
FireKing.on("ready", () => {
console.log(`Logged in as ${FireKing.user.tag}!`);
FireKing.user.setActivity(`online`);
FireKing.user.setStatus("online"); // الحالة
});

///by FireKing 🔥#0444
const category = "category-id";
let mtickets = true;
let tchannels = [];
let current = 0;
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  let author = message.author.id;
  if (args[0].toLowerCase() === `#by`) {
    let embed = new Discord.RichEmbed()
      .addField(`by`);
    await message.channel.send(
      ` FireKing 👑#0444**`
    );
    await message.channel.send(embed);
  } else if (args[0].toLowerCase() === `#new`) {
    if (mtickets === false)
      return message.channel.send(
        `**the ticket is disable <:694579700865040464:755474041250512976> **`
      );
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        `**I can't make a room check my perms <:694579700865040464:755474041250512976> **`
      );
    console.log(current);
    let openReason = "";
    current++;
    message.guild.createChannel(`ticket-${current}`, "text").then(c => {
      tchannels.push(c.id);
      c.setParent(category);
      message.channel.send(`**the ticket is open <:bot2:755448376451137659> **`);
      c.overwritePermissions(message.guild.id, {
        READ_MESSAGES: false,
        SEND_MESSAGES: false
      });
      c.overwritePermissions(message.author.id, {
        READ_MESSAGES: true,
        SEND_MESSAGES: true
      });
 
      if (args[1])
        openReason = `\nReason: [ **__${args.slice(1).join(" ")}__** ]`;
      let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("#36393e")
        .setDescription(`** <:bot4:755448343076798606> Wait Admin To Answer You**${openReason}`);
      c.send(`${message.author}`);
      c.send(embed);
    });
  } else if (args[0].toLowerCase() === `#setup-ticket`) {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        `**you don't have perms <:694579700865040464:755474041250512976> **`
      );
    if (args[1] && args[1].toLowerCase() === "enable") {
      mtickets = true;
      message.channel.send(
        `**the tickets is enabled <:openlock_1f513:755476732705767454> **`
      );
    } else if (args[1] && args[1].toLowerCase() === "disable") {
      mtickets = false;
      message.channel.send(
        `**the ticket is disabled <:lock_1f512:755476732630270002>  **`
      );
    } else if (!args[1]) {
      if (mtickets === true) {
        mtickets = false;
        message.channel.send(
          `**the ticket is disabled <:lock_1f512:755476732630270002>**`
        );
      } else if (mtickets === false) {
        mtickets = true;
        message.channel.send(
          `**the tickets is enabled <:openlock_1f513:755476732705767454>**`
        );
      }
    }
  } else if (args[0].toLowerCase() === `#close`) {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
      `**you don't have perms <:694579700865040464:755474041250512976>`
      );
    if (
      !message.channel.name.startsWith("ticket-") &&
      !tchannels.includes(message.channel.id)
    )
      return message.channel.send(`**this isn't ticket room**`);
 
    message.channel.send(
      `**the room will close after 5 second**`
    );
    tchannels.splice(tchannels.indexOf(message.channel.id), 1);
    setTimeout(() => message.channel.delete(), 5000); //لحد هنا
  } else if (message.content == `#remove`) {
    if (!message.channel.name.startsWith("ticket-")) {
      return message.channel.send(`**This command only for the tickets**`);
    }
    let member = message.mentions.members.first();
    if (!member || member.id === client.user.id) {
      return message.channel.send(`**Please mention the user**`);
    }
    if (
      !message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    ) {
      return message.channel.send(
        `**${member.user.tag}** is not in this ticket to remove them`
      );
    }
    message.channel.overwritePermissions(member.id, {
      SEND_MESSAGES: false,
      VIEW_CHANNEL: false,
      READ_MESSAGE_HISTORY: false
    });
    message.channel.send(
      `**Done \nSuccessfully removed \`${member.user.tag}\` from the ticket**`
    );
  } else if (message.content == `#add`) {
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        `**Error** \nI Don\'t have MANAGE_CHANNELS Permission to do this`
      );
    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send(`**This command only for the tickets**`);
    let member = message.mentions.members.first();
    if (!member) return message.channel.send(`**Please mention the user**`);
    if (
      message.channel
        .permissionsFor(member)
        .has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])
    )
      return message.channel.send(
        `this member already in this ticket :rolling_eyes:`
      );
    message.channel.overwritePermissions(member.id, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
      READ_MESSAGE_HISTORY: true
    });
    message.channel.send(
      `**Done \nSuccessfully added <@${member.user.id}> to the ticket**`
    );
  } else if (args[0].toLowerCase() === `#restart`) {
    if (!devs.includes(message.author.id))
      return message.channel.send(
        `:tools:, **you can't restart the bot.**`
      );
    message.channel.send(`:white_check_mark:, **done...**`);
    client.destroy();
 
        
      
    
  }
});

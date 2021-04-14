 const Discord = require("discord.js"); //DEPENDENCIAS
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");

//Crie um arquivo chamado config.json e dentro do arquivo coloque assim {
//"token": "TOKEN DO SEU BOT",
// "prefix": "PREFIXO DO SEU BOT" 
//}
client.config = config;

fs.readdir("./events/", (err, files) => { //EVENTS HANDLER
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => { //EVENTS COMMANDS
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`[COMANDO]${commandName} Carregado com sucesso!`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token); //LIGAR

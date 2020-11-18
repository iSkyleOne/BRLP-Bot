const { CommandoClient } = require('discord.js-commando');
const Discord = require('discord.js');
const config = require('./config/config');
const path = require('path');
const requireAll = require('require-all');

const bot = new CommandoClient({
    commandPrefix: config.prefix,
    owner: '252005826842066945',
    unknownCommandResponse: false,
});

bot.registry
    .registerDefaultTypes()
    .registerGroups([
        [ 'sysop',  'SysOp user Group' ],
        [ 'admin',  'Admin user Group' ],
        [ 'simple',  'Simple user Group' ],
        [ 'regular',  'Regular user Group' ],
        [ 'music',  'Music Commands' ],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
    unknownCommand: false,
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));
  
bot.commands = new Discord.Collection();

const files = requireAll({                 
    dirname: `${__dirname}/events`,    
    filter: /^(?!-)(.+)\.js$/        
  }); 
bot.on("message",files["messages"].bind(null,bot));
bot.on("message",files["useful_cmds"].bind(null,bot));

bot.on('ready', () => {
  console.log('BOT - READY');
  bot.user.setActivity('over the server.', { type: 'WATCHING'})
  bot.voice.serverDeaf;
});

bot.on('message', message => {
    if(message.author.id == config.bot_owner) {
      switch(message.content.toUpperCase()) {
        case '?RESET':
            bot.users.cache.get(config.bot_owner).send('Am fost restartat de <@' + message.author.id + '>!');
            resetBot(message.channel);
            break;
        // ... other commands
    }
  }
});

function resetBot(channel) {
  // send channel a message that you're resetting bot [optional]
  channel.send('Resetting...')
  .then(msg => bot.destroy())
  .then(() => bot.login(config.token));
}

bot.login(config.token);


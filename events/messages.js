const { Channel } = require('discord.js');
const config = require('../config/config'); 
module.exports = (client, message) => {
    if(message.content == '!test' && message.author.id == config.bot_owner ){
        message.reply(config.bot_owner);
        message.channel.send('asdasd');
        message.channel.send(message.author.id);
        client.users.cache.get(config.bot_owner).send('Am fost restartat de <@' + message.author.id + '>!');
    }
    if(message.content == 'testas' && message.author.id == config.bot_owner ){
        message.reply(config.bot_owner);
        message.channel.send('asdasd');
        message.channel.send(message.author.id);
        client.users.cache.get(config.bot_owner).send('Am fost restartat de <@' + message.author.id + '>!');
    }
}
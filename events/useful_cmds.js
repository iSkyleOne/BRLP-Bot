const config = require('../config/config');

module.exports = (bot, message) => {
    if(message.content.startsWith(`${config.prefix} avatar`))
    {
        const usr = message.mentions.users.first();
        message.channel.send(usr.displayAvatarURL({size:1024, dynamic: true}));
    }
}
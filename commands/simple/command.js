const { Command } = require('discord.js-commando');
const Discord = require('discord.js');


module.exports = class CommandChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'command',
            group: 'regular',
            memberName: 'command',
            description: 'iese de pe voice channel',
            guildOnly: true,
            argsType: 'single',
        });    
    }

    async run(message) {
        console.log(message.member.channel)
    }
};

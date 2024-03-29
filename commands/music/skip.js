const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

skip = require('./play').skip;
var queue = require('./play').song;

module.exports = class SkipChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Da skip la melodie',
            guildOnly: true,
            argsType: 'single',
        });    
    }

    async run(message) {
        const voiceChannel = message.member.voice.channel;
        if (queue.length > 1){
            skip(voiceChannel);
        } else {
            message.channel.send("Nu am la ce da skip!");
        }
    }
};

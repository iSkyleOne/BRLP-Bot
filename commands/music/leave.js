const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

leave = require('./play').leave;

module.exports = class LeaveChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'music',
            memberName: 'leave',
            description: 'iese de pe voice channel',
            guildOnly: true,
            argsType: 'single',
        });    
    }

    async run(message) {
        leave();
        message.member.voice.channel.leave();
    }
};

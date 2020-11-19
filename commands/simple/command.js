const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

const ytpl = require('@distube/ytpl');
const ytdl = require('ytdl-core');

module.exports = class CommandChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'command',
            group: 'regular',
            memberName: 'command',
            description: '',
            guildOnly: true,
            //argsType: 'single',
        });    
    }

    async run(message, url) {
        
    }
};

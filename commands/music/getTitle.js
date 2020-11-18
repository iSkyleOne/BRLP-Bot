const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');


module.exports = class LeaveChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gettitle',
            group: 'music',
            memberName: 'gettitle',
            description: '//',
            guildOnly: true,
            argsType: 'single',
        });    
    }

    async run() {
        ytdl.getInfo('https://www.youtube.com/watch?v=YQHsXMglC9A', function(err, info) {
            console.log(info.title) // "Adele - Hello"
        });
    }
};

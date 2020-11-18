const { Command } = require('discord.js-commando');
const { Discord, MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const { add_song } = require('./play');

addSong = require('./play').add_song;


module.exports = class SearchChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'search',
            group: 'music',
            memberName: 'search',
            description: '//',
            guildOnly: true,
            // argsType: 'single',
        });    
    }

    async run(message, args) {
        const voiceChannel = message.member.voice.channel;
        ytsr.getFilters(args.toString()).then(async (filters1) => {
            const filter1 = filters1.get('Type').find(o => o.name === 'Video');
            const filters2 = await ytsr.getFilters(filter1.ref);
            const filter2 = filters2.get('Duration').find(o => o.name.startsWith('Short'));
            const options = {
                limit: 2,
                nextpageRef: filter2.ref,
            }
            const searchResults = await ytsr(args.toString(), options);
            console.log(searchResults);
            message.reply(searchResults.items[1].title + ' ' + searchResults.items[1].link);
            addSong(searchResults.items[1].title, searchResults.items[1].link, voiceChannel);
        }).catch(err => {
            console.error(err);
        });
    }
};



const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

var queue = require('./play').song;

module.exports = class QueueChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            description: 'Afiseaza playlist-ul',
            guildOnly: true,
            argsType: 'single',
        });    
    }

    async run(message) {
        if (queue.length > 0){
            const infos = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Lista")
            queue.forEach(element => {
                infos.addFields(
                    { name: element.title, value: element.url }
                )
            });
            
            message.say(infos);
            
        }
        else message.channel.send("Lista este goala.");
    }
};

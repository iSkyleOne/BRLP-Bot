const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

clearQueue = require('./play').clearQueue;
removeElement = require('./play').removeElement;
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

    async run(message, args) {
        args = args.split(' ');
        if (!args[0]){
            if (queue.length > 0){
                const infos = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Lista de melodii:")
                queue.forEach( function (element, i) {
                    infos.addFields(
                        { name: element.title, value: (i+" "+element.url) }
                    )
                });
                
                message.say(infos);
                
            }
            else message.channel.send("Lista este goala.");
        }
        else {
            if (args[0] == 'clear' && args[1] == 'all') {
                if(queue.length > 1) {
                    message.say("Am sters toata lista!");
                    clearQueue();
                }
            }
            if(args[0] == 'clear' && Number.isInteger(parseInt(args[1],10))){
                if (removeElement(parseInt(args[1],10))) {
                    message.say("Am sters elementul de pe pozitia " + args[1]);
                }
                else message.say("Elementul introdus se afla in afarea lungimei de lista.")
            }
        }
    }
};

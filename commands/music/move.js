const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

moveToBegining = require('./play').moveToBegining;


module.exports = class MoveChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'move',
            group: 'music',
            memberName: 'move',
            description: '//',
            guildOnly: true,
            argsType: 'single',
        });    
    }

    async run(message, args) {
        if (moveToBegining(parseInt(args,10))){
            message.channel.send("Am mutat melodia pe pozitia #1");
        }
        else message.channel.send("Nu am reusit sa mut melodia pe primul loc!");
    }
};

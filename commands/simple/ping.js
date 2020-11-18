const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ping extends Command {
	constructor(client) {
		super(client, {
			name: 'pingx',
			group: 'simple',
            memberName: 'pingpong',
            description: 'ping command',
		});
    }

    run(message) {
        const infos = new Discord.MessageEmbed()
        .setDescription("Test")
        .setTitle("Titlu")
        .setDescription("Desciption")
        .addFields(
            {name: "Field 1", value: ' Lorem Ipsum Dolor'},
            {name: "Field 2", value: ' Lorem Ipsum Dolor', inline: true },
            {name: "Field 3", value: ' Lorem Ipsum Dolor', inline: true }
        )
        message.say(infos);
    }
    /* 
    async run(message, args)
    {
        var word = args.split(',');
        if(args=="")
        {
            var myInfo = new Discord.MessageEmbed()
            .setDescription("!choose <cuvinte>")
            .setColor("#fe2957")
            message.channel.send(myInfo);
        }
        else{
            var pick = Math.floor(Math.random()*word.length)
            message.channel.send(word[pick]);
        }
    }*/
};
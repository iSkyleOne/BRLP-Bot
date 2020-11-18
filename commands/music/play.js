const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');

validURL = require('../functions/functions').validURL;

var song = [{ title: '', url: '' }];
var statement = false;
var messageChannel;
var chanID;
song.shift();

module.exports = class PlayChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Se alatura voicechat-ului',
            guildOnly: true,
            argsType: 'single',
        });    
    }

    async run(message, args) {
        const voiceChannel = message.member.voice.channel;
        chanID = voiceChannel
        const { voice } = message.member;
        messageChannel = message;
        
        if(!voice.channelID){
            message.reply('trebuie sa fi conectat pe un canal voice');
            return;
        }

        if (args) {
            if(validURL(args)){
                const videoInfo = await ytdl.getBasicInfo(args);;
                add_song(videoInfo.videoDetails.title, args, voiceChannel);
                exporting();
            }
            else {
                search(voiceChannel, args, message);
                exporting();
            }
        }
        else {
            if (song.length > 0) {
                playMusic(voiceChannel);
            }
            else message.reply("lista este goala, asa ca baga tu o melode sefule!");
        }
    }
}

async function search(voiceChannel, args, message){
    ytsr.getFilters(args.toString()).then(async (filters1) => {
        const filter1 = filters1.get('Type').find(o => o.name === 'Video');
        const filters2 = await ytsr.getFilters(filter1.ref);
        const filter2 = filters2.get('Duration').find(o => o.name.startsWith('Short'));
        const options = {
            limit: 2,
            nextpageRef: filter2.ref,
        }
        const searchResults = await ytsr(args.toString(), options);
        console.log("error 1")
        add_song(searchResults.items[1].title, searchResults.items[1].link, voiceChannel);
    }).catch(err => {
        console.error(err);
    });
}

function playMusic(index)
{
    chanID = index;
    console.log("error 2")
    const infos = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Acum ruleaza')
    .addFields(
        { name: song[0].title, value: song[0].url },
    )
    if (song.length > 1) {
        infos.addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Urmatoarea melodie:', value: '\u200B'},
            { name: song[1].title, value: song[1].url }
        )
        if (song.length > 2)
            infos.addFields(
                { name: song[2].title, value: song[2].url }
            )
    }
    messageChannel.say(infos);
    delete infos;
    index.join()
    .then(connection =>{
        statement = true
        const dispatcher = connection.play(ytdl(song[0].url, { quality: 'highestaudio' }));
        dispatcher.on('finish', () => {
            if(song.length>1) {
                skip(chanID);
            }
            else {
                song.shift();
                statement = false;
                index.leave();
                exporting();
            }
        })
        exporting();
    }).catch('error');
}

function add_song(title, url, index)
{
    if (song.length > 0) {
        var infos = new Discord.MessageEmbed()
        .setColor('#e4eb1a')
        .setTitle('Am adaugat')
        .addFields(
            { name: title, value: url }
        )
        messageChannel.say(infos);
    }
    console.log("error 3")
    song.push({ title: title, url: url });
    if (statement == false){
        playMusic(index)
    }
}

function skip(voiceChannel)
{
    console.log("error 4")
    song.shift();
    playMusic(voiceChannel);
    exporting();
}

function clearQueue(){
    console.log("error 5")
    song.splice(1, song.length)
    exporting();
}

function removeElement(index) {
    console.log("error 6")
    if(!(index < 1 || index > song.length)){
        song.splice(index, 1);
        exporting();
        return true;
    }
    else return false;
}

function moveToBegining(index) {
    console.log("error 7")
    if (index > 0) {
        const a = song.splice(index,1);
        song.splice(1, 0, a[0]);
        exporting();
        return true;
    }
    else return false;
}

function leave(){
    statement = false;
}

function exporting()
{
    module.exports.song = song;
}

module.exports.song = song;
module.exports.skip = skip;
module.exports.leave = leave;
module.exports.add_song = add_song;
module.exports.clearQueue = clearQueue;
module.exports.removeElement = removeElement;
module.exports.moveToBegining = moveToBegining;
const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

var song = [{ title: '', url: '' }];
var statement = false;
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
        
        if(!voice.channelID){
            message.reply('trebuie sa fi conectat pe un canal voice');
            return;
        }

        if (song.length >= 0 && args) {
            if(!args && statement == false) {
                setTimeout(function(){ 
                    playMusic(voiceChannel);
                    message.channel.send("Acum canta: " + song[0].title);
                }, 1200);
            }
            else {
                if (statement==false) {
                    setTimeout(function(){ 
                        add_song(message.embeds[0].title, args);
                        playMusic(voiceChannel);
                        message.channel.send("Acum canta: " + song[0].title);
                    }, 1200);
                }
                else {
                    setTimeout(function(){ 
                        add_song(message.embeds[0].title, args);
                        message.channel.send("Am adaugat: " + message.embeds[0].title);
                    }, 1200);
                }
            }
        }
        else message.reply('bagam si noi o melodie sau sall?');
        
        exporting();
    }
}


function playMusic(index)
{
    chanID = index;
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
            }
        })
        exporting();
    }).catch('error');
}

function add_song(title, url, index)
{
    song.push({title: title, url: url});
    if (statement == false){
        playMusic(index)
    }
}

function exporting()
{
    module.exports.song = song;
}

function skip(voiceChannel)
{
    song.shift();
    playMusic(voiceChannel);
}

function leave(){
    statement = false;
}

module.exports.song = song;
module.exports.skip = skip;
module.exports.leave = leave;
module.exports.add_song = add_song;


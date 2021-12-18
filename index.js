const { token, frontID, backID } = require('./config.json');
const { Client } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_PRESENCES", "GUILD_WEBHOOKS"] });

const SameServer = require('./class/sameServer');
const SameMessageCreate = require('./class/sameMessageCreate');
const SameMessageUpdate = require('./class/sameMessageUpdate');

client.once('ready', () => {
    console.log('Ready!');
})

client.on('messageCreate', message => {
    if (message.guildId != frontID) return;
    try { new SameMessageCreate(message, client, backID).sendSameMessage() } catch {}
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (newMessage.guildId != frontID) return;
    try { new SameMessageUpdate(oldMessage, newMessage, client, backID).updateSameMessage(); } catch {}
});

client.on('messageDelete', message => {
    if (message.guildId != frontID) return;
    try {
        new SameServer(client, backID).setSameChannel(message.channel.name).then(same => {
            same.getSameMessage(message).then(sameMessage => {
                sameMessage.delete();
            })
        })
    } catch {}
});

client.login(token);
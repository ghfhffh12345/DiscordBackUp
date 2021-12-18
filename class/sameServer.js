const { backID } = require('../config.json');
const { MessageMentions } = require('discord.js');

class SameServer {
    constructor (client) {
        this.client = client;
    }

    async setSameChannel(frontChannelName) {
        this.channel = await (await this.client.guilds.fetch(backID)).channels.cache.find(ch => ch.name == frontChannelName);
        return this
    }

    async getSameWebhook(frontUser) {
        let webhookClient;

        const webhooks = await this.channel.fetchWebhooks();
        webhookClient = webhooks.find(wh => wh.name == frontUser.username);

        if (!webhookClient) {
            webhookClient = await this.channel.createWebhook(frontUser.username, {
                avatar: frontUser.avatarURL()
            });
        }

        return webhookClient
    }

    async getSameMessage(frontMessage) {
        const backAllMessage = await this.channel.messages.fetch({ limit: 100 });
        const backMessage = backAllMessage.find(m => (
            m.content == frontMessage.content &&
            m.author.username == frontMessage.author.username &&
            m.createdTimestamp - frontMessage.createdTimestamp < 2000 &&
            m.webhookId
        ));
        return backMessage
    }

    messageObjectToSend(frontMessage) {
        return {
            content: frontMessage.content,
            username: frontMessage.author.username,
            avatarURL: frontMessage.author.avatarURL(),
            embeds: frontMessage.embeds
        }
    }
}

module.exports = SameServer;
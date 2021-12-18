const SameServer = require('./sameServer');

class SameMessageCreate extends SameServer {
    constructor (frontMessage, client) {
        super(client);
        this.frontMessage = frontMessage;
    }

    async sendSameMessage() {
        await this.setSameChannel(this.frontMessage.channel.name);
        const webhookClient = await this.getSameWebhook(this.frontMessage.author);

        webhookClient.send(this.messageObjectToSend(this.frontMessage));
        return this
    }
}

module.exports = SameMessageCreate;
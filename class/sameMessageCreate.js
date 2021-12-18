const SameServer = require('./sameServer');

class SameMessageCreate extends SameServer {
    constructor (frontMessage, client, backID) {
        super(client, backID);
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
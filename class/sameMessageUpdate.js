const SameServer = require('./sameServer');

class SameMessageUpdate  extends SameServer {
    constructor (frontOldMessage, frontNewMessage, client, backID) {
        super(client, backID);
        this.frontOldMessage = frontOldMessage;
        this.frontNewMessage = frontNewMessage;
    }

    async updateSameMessage() {
        await this.setSameChannel(this.frontOldMessage.channel.name);

        const backMessage = await this.getSameMessage(this.frontOldMessage);
        if (!backMessage) throw Error('undefind Message');

        const webhookClient = await this.getSameWebhook(this.frontOldMessage.author);

        webhookClient.editMessage(backMessage.id, this.messageObjectToSend(this.frontNewMessage));
        return this
    }
}

module.exports = SameMessageUpdate;
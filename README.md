> # Function
The BackUp bot saves messages from the Front server to the Back server as they are.

> # How to use
Create the following config.json file.
```json
{
  "token": "Input your bot token",
  "backID": "Input your back server id",
  "frontID": "Input your front server id"
}
```
Then, you can run the bot code as `node.js`.

> # Precautions
The config.json file should be located in the same location as `index.js` if it is executed as `node.js`.

The back server must have a channel with the same name as the front server's channel.
If the message is on a channel only on the front server, it cannot be saved on the back server.
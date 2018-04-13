import { startRedis } from './redis'

const { client } = startRedis()
// This should be an observable or subject and should live in redis/index
client.on('message', (channel, message) => {
    console.log("sub channel " + channel + ": " + message);
    return {
        channel,
        message
    }
})

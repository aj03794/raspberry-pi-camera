import { startRedis } from './redis'
import { sendToCloudStorage } from './cloud-storage'
import { takePhoto } from './raspicam'

console.log(process.env.TEST)

const { client } = startRedis()
// This should be an observable or subject and should live in redis/index
client.on('message', (channel, message) => {
    console.log("sub channel " + channel + ": " + message);
    takePhoto()
    .then(sendToCloudStorage)
    .then(() => {
        console.log('Done uploading')
    })
    // sendToCloudStorage()
    // .then(() => {
    //     return
    // })
    // return {
    //     channel,
    //     message
    // }
})

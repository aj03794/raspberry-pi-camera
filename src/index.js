const cloudStorageProvider = process.env['cloudStorage'].toLowerCase()
const pubsubProvider = process.env['pubsub'].toLowerCase()
const cameraProvider = process.env['camera'].toLowerCase()

const dynamicImportPromises = [
    import(`./pub-sub`),
    import(`./cloud-storage`),
    import(`./camera`)
]

Promise.all(dynamicImportPromises)
// .then(functions => {
//     const pubsub = functions[0][pubsubProvider]
//     const cloudStorage = functions[1][cloudStorageProvider]
//     const camera = functions[2][cameraProvider]
//     return {
//         pubsub,
//         cloudStorage,
//         camera
//     }
// })
.then(([
    pubsubProvider: pubsub,
    cloudStorageProvider: cloudStorage,
    cameraProvider: camera
]) => ({
    pubsub,
    cloudStorage,
    camera
})
.then(({
    pubsub: {
		connection,
		filterConnection,
		sendConnection,
		allMessages,
		filterMessages,
		sendMessage
    },
    // cloudStorage: {
    //     uploadPhoto
    // },
    camera: {
        takePhoto
    }
}) => {
    // const { client } = pubsub()
    // const { takePhoto } = camera()
    // const { uploadPhoto } = cloudStorage()
    filterMessages(msgJson => {
        var msg = JSON.parse(msgJson)
        return msg.motion
    }).subscribe(() => {
        takePhoto()
        .then(photo => {
            sendMessage('photo-taken', {
                meta: {
                    stuffIWantToKnowAboutWhatJustHappened
                },
                photo
            })
        })
    })
    // client.on('message', (channel, message) => {
    //     console.log("sub channel " + channel + ": " + message)
    //     if(JSON.parse(message).msg.motion) {
    //         return takePhoto()
    //         .then(uploadPhoto)
    //     }
    //     else {
    //         console.log('No motion detected')
    //     }
    // })
})

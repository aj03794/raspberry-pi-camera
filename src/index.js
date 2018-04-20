const cloudStorageProvider = process.env['cloudStorage'].toLowerCase()
const pubsubProvider = process.env['pubsub'].toLowerCase()
console.log('pubsubProvider', pubsubProvider)
const cameraProvider = process.env['camera'].toLowerCase()

const dynamicImportPromises = [
    import(`./pub-sub`),
    import(`./cloud-storage`),
    import(`./camera`)
]

Promise.all(dynamicImportPromises)
.then(([
    { [pubsubProvider]: pubsub },
    // { [cloudStorageProvider]: cloudStorage },
    // { [cameraProvider]: camera }
]) => pubsub())
.then(({
    subscribe,
    publish
}) => {
    subscribe({
        channel: 'test'
    })
    .then(({ connect }) => connect())
    .then(({ allMsgs, filterMsgs }) => {
        console.log('allMsgs', allMsgs)
        allMsgs()
        // console.log('filter', filter)
        // all()
    })
        // .then(({ all, filter }) => {
        //     all((...args) => {
        //         console.log('called', args)
        //     })
        // })
        // .then(() => {
        //     publish().then(({ connect }) => connect())
        //         .then(({ send }) => send({
        //             channel: 'test',
        //             data: {
        //                 some: 'data'
        //             }
        //         }))
        // })

    // camera({ publish, subscribe })
    // cloudStorage({ publish, subscribe })
})


























// const cloudStorageProvider = process.env['cloudStorage'].toLowerCase()
// const pubsubProvider = process.env['pubsub'].toLowerCase()
// const cameraProvider = process.env['camera'].toLowerCase()
//
// const dynamicImportPromises = [
//     import(`./pub-sub`),
//     import(`./cloud-storage`),
//     import(`./camera`)
// ]
//
// Promise.all(dynamicImportPromises)
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
// })
// .then(([
    // pubsubProvider: pubsub,
    // cloudStorageProvider: cloudStorage,
    // cameraProvider: camera
//     pubsub
// ]) => ({
//     pubsub,
    // cloudStorage,
    // camera
// }))
// .then(({
//     pubsub
// })
// .then(({
//     pubsub: {
// 		connection,
// 		filterConnection,
// 		sendConnection,
// 		allMessages,
// 		filterMessages,
// 		sendMessage
//     },
    // cloudStorage: {
    //     uploadPhoto
    // },
    // camera: {
    //     takePhoto
    // }
// }) => {
    // console.log('connection', connection)
    // console.log('filterConnection', filterConnection)
    // console.log('sendConnection', sendConnection)
    // filterMessages(msgJson => {
    //     const msg = JSON.parse(msgJson)
    //     return msg.motion
    // }).subscribe(() => {
    //     takePhoto()
    //     .then(photo => {
    //         sendMessage('photo-taken', {
    //             meta: {
    //                 stuffIWantToKnowAboutWhatJustHappened
    //             },
    //             photo
    //         })
    //     })
    // })
// })




// .then(({ pubsub )} => {
//     return pubsub.then(({
//         connection,
//         filterConnection,
//         sendConnection,
//         allMessages,
//         filterMessages,
//         sendMessage
//     }) => {
//         connection,
// 		filterConnection,
// 		sendConnection,
// 		allMessages,
// 		filterMessages,
// 		sendMessage
//     })

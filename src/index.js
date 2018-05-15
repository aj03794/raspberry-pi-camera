import { createGithubHook } from './github-hook'
require('dotenv').config()

const cloudStorageProvider = process.env['cloudStorage'].toLowerCase()
const pubsubProvider = process.env['pubsub'].toLowerCase()
const cameraProvider = process.env['camera'].toLowerCase()

// import(`./pub-sub`)
//     .then(({
//         [pubsubProvider]: pubsub
//     }) => pubsub())
//     .then(({
//         subscribe,
//         publish
//     }) => {
//         return Promise.all([
//             import(`./cloud-storage`),
//             import(`./camera`)
//         ])
//             .then(([
//                 { [cloudStorageProvider]: cloudStorage },
//                 { [cameraProvider]: camera }
//             ]) => {
//                 const pubsubFunctions = {
//                     publish,
//                     subscribe
//                 }
//                 cloudStorage({ ...pubsubFunctions })
//                 camera({ ...pubsubFunctions })
//                 return
//             })
//         }
//     )
//
createGithubHook()



























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

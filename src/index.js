import { getSetting } from './settings'
import { slack as createSlack } from './slack'
import { manageFolder } from './manage-folder'

// const pubsubProviders = getSetting('pubsub')
// const pubsubProviderLength = pubsubProvider.length
const cameraProvider = getSetting('camera')

console.log('UUID ----->', process.env.UUID || 'dev')

// console.log('pubsubProvider', pubsubProvider)
// console.log('cameraProvider', cameraProvider)

// getSetting('pubsub').map(x => console.log('X', x))

const pubsubProviders = getSetting('pubsub').map(pubsubProvider => {
    console.log('pubsubProvider', pubsubProvider)
    const x = import(`./pub-sub`)
    console.log('X', x)
    return x
})
Promise.all(pubsubProviders).then(result => console.log('RESULT', result))

const uuid = process.env.UUID || 'dev'

const imports = [
    import('./pub-sub'),
    import(`./camera`),
    import(`./pub-sub/gcp`)
]

// Promise.all(imports)
// .then(([
    // { [pubsubProviders[0]]:  },
    // { [pubsubProvider[1]]: pubsub },
    // pubsub,
//     { [cameraProvider]: camera },
//     { gcp }
// ]) => {
//     console.log('PUBSUB', one)
//     const { publisherCreator, subscriberCreator } = pubsub({
//         host: process.argv[2] === 'dev' ? '127.0.0.1' : 'main.local'
//     })
//     return Promise.all([
//         publisherCreator(),
//         subscriberCreator(),
//         gcp({ getSetting })
//     ])
//     .then(([
//         { publish },
//         { subscribe },
//         { allGcpMsgs, filterGcpMsgs }
//     ]) => {
//         const slack = createSlack({ publish })
//         const gcpFunctions = {
//             allGcpMsgs,
//             filterGcpMsgs,
//         }
//         const pubsubFunctions = {
//             publish,
//             subscribe
//         }
//         return camera({
//             ...pubsubFunctions,
//             getSetting,
//             slack,
//             manageFolder,
//             ...gcpFunctions
//         })
//     })
// })

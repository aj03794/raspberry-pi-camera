import { getSetting } from './settings'
import { slack as createSlack } from './slack'
import { manageFolder } from './manage-folder'

const pubsubProvider = getSetting('pubsub')
const cameraProvider = getSetting('camera')

console.log('New redis setup')
console.log('process', process.argv[2])
console.log(process.argv[2] === 'dev' ? '127.0.0.1' : 'main.local')
console.log('UUID ----->', process.env.UUID || 'dev')

console.log('pubsubProvider', pubsubProvider)
console.log('cameraProvider', cameraProvider)

const uuid = process.env.UUID || 'dev'

const imports = [
    import('./pub-sub'),
    import(`./camera`),
    import(`./pub-sub/gcp`)
]

Promise.all(imports)
.then(([
    { [pubsubProvider]: pubsub },
    { [cameraProvider]: camera },
    { gcp }
]) => {

    const { publisherCreator, subscriberCreator } = pubsub({
        host: process.argv[2] === 'dev' ? '127.0.0.1' : 'main.local'
    })
    return Promise.all([
        publisherCreator(),
        subscriberCreator(),
        gcp({ getSetting })
    ])
    .then(([
        { publish },
        { subscribe },
        { allGcpMsgs, filterGcpMsgs }
    ]) => {
        const slack = createSlack({ publish })
        const gcpFunctions = {
            allGcpMsgs,
            filterGcpMsgs,
        }
        const pubsubFunctions = {
            publish,
            subscribe
        }
        return camera({
            ...pubsubFunctions,
            getSetting,
            slack,
            manageFolder,
            ...gcpFunctions
        })
    })
})

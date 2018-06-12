import { getSetting } from './settings'
import { slack as createSlack } from './slack'
import { manageFolder } from './manage-folder'

const pubsubProvider = getSetting('pubsub')
const cameraProvider = getSetting('camera')

console.log('New redis setup')
console.log('process', process.argv[2])
console.log(process.argv[2] === 'dev' ? '127.0.0.1' : 'main.local')
console.log('UUID', process.env.UUID)

console.log('pubsubProvider', pubsubProvider)
console.log('cameraProvider', cameraProvider)

const imports = [
    import('./pub-sub'),
    import(`./camera`)
]

Promise.all(imports)
.then(([
    { [pubsubProvider]: pubsub },
    { [cameraProvider]: camera }
]) => {
    const { publisherCreator, subscriberCreator } = pubsub({
        host: process.argv[2] === 'dev' ? '127.0.0.1' : 'main.local'
    })
    return Promise.all([
        publisherCreator(),
        subscriberCreator()
    ])
    .then(([
        { publish },
        { subscribe }
    ]) => {
        const slack = createSlack({ publish })
        const pubsubFunctions = {
            publish,
            subscribe
        }
        camera({ ...pubsubFunctions, getSetting, slack, manageFolder })
        return
    })
})

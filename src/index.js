// require('dotenv').config()
import { getSetting } from './settings'
import { slack as createSlack } from './slack'

const cloudStorageProvider = getSetting('cloudStorage')
const pubsubProvider = getSetting('pubsub')
const cameraProvider = getSetting('camera')


console.log('cloudStorageProvider', cloudStorageProvider)
console.log('pubsubProvider', pubsubProvider)
console.log('cameraProvider', cameraProvider)

const imports = [
    import('./pub-sub'),
    import(`./cloud-storage`),
    import(`./camera`)
]

Promise.all(imports)
.then(([
    { [pubsubProvider]: pubsub },
    { [cloudStorageProvider] : cloudStorage },
    { [cameraProvider]: camera }
]) => {
    const { publisherCreator, subscriberCreator } = pubsub()
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
        // cloudStorage({ ...pubsubFunctions, getSetting, slack })
        camera({ ...pubsubFunctions, getSetting, slack })
        return
    })
})

require('dotenv').config()
import { getSetting } from './settings'

// const cloudStorageProvider = process.env['cloudStorage'].toLowerCase()
// const pubsubProvider = process.env['pubsub'].toLowerCase()
// const cameraProvider = process.env['camera'].toLowerCase()

const cloudStorageProvider = getSetting('cloudStorage')
const pubsubProvider = getSetting('pubsub')
const cameraProvider = getSetting('camera')


console.log('cloudStorageProvider', cloudStorageProvider)
console.log('pubsubProvider', pubsubProvider)
console.log('cameraProvider', cameraProvider)

console.log('For test')

import(`./pub-sub`)
    .then(({
        [pubsubProvider]: pubsub
    }) => pubsub())
    .then(({
        subscribe,
        publish
    }) => {
        return Promise.all([
            import(`./cloud-storage`),
            import(`./camera`)
        ])
            .then(([
                { [cloudStorageProvider]: cloudStorage },
                { [cameraProvider]: camera }
            ]) => {
                const pubsubFunctions = {
                    publish,
                    subscribe
                }
                cloudStorage({ ...pubsubFunctions, getSetting })
                camera({ ...pubsubFunctions, getSetting })
                return
            })
        }
    )

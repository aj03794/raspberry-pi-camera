// require('dotenv').config()
import { getSetting } from './settings'
import { slack as createSlack } from './slack'
import { manageFolder } from './manage-folder'

const cloudStorageProvider = getSetting('cloudStorage')
const pubsubProvider = getSetting('pubsub')
const cameraProvider = getSetting('camera')


console.log('cloudStorageProvider', cloudStorageProvider)
console.log('pubsubProvider', pubsubProvider)
console.log('cameraProvider', cameraProvider)


import(`./pub-sub`)
    .then(({
        [pubsubProvider]: pubsub
    }) => pubsub())
    .then(({
        subscribe,
        publish
    }) => {
        const slack = createSlack({ publish })
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
                cloudStorage({ ...pubsubFunctions, getSetting, slack, manageFolder })
                camera({ ...pubsubFunctions, getSetting, slack, manageFolder })
                return
            })
        }
    )

// require('dotenv').config()
import { getSetting } from './settings'
import { slack as createSlack } from './slack'

const cloudStorageProvider = getSetting('cloudStorage')
const pubsubProvider = getSetting('pubsub')
const cameraProvider = getSetting('camera')


console.log('cloudStorageProvider', cloudStorageProvider)
console.log('pubsubProvider', pubsubProvider)
console.log('cameraProvider', cameraProvider)


import(`./pub-sub`)
    .then(({
        [pubsubProvider]: pubsub
    }) => {
       const { publisherCreator, subscriberCreator } = pubsub()
       return Promise.all([
           import(`./cloud-storage`),
           import(`./camera`),
           publisherCreator(),
           subscriberCreator()
       ])
       .then(([
           { [cloudStorageProvider] : cloudStorage },
           { [cameraProvider]: camera },
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
       
    //    console.log('cloudStorage')
    //    return { publisherCreator, subscriberCreator }
    })
    // .then(({
    //     subscribe,
    //     publish
    // }) => {
        // const slack = createSlack({ publish })
        // return Promise.all([
        //     import(`./cloud-storage`),
        //     import(`./camera`)
        // ])
        //     .then(([
        //         { [cloudStorageProvider]: cloudStorage },
        //         { [cameraProvider]: camera }
        //     ]) => {

        // }
    // })

require('dotenv').config()

const cloudStorageProvider = process.env['cloudStorage'].toLowerCase()
const pubsubProvider = process.env['pubsub'].toLowerCase()
const cameraProvider = process.env['camera'].toLowerCase()

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
                cloudStorage({ ...pubsubFunctions })
                camera({ ...pubsubFunctions })
                return
            })
        }
    )

	//

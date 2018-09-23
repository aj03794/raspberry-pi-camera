export const initializePubSubProviders = ({
    getSetting,
    newPubSubMsg
}) => {

    const { type } = getSetting('pubsub').gcp
    return import(`./gcp/${type}`)
        .then(({
            [type]: pubSub
        }) => {
            pubSub({
                newPubSubMsg
            })
        })

}
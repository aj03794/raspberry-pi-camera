import { takePhoto as takePhotoCreator } from './photo'
import dateTime from 'date-time'
import { createSubscriptions } from './subscriptions'

const timestamp = () => {
    return dateTime({ local: true })
}

export const raspicam = ({
    publish,
    subscribe,
    getSetting,
    slack,
    manageFolder,
    filterGcpMsgs,
    enqueue
}) => {

    const takePhoto = takePhotoCreator({ getSetting, slack, manageFolder, publish })

    createSubscriptions({
        subscribe,
        filterGcpMsgs
    })
    .then(({
        redisSubscription,
        gcpSubscription
    }) => {
        redisSubscription.subscribe(msg => {
            enqueue(takePhoto({ photoType: 'automatic' }))
        })
        gcpSubscription.subscribe(msg => {
            enqueue(takePhoto({ photoType: 'manual' }))
        })
    })
}

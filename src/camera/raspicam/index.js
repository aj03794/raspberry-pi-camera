import { takePhoto } from './photo'
import dateTime from 'date-time'
import { createSubscriptions } from './subscriptions'

const timestamp = () => {
    return dateTime({ local: true })
}

export const raspicam = ({
    subscribe,
    getSetting,
    slack,
    manageFolder,
    filterGcpMsgs
}) => {
    createSubscriptions({
        subscribe,
        filterGcpMsgs
    })
    .then(({
        redisSubscription,
        gcpSubscription
    }) => {
        redisSubscription.subscribe(msg => {
            enqueue(takePhoto)
        })
        gcpSubscription.subscribe(msg => {
            const uploadFileToSlack = ({ file }) => new Promise((resolve, reject) => {
                slack({
                    slackMsg: {
                        meta: {
                            timestamp: timestamp()
                        },
                        msg: 'Photo upload successful - local',
                        operation: 'FILE_UPLOAD',
                        file
                    }
                })
                return resolve()
            })
            enqueue(takePhoto)
        })
    })
}

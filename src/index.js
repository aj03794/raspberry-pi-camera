import { initializePubSubProviders } from './infrastructure/pubsub'
import { createSubject } from './infrastructure/utils/rx'
import { initializeTakePhotoController } from './interfaces/index'
import { getSetting } from './infrastructure/settings'
import { queue } from './infrastructure/queue'
import { createPhotoPath } from './infrastructure/utils/photo-name'

const {
    next: newPubSubMsg,
    subscribe: pubSubMsgSubscription,
    filter: pubSubMsgFilter
} = createSubject()

const {
    next: newSlackMsg,
    subscribe: slackMsgSubscription,
    filter: slackMsgFilter
} = createSubject()

const {
    next: newErrorMsg,
    subscribe: errMsgSubscription
} = createSubject()

initializeTakePhotoController({
    pubSubMsgSubscription,
    pubSubMsgFilter,
    queue,
    getSetting,
    newErrorMsg,
    createPhotoPath
})
.then(() => {
    initializePubSubProviders({
        getSetting,
        newPubSubMsg
    })
    // newPubSubMsg({
    //     command: 'take-photo',
    //     from: 'cloud'
    // })
})
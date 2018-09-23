import { initializePubSubProviders } from './infrastructure/pubsub'
import { createSubject } from './infrastructure/utils/rx'
import { initializeTakePhotoController } from './interfaces/index'
import { getSetting } from './infrastructure/settings'
import { queue } from './infrastructure/queue'

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
    next: newErrMsg,
    subscribe: errMsgSubscription
}

initializeTakePhotoController({
    pubSubMsgSubscription,
    pubSubMsgFilter,
    queue,
    getSetting,
    newErrorMsg
})
.then(() => {
    initializePubSubProviders({
        getSetting,
        newPubSubMsg
    })
})
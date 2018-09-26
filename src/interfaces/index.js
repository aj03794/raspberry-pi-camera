import { ensureDirectoryExists, manageFolder } from '../infrastructure/utils/fs'
import { raspicam } from '../infrastructure/camera'
import { resolve as resolvePath } from 'path'

export const initializeTakePhotoController = ({
    pubSubMsgSubscription,
    pubSubMsgFilter,
    queue,
    getSetting,
    newErrorMsg,
    createPhotoPath
}) => {

    const q = queue((msg, cb) => {
        return executeMsg(msg).then(cb)
    })

    const pushToQueue = msg => {
        q.push(msg)
    }

    pubSubMsgSubscription(msg => {
        pushToQueue(msg)
    })

    const executeMsg = (msg) => {

        return import(`../application/use-cases/${msg.command}/index.js`)
            .then(({
                takePhoto
            }) => {
                takePhoto({
                    msg,
                    raspicam
                })
                    .catch(err => {
                        newErrorMsg({
                            messageType: 'FATAL',
                            data: {
                                err
                            }
                        })
                    })
            })
            .catch(err => {
                const msg = {
                    messageType: "FATAL",
                    data: {
                        err
                    }
                }
                console.error(msg)
                newErrorMsg(msg)
            })

    }

    return Promise.resolve()

}
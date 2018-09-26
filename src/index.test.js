import { assert } from 'chai'

import { cwd } from 'process'
import { resolve as resolvePath } from 'path'
import { homedir } from 'os'
import { removeSync } from 'fs-extra'

import { queue } from './infrastructure/queue'
import { initializePubSubProviders } from './infrastructure/pubsub'
import { createSubject } from './infrastructure/utils/rx'
import { takePhotoController } from './interfaces/index'
import { getSetting } from './infrastructure/settings'
import { initializeTakePhotoController } from './interfaces/index'
import { takePhoto } from './application/use-cases/take-photo'
import { ensureDirectoryExists, manageFolder } from './infrastructure/utils/fs'
import { raspicam } from './infrastructure/camera'
import { createPhotoPath } from './infrastructure/utils/photo-name'

let newPubSubMsg,
    pubSubMsgSubscription,
    pubSubMsgFilter,
    newErrorMsg,
    errorMsgSubscription

process.argv[2] = 'dev'

describe('tests', () => {

    beforeEach(done => {

        const pubSubMsg = createSubject()
        newPubSubMsg = pubSubMsg.next
        pubSubMsgSubscription = pubSubMsg.subscribe
        pubSubMsgFilter = pubSubMsg.filter

        const errorMsg = createSubject()
        newErrorMsg = errorMsg.next
        errorMsgSubscription = errorMsg.subscribe
        done()

    })

    it('should execute incoming message', done => {

        initializeTakePhotoController({
            pubSubMsgSubscription,
            queue,
            pubSubMsgFilter,
            getSetting,
            newErrorMsg
        })
        .then(() => {
                newPubSubMsg({
                    command: 'take-photo',
                    from: 'cloud'
                })
        })
        .then(() => {
            done()
        })
    })

    it('should give error because command is not found', done => {

        initializeTakePhotoController({
            pubSubMsgSubscription,
            queue,
            pubSubMsgFilter,
            getSetting,
            newErrorMsg
        })
        .then(() => {
                newPubSubMsg({
                    command: 'fake command',
                    from: 'cloud'
                })

                const subscription = errorMsgSubscription(msg => {
                    assert.equal(msg.messageType, 'FATAL')
                    assert.exists(msg.data.err)
                    subscription.unsubscribe()
                    done()
                })
        })
    })

    it('should give error because from prop is not valid', done => {

        initializeTakePhotoController({
            pubSubMsgSubscription,
            queue,
            pubSubMsgFilter,
            getSetting,
            newErrorMsg
        })
        .then(() => {

                newPubSubMsg({
                    command: 'take-photo',
                    from: 'fake'
                })

                const errSub = errorMsgSubscription(msg => {
                    console.log('errSub', errSub)
                    assert.equal(msg.messageType, 'FATAL')
                    assert.exists(msg.data.err)
                    errSub.unsubscribe()
                    done()
                })
        })
    })

    it.only('should create dir homedir of os for photos to be stored', done => {

        const msg = {
            command: 'take-photo',
            from: 'cloud'
        }

        takePhoto({
            msg,
            raspicam
        })
        .then(() => {
            const dir = resolvePath(homedir(), 'cooper-cam-photos')
            console.log({
                dir
            })
            assert.exists(dir)
            // Clean up
            // removeSync(dir)
            done()
        })
    })


})
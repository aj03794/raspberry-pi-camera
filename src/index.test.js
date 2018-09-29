import { assert } from 'chai'

import { cwd } from 'process'
import { resolve as resolvePath } from 'path'
import { homedir } from 'os'
import { removeSync, existsSync, readdirSync } from 'fs-extra'

import { queue } from './infrastructure/queue'
import { initializePubSubProviders } from './infrastructure/pubsub'
import { createSubject } from './infrastructure/utils/rx'
import { takePhotoController } from './interfaces/index'
import { getSetting } from './infrastructure/settings'
import { initializeTakePhotoController } from './interfaces/index'
import { takePhoto } from './application/use-cases/take-photo'
import { ensureDirectoryExists, manageFolder } from './infrastructure/utils/fs'
import { raspicam } from './infrastructure/camera'
import { createPhotoPath as realCreatePhotoPath } from './infrastructure/utils/photo-name'
import { savePhoto } from './infrastructure/storage'
import { slackClient } from './infrastructure/slack'

const { uploadPhotoToSlack } = slackClient()

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

    it('should create dir for photos to be stored and save photo', done => {

        const msg = {
            command: 'take-photo',
            from: 'cloud'
        }
       
        takePhoto({
            msg,
            raspicam,
            savePhoto
        })
        .then(() => {
            const dir = resolvePath(homedir(), 'cooper-cam-photos')
            assert.equal(true, existsSync(dir))
            assert.equal(readdirSync(dir).length, 1)
            removeSync(dir)
            done()
        })
    })

    it('should only keep a max number of 10 photos', done => {

        const msg = {
            command: 'take-photo',
            from: 'cloud'
        }

        const dir = resolvePath(homedir(), 'cooper-cam-photos')

        initializeTakePhotoController({
            pubSubMsgSubscription,
            queue,
            pubSubMsgFilter,
            getSetting,
            newErrorMsg
        })
        .then(() => {

                let called = 0

                const z = setInterval(() => {
                    console.log('called', called)
                    called++
                    newPubSubMsg({
                        command: 'take-photo',
                        from: 'cloud'
                    })
                    if (called === 11) {
                        clearInterval(z)
                        const length = readdirSync(dir).length
                        console.log('LENGTH', length)
                        assert.equal(length, 10)
                        removeSync(dir)
                        done()
                    }
                }, 100)
        })
    })

    it.only('should post picture to slack', done => {

        const msg = {
            command: 'take-photo',
            from: 'cloud'
        }

        const dir = resolvePath(homedir(), 'cooper-cam-photos')

        initializeTakePhotoController({
            pubSubMsgSubscription,
            queue,
            pubSubMsgFilter,
            getSetting,
            newErrorMsg,
            uploadPhotoToSlack
        })
        .then(() => {

                let called = 0

                const z = setInterval(() => {
                    console.log('called', called)
                    called++
                    newPubSubMsg({
                        command: 'take-photo',
                        from: 'cloud'
                    })
                    if (called === 1) {
                        clearInterval(z)
                        const length = readdirSync(dir).length
                        console.log('LENGTH', length)
                        assert.equal(length, 1)
                        removeSync(dir)
                        done()
                    }
                }, 100)
        })
    })


})
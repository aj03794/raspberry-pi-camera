// import RaspiCam from 'raspicam'
import { resolve as resolvePath } from 'path'
import { ensureDirSync } from 'fs-extra'
// import { managePhotos } from './manage-photos'
import { takePhoto } from './photo'
import { queue } from 'async'
import dateTime from 'date-time'

const timestamp = () => {
    console.log('DATETIME', dateTime({ local: true }))
    return dateTime({ local: true })
}

export const raspicam = ({
    publish,
    subscribe,
    getSetting,
    slack,
    manageFolder,
    allGcpMsgs,
    filterGcpMsgs
}) => {
    console.log('---->', timestamp())
    const queue = q({ publish })
    subscribe({
        channel: 'motion sensor'
    })
    .then(({ allMsgs, filterMsgs }) => {
        filterMsgs(msg => {
            if (msg.data) {
              // console.log('msg.data', msg.data)
                const { motion } = JSON.parse(msg.data[1])
            //     return motion
            return motion
            }
            return false
        })
        .subscribe(msg => {
            console.log('filteredMsg - raspicam', msg)
            enqueue({ msg, queue, getSetting, slack, manageFolder })
        })
    })
    filterGcpMsgs(msg => {
        if (
            msg
            && msg.data
            && msg.data.message
            && msg.data.message.data
            && msg.data.message.data.body
            && msg.data.message.data.body.command
        ) {
            if (msg.data.message.data.body.command === '/take-photo'){
                return true
            }
            return false
        }
        return false
    }).subscribe(msg => {
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
        enqueue({ msg, queue, getSetting, slack, manageFolder, uploadFileToSlack })
    })
}

export const q = ({ publish }) => queue((params, cb) => {
    const { slack, manageFolder } = params
    takePhoto({ ...params, msgToSend })
    .then(({
        location,
        folder,
        name
    }) => {
        console.log('location', location)
        console.log('folder', folder)
        console.log('name', name)
        publish({
            channel: 'cloud storage',
            data: {
                uuid: process.argv[2] === 'dev' ? 'dev' : process.env.UUID,
                folder,
                name,
                location
            }
        })
        return { location }
    })
    .then(({
        location
    }) => {
        slack({
            slackMsg: {
                msg: 'Photo taken succesfully',
                timestamp: timestamp()
            }
        })
        return manageFolder({ location, maxFiles: 5 })
    })
    .then(() => {
        return cb()
    })
    .catch(err => {
        slack({
            slackMsg: {
                step: 'takePhoto',
                err
            }
        })
    })
    
})

export const enqueue = ({ queue, ...params}) => new Promise((resolve, reject) => {
    queue.push(params)
    return resolve()
})

export const msgToSend = ({ location, name }) => {
    return {
        meta: {},
        data: {
            location,
            name,
            msg: 'Picture taken successfully'
        }
    }
}

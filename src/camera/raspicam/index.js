// import RaspiCam from 'raspicam'
import { resolve as resolvePath } from 'path'
import { ensureDirSync } from 'fs-extra'
// import { managePhotos } from './manage-photos'
import { doFakePhoto, doRealPhoto } from './photo'
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
    manageFolder
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
}

export const q = ({ publish }) => queue(({ msg, getSetting, slack, manageFolder }, cb) => {
    takePhoto({ getSetting })
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

export const enqueue = ({ msg, queue, getSetting, slack, manageFolder }) => new Promise((resolve, reject) => {
  queue.push({ msg, getSetting, slack, manageFolder })
  return resolve()
})

// TODO: Move this to photo.js and make doTakePhoto a function
export const takePhoto = ({ getSetting }) => new Promise((resolve, reject) => {
    const location = resolvePath(__dirname, 'pictures')
    const folder = 'pictures'
    // console.log('LOCATION', location)
    const name = `${timestamp()}.jpg`
    return ensureDirExists({ location })
    .then(({ location }) => {
      return getSetting('dev') === true
          ? doFakePhoto({ getSetting, location, name, msgToSend })
          : doRealPhoto({ getSetting, location, name, msgToSend })
    })
    .then(({ data: { location, name } }) => resolve({ location, folder, name }))
})

export const ensureDirExists = ({ location }) => new Promise((resolve, reject) => {
    ensureDirSync(location)
    return resolve({ location })
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

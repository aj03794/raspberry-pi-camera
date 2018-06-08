// import RaspiCam from 'raspicam'
import { resolve as resolvePath } from 'path'
import { ensureDirSync } from 'fs-extra'
import { managePhotos } from './manage-photos'
import { doFakePhoto, doRealPhoto } from './photo'
import { queue } from 'async'
import dateTime from 'date-time'

const timestamp = () => {
    return dateTime({ local: true , showMilliseconds: true})
}

export const raspicam = ({
    publish,
    subscribe,
    getSetting,
    slack
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
            console.log('msg', msg)
            console.log('filteredMsg - raspicam', msg)
            enqueue({ msg, queue, getSetting, slack })
        })
    })
}

export const q = ({ publish }) => queue(({ msg, getSetting, slack }, cb) => {
    takePhoto({ date: new Date(), getSetting })
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
        // publish()
        //     .then(({ connect }) => connect())
        //     .then(({ send }) => send({
        //         channel: 'cloud storage',
        //         data: {
        //             folder,
        //             name,
        //             location
        //         }
        //     }))
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
        return managePhotos({ location })
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

export const enqueue = ({ msg, queue, getSetting, slack }) => new Promise((resolve, reject) => {
  console.log('Queueing message - camera: ', msg)
  queue.push({ msg, getSetting, slack })
  return resolve()
})

// TODO: Move this to photo.js and make doTakePhoto a function
export const takePhoto = ({ date, getSetting }) => new Promise((resolve, reject) => {
    const location = resolvePath(__dirname, 'pictures')
    const folder = 'pictures'
    // console.log('LOCATION', location)
    const name = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}::${date.getSeconds()}.jpg`
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

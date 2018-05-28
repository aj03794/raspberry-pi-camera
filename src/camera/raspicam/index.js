// import RaspiCam from 'raspicam'
import { resolve as resolvePath } from 'path'
import { ensureDirSync } from 'fs-extra'
import { managePhotos } from './manage-photos'
import { doFakePhoto, doRealPhoto } from './photo'
import { queue } from 'async'

export const raspicam = ({
    publish,
    subscribe,
    getSetting
}) => {
    const queue = q({ publish })
    subscribe({
        channel: 'motion sensor'
    })
    .then(({ connect }) => connect())
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
            enqueue({ msg, queue, getSetting })
        })
    })
}

export const q = ({ publish }) => queue(({ msg, getSetting }, cb) => {
    takePhoto({ date: new Date(), getSetting })
    .then(({
        location,
        folder,
        name
    }) => {
        publish()
            .then(({ connect }) => connect())
            .then(({ send }) => send({
                channel: 'cloud storage',
                data: {
                    folder,
                    name
                }
            }))
        return { location }
    })
    .then(managePhotos)
    .then(cb)
})

export const enqueue = ({ msg, queue, getSetting }) => new Promise((resolve, reject) => {
  console.log('Queueing message - camera: ', msg)
  queue.push({ msg, getSetting })
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

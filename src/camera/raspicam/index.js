// import RaspiCam from 'raspicam'
import { resolve as resolvePath } from 'path'
import { get } from 'lodash/fp'
import { ensureDirSync } from 'fs-extra'
import { managePhotos } from './manage-photos'
import { doFakePhoto, doRealPhoto } from './photo'
// import { writeFileSync } from 'fs-extra'

export const raspicam = ({ publish, subscribe }) => {
    subscribe({
        channel: 'motion sensor'
    })
    .then(({ connect }) => connect())
    .then(({ allMsgs, filterMsgs }) => {
        filterMsgs(msg => {
            if (msg.data) {
                const { msg: { motion } } = JSON.parse(msg.data[1])
                return motion
            }
            return false
        }).subscribe(msg => {
            console.log('filteredMsg - raspicam', msg)
            takePhoto({ date: new Date() })
            .then(({
                location,
                name
            }) => {
                publish()
                    .then(({ connect }) => connect())
                    .then(({ send }) => send({
                        channel: 'cloud storage',
                        data: {
                            location,
                            name
                        }
                    }))
                return { location }
            })
            .then(managePhotos)
        })
    })
}

export const takePhoto = ({ date }) => new Promise((resolve, reject) => {
    const location = resolvePath(__dirname, 'pictures')
    const name = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}::${date.getSeconds()}.jpg`
    return ensureDirExists({ location })
    .then(({ location }) => {
        return process.argv[2] === 'dev'
            ? doFakePhoto({ location, name, msgToSend })
            : doRealPhoto({ location, name, msgToSend })
    })
    .then(({ data: { location, name } }) => resolve({ location, name }))
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

import { writeFileSync, ensureDir } from 'fs-extra'
import { exec } from 'child_process'
import { resolve as resolvePath } from 'path'
import dateTime from 'date-time'

import {
    takeManualPhoto as takeManualPhotoCreator
} from './manual'

import {
    takeAutomaticPhoto as takeAutomaticPhotoCreator
} from './automatic'

const timestamp = () => dateTime({ local: true })

export const takePhoto = ({
    getSetting,
    slack,
    manageFolder,
    publish
}) => ({
    photoType
}) => () => new Promise((resolve, reject) => {

    const location = resolvePath(__dirname, 'pictures')
    const folder = 'pictures'
    const name = `${timestamp()}.jpg`

    const takeManualPhoto = takeManualPhotoCreator({
        location,
        name,
        getSetting,
        exec,
        writeFileSync
    })

    const takeAutomaticPhoto = takeAutomaticPhotoCreator({
        location,
        name,
        getSetting,
        exec,
        writeFileSync 
    })
    
    ensureDir(location)
    .then(() => {
        if (photoType === 'manual') {
             return takeManualPhoto()
                    .then(({
                        file
                    }) => {
                        console.log('Manual photo taken successfully')
                        return slack({
                            slackMsg: {
                                meta: {
                                    timestamp: timestamp()
                                },
                                msg: 'Photo upload successful - local',
                                operation: 'FILE_UPLOAD',
                                file
                            }
                        })
                    })
        }
        else if (photoType === 'automatic') {
            return takeAutomaticPhoto()
                    .then(() => {
                        const msg = 'Photo taken successfully'
                        console.log('msg', msg)
                        return slack({
                            slackMsg: {
                                msg,
                                timestamp: timestamp()
                            }
                        })
                    })
        }
    })
    .catch(err => {
      console.log('Error', err)
    })
    .then(() => {
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
    .then(() => manageFolder({ location, maxFiles: 5 }))
    .then(resolve)
})
import { writeFile, ensureDir } from 'fs-extra'
import { exec } from 'child_process'
import { resolve as resolvePath } from 'path'
import dateTime from 'date-time'

import {
    doFakeManualPhoto as doFakeManualPhotoCreator,
    doRealManualPhoto as doRealManualPhotoCreator,
    doRealAutomaticPhoto,
    doFakeAutomaticPhoto
} from './automatic'
import { resolveCname } from 'dns';

const timestamp = () => dateTime({ local: true })

export const takePhoto = ({
    getSetting,
    photoType
    // uploadFileToSlack = null
}) => () => new Promise((resolve, reject) => {

    const location = resolvePath(__dirname, 'pictures')
    const folder = 'pictures'
    const name = `${timestamp()}.jpg`

    const doFakeManualPhoto = doFakeManualPhotoCreator({
        location,
        name,
        writeFile
    })
    const doRealManualPhoto = doRealManualPhotoCreator({
        location,
        name,
        getSetting,
        exec
    })
    
    return ensureDirExists({ location })
    ensureDir(location)
    .then(() => {
        if (photoType === 'manual') {
            if (process.argv[2] === 'dev') {
                return doFakeManualPhoto()
                        .then()
            }
             return doRealManualPhoto()
        }
        else if (photoType === 'automatic') {
            if (process.argv[2] === 'dev'){
                return doFakeAutomaticPhoto()
                        .then(() => {
                            return slack({
                                slackMsg: {
                                    msg: 'Fake Photo taken succesfully',
                                    timestamp: timestamp()
                                }
                            })
                        })
               
            }
            return doRealAutomaticPhoto()
        }
    })
    .catch(err => {
      console.log('ensureDir error', err)
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
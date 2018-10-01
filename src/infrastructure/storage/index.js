// Should just be given the file and it should be written to the specified location

import { getSetting } from '../settings'
import { homedir } from 'os'
import { resolve as resolvePath } from 'path'
import { ensureDirectoryExists, writeFileSync, manageFolder } from '../utils/fs'
import { createPhotoPath } from '../utils/photo-name'

import { execute as savePhotoLocally } from './local'
import { execute as uploadPhotoToSlack } from './slack'

export const savePhoto = ({
    photoAsBuffer
}) => {

    const {
        local: {
            use,
            config: {
                name,
                maxNumber
            }
        }
    } = getSetting('storage')

    const photoDir = resolvePath(homedir(), name)

    ensureDirectoryExists(photoDir)
    const locationToSavePhoto = createPhotoPath({ photoDir })
    return savePhotoLocally({ writeFileSync, locationToSavePhoto, photoAsBuffer })
            .then(() => {
                return manageFolder({
                    location: photoDir,
                    maxFiles: maxNumber
                })
            })
            .then(() => {
                return {
                    savedPhotoLocation: locationToSavePhoto
                }
            })

}

export const uploadPhoto = ({
    savedPhotoLocation
}) => {
    const {
        slack: {
            type,
            channels
        },
    } = getSetting('storage')

    console.log({
        channels,
        savedPhotoLocation
    })

    return uploadPhotoToSlack({ savedPhotoLocation, channels })

}
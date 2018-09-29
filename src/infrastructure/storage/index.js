// Should just be given the file and it should be written to the specified location

import { getSetting } from '../settings'
import { homedir } from 'os'
import { resolve as resolvePath } from 'path'
import { ensureDirectoryExists, writeFileSync, manageFolder } from '../utils/fs'
import { createPhotoPath } from '../utils/photo-name'

import { execute } from './local'

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

    console.log({
        name,
        maxNumber
    })

    const photoDir = resolvePath(homedir(), name)

    console.log({
        photoDir
    })

    ensureDirectoryExists(photoDir)
    const locationToSavePhoto = createPhotoPath({ photoDir })
    console.log('locationToSavePhoto', locationToSavePhoto)
    return execute({ writeFileSync, locationToSavePhoto, photoAsBuffer })
            .then(() => {
                manageFolder({
                    location: photoDir,
                    maxFiles: maxNumber
                })
                // return locationToSavePhoto
            })
            .then(() => {
                return locationToSavePhoto
            })

}
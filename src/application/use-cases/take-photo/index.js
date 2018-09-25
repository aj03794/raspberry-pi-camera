// TODO need to take out the switch between mock and dev
// That switch should occur at the infrastructure layer

import { homedir } from 'os'

export const takePhoto = ({
    msg,
    getSetting,
    ...args
}) => {

    const { resolvePath, createPhotoPath } = args
    const camera = getSetting('camera')
    const photoDir = resolvePath(homedir(), getSetting('photoFolder').name)

    // Name is a little confusing
    // This is the fully qualified path (dir + file name) where photo will be placed
    const photo = createPhotoPath({ photoDir })
    console.log('photo', photo)
   
    return import(`./${msg.from}/index.js`)
        .then(({
            [camera.type]: doTakePhoto
        }) => {
            return doTakePhoto({ ...args, photo, photoDir })
        })
        .catch(err => {
            return Promise.reject(err)
        })

}


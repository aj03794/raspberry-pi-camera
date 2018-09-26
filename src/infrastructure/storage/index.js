// Should just be given the file and it should be written to the specified location

import { getSetting } from '../settings'
import { homedir } from 'os'
import { resolve as resolvePath } from 'path'

export const savePhoto = ({
    photoBuffer
}) => {

    const storage = getSetting('storage')

    const photoDir = resolvePath(homedir(), getSetting('photoFolder').name)

    // Name is a little confusing
    // This is the fully qualified path (dir + file name) where photo will be placed
    const photo = createPhotoPath({ photoDir })
    console.log('photo', photo)


}
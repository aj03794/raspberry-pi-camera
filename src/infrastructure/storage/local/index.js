// Maybe this should also construct the file name

import { writeFileSync } from '../../utils/fs'

export const savePhotoLocally = ({
    photoBuffer,
    location,
    writeFileSync
}) => new Promise((resolve, reject) => {

        writeFileSync(photoBuffer, location, {
            encoding: 'UTF-8'
        })

        resolve()

})
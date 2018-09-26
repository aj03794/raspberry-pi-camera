import { readFileSync } from 'fs'
import { resolve as resolvePath } from 'path'

export const execute = ({
    config,
    exec
}) => {


    const photo = resolvePath(__dirname, 'large-photo.jpg')

    console.log({
        photo
    })

    const photoBuffer = readFileSync(photo)
    console.log({
        photoBuffer
    })
    // return Promise.resolve({ photo })
    return Promise.resolve({
        photoBuffer
    })
}
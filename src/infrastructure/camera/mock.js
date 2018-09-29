import { readFileSync } from 'fs'
import { resolve as resolvePath } from 'path'

export const execute = ({
    config,
    execSync
}) => {
    const photo = resolvePath(__dirname, 'large-photo.jpg')
    const photoAsBuffer = readFileSync(photo)
    console.log({
        photoAsBuffer
    })
    return Promise.resolve({
        photoAsBuffer
    })
}
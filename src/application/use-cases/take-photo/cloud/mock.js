import { cwd } from 'process'

// ensure folder for pictures exists
// take picture
// save picture
// ensure folder is not at max number of pictures

export const mock = ({
    ensureDirectoryExists,
    resolvePath
}) => {

    const photoDir = resolvePath(cwd(), 'photo-dir')
    console.log('photoDir', photoDir)

    return ensureDirectoryExists(photoDir)
            .then(() => {
                console.log('Created!')
                return
            })
            .then(() => {
                
            })
            .catch(err => {
                console.error('ASDASDADSSD')
            })
}
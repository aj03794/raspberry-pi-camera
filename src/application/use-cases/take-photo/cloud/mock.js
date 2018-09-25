import { cwd } from 'process'
// ensure folder for pictures exists
// take picture
// save picture
// ensure folder is not at max number of pictures

export const mock = ({
    ensureDirectoryExists,
    photo,
    photoDir,
    raspicam
}) => {

    return ensureDirectoryExists(photoDir)
            .then(() => {
                raspicam({ photo })
            })
            .catch(err => {
                console.error({
                    err
                })
            })
}
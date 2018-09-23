export const takePhoto = ({
    msg,
    getSetting,
    ...args
}) => {

    console.log('ARGS', args)
    const camera = getSetting('camera')
    return import(`./${msg.from}/index.js`)
        .then(({
            [camera.type]: doTakePhoto
        }) => {
            return doTakePhoto(args)
        })
        .catch(err => {
            return Promise.reject(err)
        })

}


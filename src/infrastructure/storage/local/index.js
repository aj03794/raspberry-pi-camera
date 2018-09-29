// Maybe this should also construct the file name

export const execute = ({
    photoAsBuffer,
    locationToSavePhoto,
    writeFileSync
}) => new Promise((resolve, reject) => {

    console.log({
        photoAsBufferInSavePhoto: photoAsBuffer,
        locationToSavePhoto
    })

    writeFileSync(locationToSavePhoto, photoAsBuffer, {
        encoding: 'UTF-8'
    })

    resolve()

})
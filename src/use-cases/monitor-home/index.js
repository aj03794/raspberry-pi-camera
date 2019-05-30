export const createMonitorHome = ({
    takePhoto,
    savePhotoLocally,
    uploadPhotoToSlack
}) => {

    const execute = () => takePhoto()
    .then(savePhotoLocally)
    .then(uploadPhotoToSlack)
    .catch(err => {
        console.error({
            msg: `Monitor home usecase failed`,
            err
        })
    })

    return {
        execute
    }

}
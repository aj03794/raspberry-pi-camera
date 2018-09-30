export const execute = ({
    raspicam,
    savePhoto,
    uploadPhoto
}) => {

    return raspicam()
            .then(savePhoto)
            .then(uploadPhoto)
            .catch(err => {
                console.error({
                    msg: `take-photo cloud use case failed`,
                    err
                })
            })

}
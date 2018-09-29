// take picture
// save picture
// Send notification to slack

export const execute = ({
    raspicam,
    savePhoto,
    uploadPhoto
}) => {

    return raspicam()
            .then(savePhoto)
            .then(result => {
                console.log({
                    result
                })
                return result
            })
            .then(uploadPhoto)
            .then(() => console.log('FINISHED'))
            .catch(err => {
                console.error({
                    msg: `take-photo cloud use case failed`,
                    err
                })
            })

}
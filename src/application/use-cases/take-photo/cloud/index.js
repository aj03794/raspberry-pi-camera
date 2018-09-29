// take picture
// save picture
// Send notification to slack

export const execute = ({
    raspicam,
    savePhoto,
    uploadPhotoToSlack
}) => {

    console.log({
        savePhoto,
        uploadPhotoToSlack: uploadPhotoToSlack.toString()
    })

    return raspicam()
            .then(savePhoto)
            .then(uploadPhotoToSlack)
            .then(() => {
                console.log('hello')
            })

}
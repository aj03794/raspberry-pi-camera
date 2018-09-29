import { createReadStream } from 'fs'
import slack from 'slack'

export const slackClient = (opts = {
    slackChannel: 'general'
}) => {

    console.log('PROCESS.ENV', process.env.SLACK_OAUTH_TOKEN)

    const uploadFileToSlack = ({
        token,
        channels,
        file
    }) => {

        console.log('ASDASDADSADAD')

        return slack.files.upload({ token, channels, file })
        .then(() => {
            console.log('Slack upload file success')
            // resolve({
            //     method: 'uploadFile',
            //     data: {
            //         success: true,
            //         err: null
            //     }
            // })
            return
        })
        .catch(err => {
            console.log('Slack upload file failure', err)
            // reject({
            //     method: 'uploadFile',
            //     data: {
            //         success: false,
            //         err
            //     }
            // })
            reject()
        })
    }

    const uploadPhotoToSlack = (photoLocation) => {

        const readStream = createReadStream(photoLocation)
        const token = process.env.SLACK_OAUTH_TOKEN

        return uploadFileToSlack({
            token: process.env.SLACK_OAUTH_TOKEN,
            channels: opts.slackChannel,
            file: readStream
        })
    }


    return {
        uploadPhotoToSlack
    }

}




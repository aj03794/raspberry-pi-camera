import { createReadStream } from 'fs'

import slack from 'slack'

export const execute = ({
    savedPhotoLocation,
    channels
}) => {

    return slack.files.upload({
        token: process.env.SLACK_OAUTH_TOKEN,
        channels,
        file: createReadStream(savedPhotoLocation)
    })
    .then(() => {
        console.log('Slack upload file success')
        return
    })
    .catch(err => {
        console.log('Slack upload file failure', err)
        return err
    })

}
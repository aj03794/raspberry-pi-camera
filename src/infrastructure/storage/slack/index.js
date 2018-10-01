import { createReadStream } from 'fs'

import { WebClient } from '@slack/client'

export const execute = ({
    savedPhotoLocation,
    channels
}) => {

    const slack = new WebClient(process.env.SLACK_OAUTH_TOKEN)

    return slack.files.upload({
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
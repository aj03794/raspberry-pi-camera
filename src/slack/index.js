import { address } from 'ip'

export const slack = ({
    publish,
    channel = 'slack',
}) => ({
    slackMsg,
    slackChannel='general'
}) => new Promise((resolve, reject) => {
    publish({
        channel,
        data: {
            meta: {
                ipAddress: address()
            },
            slackData: {
                channel: slackChannel,
                msg: slackMsg
            }
        }
    })
    resolve()
})
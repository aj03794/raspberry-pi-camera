export const slack = ({
    publish,
    channel = 'general',
}) => ({
    slackMsg,
    slackChannel='camera'
}) => new Promise((resolve, reject) => {
    publish()
    .then(({ connect }) => connect())
    .then(({ send }) => {

        send({
            channel,
            data: {
                slackData: {
                    channel: slackChannel,
                    msg: slackMsg
                }
            }
        })
    })
    resolve()
})
export const slack = ({
    publish,
    channel = 'slack',
}) => ({
    slackMsg,
    slackChannel='general'
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
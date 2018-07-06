export const createSubscriptions = ({
    subscribe,
    filterGcpMsgs
}) => new Promise((resolve, reject) => {

    subscribe({
        channel: 'motion sensor'
    })
    .then(({ allMsgs, filterMsgs }) => {
        const redisSubscription = filterMsgs(msg => {
            if (msg.data && JSON.parse(msg.data[1]).motion) return true
            return false
        })
        const gcpSubscription = filterGcpMsgs(msg => {
            if (
                msg
                && msg.data
                && msg.data.message
                && msg.data.message.data
                && msg.data.message.data.body
                && msg.data.message.data.body.command
            ) {
                if (msg.data.message.data.body.command === '/take-photo'){
                    return true
                }
                return false
            }
            return false
        })
        return resolve({
            redisSubscription,
            gcpSubscription
        })
    })
})
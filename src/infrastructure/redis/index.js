

export const createRedisClient = ({
    newPubSubMsg
}) => {

    console.log('creating redis client')

    newPubSubMsg({
        action: 'take_manual_photo'
    })

}
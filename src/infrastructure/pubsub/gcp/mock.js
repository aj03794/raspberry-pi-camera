export const mock = ({
    newPubSubMsg
}) => {

    setTimeout(() => {
        newPubSubMsg({
            command: 'take-photo',
            from: 'cloud'
        })
    }, 300)

}
import { takeManualPhoto, takeAutomaticPhoto } from '../application/use'

export const takePhotoController = ({
    pubSubMsgSubscription,
    pubSubMsgFilter
}) => {

    takePhotoSubject.subscribe(msg => {
        console.log('MSG received', msg)
    })

}
import PubSub from '@google-cloud/pubsub'
import { resolve as resolvePath } from 'path'
import { homedir } from 'os'

export const real = ({
  getSetting,
  newPubSubMsg,
}) => {

    const {
        googleApplicationCredentials: gcpCreds,
        baseSubscription
    } = getSetting('pubsub').gcp

    const subscriptionName = `${baseSubscription}-${process.env.UUID}`
    console.log({
        subscriptionName
    })
    const keyFilename = resolvePath(homedir(), 'gcp-creds', gcpCreds)
    const pubsub = new PubSub({ keyFilename })
    const subscription = pubsub.subscription(subscriptionName)

    const messageHandler = message => {

    newPubSubMsg({
        command: 'take-photo',
        from: 'cloud'   
    })
    message.ack()
  }

  subscription.on(`message`, messageHandler)

  return 

}
import PubSub from '@google-cloud/pubsub'
import { resolve as resolvePath } from 'path'
import { homedir } from 'os'

export const real = ({
  getSetting,
  newPubSubMsg,
}) => {

  const gcpCreds = getSetting('pubsub').gcp.googleApplicationCredentials
//   const subscriptionName = `projects/smart-home-monitoring-system/subscriptions/take-photo-${uuid}`
    const subscriptionName = `projects/smart-home-monitoring-system/subscriptions/take-photo-000000005234dd73`
  const keyFilename = resolvePath(homedir(), 'gcp-creds', gcpCreds)
	const pubsub = new PubSub({
		keyFilename
  })
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
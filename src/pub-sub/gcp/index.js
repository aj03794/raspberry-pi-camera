import PubSub from '@google-cloud/pubsub'
import { createSubject } from 'create-subject-with-filter'
import { resolve as resolvePath } from 'path'
import { cwd } from 'process'
import { homedir } from 'os'

export const gcp = ({
  getSetting,
  uuid
}) => new Promise((resolve, reject) => {
  console.log('GCP')
  const {
    subscribe: allGcpMsgs,
    filter: filterGcpMsgs,
    next
  } = createSubject()

  const gcpCreds = getSetting('googleApplicationCredentials')
  const subscriptionName = `projects/smart-home-monitoring-system/subscriptions/take-photo-${uuid}`
  const keyFilename = resolvePath(homedir(), 'gcp-creds', gcpCreds)
  console.log('keyFilename', keyFilename)
	const pubsub = new PubSub({
		keyFilename
  })
  const subscription = pubsub.subscription(subscriptionName)

  const messageHandler = message => {
    console.log('message.data', JSON.parse(message.data.toString('utf-8')))
    next({
      meta: {
        timestamp: 'placeholder'
      },
      data: {
        message: JSON.parse(message.data.toString('utf-8'))
      }
    })
    message.ack()
  }

  subscription.on(`message`, messageHandler)

  return resolve({
    allGcpMsgs,
    filterGcpMsgs
  })

})
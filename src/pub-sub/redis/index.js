import { createClient } from 'redis'

const providerConfigParams = {
	getPortParams: []
}

export const redis = ({
	channel,
	providerConfig: {
		pubsub: {
			getPort
		}
	}
}) => {
	// console.log('Initiating redis connection')
	const client = createClient(getPort(providerConfigParams))

	const {
		subscribe: connection,
		filter: filterConnection,
		next: sendConnection
	} = new Subject()

	const {
		subscribe: allMessages,
		filter: filterMessages,
		next: sendMessage
	} = new Subject()

	client.on('connect', () => sendConnection())

	client.subscribe(channel)

	client.on('error', err => {
		console.log('Connection to redis: failure', err)
	})
    //
    // //
    // //
	// const motionSensorMonitor = () => client.on('message', (channel, message) => {
	// 		console.log("sub channel " + channel + ": " + message);
	// 		return {
	// 			channel,
	// 			message
	// 		}
	// 	})

	// return { client, motionSensorMonitor }

	return {
		connection,
		filterConnection,
		sendConnection,
		allMessages,
		filterMessages,
		sendMessage
	}
}

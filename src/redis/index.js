import { createClient } from 'redis'

export const startRedis = () => {
	console.log('Initiating redis connection')
	const client = createClient(6379)

	client.on('connect', () => {
		console.log('Connection to redis: success')
	})

	client.subscribe('motion sensor')

	client.on('error', err => {
		console.log('Connection to redis: failure', err)
	})

    //
    //
	// const motionSensorMonitor = () => client.on('message', (channel, message) => {
	// 		console.log("sub channel " + channel + ": " + message);
	// 		return {
	// 			channel,
	// 			message
	// 		}
	// 	})

	// return { client, motionSensorMonitor }
	return { client }

}

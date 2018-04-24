// Basically have listeners, publishers, and actions
// Need some sort of naming convention

import { createClient } from 'redis'
// import { Subject } from 'rxjs'
import { createSubject } from 'create-subject-with-filter'

const providerConfigParams = {
	getPortParams: []
}

// {
// 	channel,
// 	providerConfig: {
// 		pubsub: {
// 			getPort
// 		}
// 	}
// }

const clients = {} // inject this to manage scope

const getClient = ({ type }) => ({
	connect: () => new Promise(resolve => {
		if (!clients[type]) {
			setClient({
				type,
				client: createClient(6379)
			})
		}
		return resolve(clients[type])
	})
})

const setClient = ({ type, client }) =>  clients[type] = client

export const redis = () => ({
	publish: () => new Promise((resolve, reject) => {
		const c = getClient({ type: '__publisher' })
		return resolve({
			connect: () => c.connect().then(client => ({
				send: ({
					channel,
					data
				}) => new Promise(resolve => {
					client.publish(channel, JSON.stringify(data))
					return resolve({
						meta: {
							type: 'published',
							timestamp: new Date().getTime()
						}
					})
				})
			}))
		})
	}),
	subscribe: ({ channel }) => new Promise(resolve => {
		const c = getClient({ type: channel })
		return resolve({
			connect: () => c.connect()
				.then(client => {
					const {
						subscribe: allMsgs,
						filter: filterMsgs,
						next
					} = createSubject()
					client.subscribe(channel)
					client.on('connect', (...args) => {
						console.log('Connected to Redis')
						// ...args looks like [ 'motion sensor', '{"msg":{"motion":false}}' ]
						client.on('message', (...args) => {
							// console.log('args', args)
							next({
								meta: {
									type: 'message',
									timestamp: new Date().getTime()
								},
								data: args //sanitize anything provider specific (redis)
							})
						})
						client.on('error', (...args) => next({
							meta: {
								type: 'error',
								timestamp: new Date().getTime(),
								data: args //sanitize anything provider specific (redis)
							}
						}))
						// console.log('asdfda connection')
						next({
							meta: {
								type: 'connect',
								timestamp: new Date().getTime(),
								data: args //sanitize anything provider specific (redis)
							}
						})
					})
					return {
						allMsgs,
						filterMsgs
					}
				})
		})
	})
})

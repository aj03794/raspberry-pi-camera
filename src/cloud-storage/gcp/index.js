export const gcpCloudStorage = ({ publish, subscribe }) => {

	console.log('-------------------------')
	console.log('gcpCloudStorage')

	subscribe({
		channel: 'cloud storage'
	})
	.then(({ connect }) => connect())
	.then(({ allMsgs, filterMsgs }) => {
		allMsgs(msg => console.log('gcp all msgs', msg))
		// console.log('cloudStorage', cloudStorage)
		// const filteredMsgs = filterMsgs(msg => {
		// 	return JSON.parse(msg)
		// }).subscribe(msg => console.log('filteredMsg', msg))
	})
}

export const uploadPhoto = photoLocation => new Promise((resolve, reject) => {
	console.log('Upload successful')
	resolve({
		meta: {},
		data: {
			cloudProvider: 'gcp',
			upload: 'successful'
		}
	})
})

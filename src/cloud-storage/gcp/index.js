export const sendToGcpStorage = ({ photoLocation }) => new Promise((resolve, reject) => {
	console.log('Sending to cloud storage', photoLocation)
	return resolve({
		upload: 'success'
	})
})

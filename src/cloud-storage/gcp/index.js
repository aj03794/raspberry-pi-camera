export const gcpCloudStorage = ({ publish, subscribe }) => {
	return {
		uploadPhoto: photoLocation => new Promise((resolve, reject) => {
			console.log('Upload successful')
			resolve()
		})
	}
}

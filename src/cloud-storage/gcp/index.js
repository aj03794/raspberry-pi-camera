export const gcpCloudStorage = () => {
	return {
		uploadPhoto: photoLocation => new Promise((resolve, reject) => {
			console.log('Upload successful')
			resolve()
		})
	}
}

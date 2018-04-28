import { Storage } from './storage'
import { checkIfBucketExists, createBucket } from './bucket-operations'
import { uploadFile } from './file-operations'

export const localStorage = ({ publish, subscribe }) => {
	console.log('-------------------------')
	console.log('localCloudStorage')

	subscribe({
		channel: 'cloud storage'
	})
	.then(({ connect }) => connect())
	.then(({ allMsgs, filterMsgs }) => {
		filterMsgs(msg => {
			return msg.data
		}).subscribe(msg => {
			doPhotoUpload({
				msg
			}).then(() => {
				return
			})
		})
	})
}

export const doPhotoUpload = ({ msg }) => new Promise((resolve, reject) => {
	console.log('-------------------------')
	console.log('doPhotoUpload - local')
	const bucketName = process.env.BUCKET_NAME
	const { location, name: file } = JSON.parse(msg.data[1])
	// const storage = new Storage({
	// 	projectId: process.env.GCP_PROJECT_ID
	// })
	const storage = new Storage({
		projectId: process.env.PROJECT_ID
	})
	console.log('storage', storage)
	checkIfBucketExists({ storage, bucketName })
	.then(bucket => {
		if (!bucket) {
			console.log('Bucket does not exist')
			return createBucket({ storage, bucketName })
			.catch(err => reject(err))
		}
		console.log('Bucket exists')
		return
	})
	.then(() => uploadFile({ storage, bucketName, file, location }))
	.then(() => {
		console.log('Upload successful')
		resolve({
			meta: {},
			data: {
				cloudProvider: 'local',
				upload: 'successful'
			}
		})
	})
})

import { get } from 'lodash/fp'
import { flow } from 'lodash'
import Storage from '@google-cloud/storage'
import { createGcpBucket,  checkIfBucketExists } from './bucket-operations'
import { uploadFile } from './file-operations'

export const gcpCloudStorage = ({ publish, subscribe }) => {
	console.log('-------------------------')
	console.log('gcpCloudStorage')

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
	console.log('doPhotoUpload')
	const bucketName = process.env.FOLDER_NAME
	const { location, name: file } = JSON.parse(msg.data[1])
	const storage = new Storage({
		projectId: process.env.GCP_PROJECT_ID
	})
	checkIfBucketExists({ storage, bucketName })
	.then(bucket => {
		if (!bucket) {
			console.log('Bucket does not exist')
			return createGcpBucket({ storage, bucketName })
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
				cloudProvider: 'gcp',
				upload: 'successful'
			}
		})
	})
})

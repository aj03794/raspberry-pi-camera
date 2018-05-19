import { Storage } from './storage'
import { checkIfBucketExists, createBucket } from './bucket-operations'
import { uploadFile } from './file-operations'
import { queue } from 'async'
import { resolve as resolvePath } from 'path'

export const localStorage = ({
	publish,
	subscribe,
	getSetting
}) => {
	console.log('-------------------------')
	console.log('localCloudStorage')
	const queue = q({ publish })
	subscribe({
		channel: 'cloud storage'
	})
	.then(({ connect }) => connect())
	.catch(e => console.log('asdfasfsafsf', e))
	.then(({ allMsgs, filterMsgs }) => {
		filterMsgs(msg => {
			return msg.data
		}).subscribe(msg => {
			return enqueue({ msg, queue })
			// doPhotoUpload({
			// 	msg
			// }).then(() => {
			// 	return
			// })
		})
	})
}

export const doPhotoUpload = ({ msg }) => new Promise((resolve, reject) => {
	console.log('-------------------------')
	console.log('doPhotoUpload - local')
	// const bucketName = process.env.BUCKET_NAME
	const bucketName = getSetting('bucketName')
	console.log('MSG', msg)
	const { folder, name: file } = JSON.parse(msg.data[1])
	console.log('folder', folder)
	// console.log
	const location = resolvePath('../../../', 'dist', 'camera', 'raspicam', folder)
	// const newLocation = resolvePath(getSetting('projectDir'), 'dist', 'camera', 'raspicam', folder)

	console.log('location', location)
	const storage = new Storage({
		projectId: process.env.PROJECT_ID
	})
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

export const q = ({ publish }) => queue((msg, cb) => {
    doPhotoUpload({ msg })
	.then(cb)
})

export const enqueue = ({ msg, queue }) => new Promise((resolve, reject) => {
    console.log('Queueing message: ', msg)
	queue.push(msg)
    return resolve()
})

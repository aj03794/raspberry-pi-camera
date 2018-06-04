import { Storage } from './storage'
import { checkIfBucketExists, createBucket } from './bucket-operations'
import { uploadFile } from './file-operations'
import { queue } from 'async'
import { resolve as resolvePath } from 'path'
import { cwd } from 'process'

export const localStorage = ({
	publish,
	subscribe,
	getSetting,
	manageFolder
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
			return enqueue({ msg, queue, getSetting, manageFolder })
		})
	})
}

export const doPhotoUpload = ({ msg, getSetting, manageFolder }) => new Promise((resolve, reject) => {
	console.log('-------------------------')
	console.log('doPhotoUpload - local')
	// const bucketName = process.env.BUCKET_NAME
	const bucketName = getSetting('bucketName')
	console.log('MSG', msg)
	const { folder, name: file, location } = JSON.parse(msg.data[1])
	console.log('folder', folder)
	console.log('asdfasf', resolvePath(cwd(), 'buckets', bucketName))
	console.log('===========>', location)
	const storage = new Storage({
		// projectId: process.env.PROJECT_ID
		projectId: getSetting('projectId')
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
	.then(() => manageFolder({
		location:  resolvePath(cwd(), 'buckets', bucketName),
		maxFiles: 20
	}))
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

export const q = ({ publish }) => queue(({ msg, getSetting }, cb) => {
  doPhotoUpload({ msg, getSetting })
	.then(cb)
})

export const enqueue = ({ msg, queue, getSetting, manageFolder }) => new Promise((resolve, reject) => {
    console.log('Queueing message: ', msg)
	queue.push({ msg, getSetting, manageFolder })
    return resolve()
})

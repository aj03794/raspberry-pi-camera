import { writeFile, mkdir as makeDir, ensureDir, readdir as readDir, copy } from 'fs-extra'
import { resolve as resolvePath, basename } from 'path'


export function Storage({ projectId }) {

	this.bucket = bucketName => {
		this.bucketName = bucketName
		return this
	}

	this.upload = (fileName) => new Promise((resolve, reject) => {
		const src = resolvePath(fileName)
		const destFileName = basename(src)
		const destination = resolvePath(__dirname, 'buckets', this.bucketName, destFileName)
		console.log('destFileName', destFileName)
		return copy(src, destination, err => {
			if (err) {
				console.log('Err uploading file - local', err)
				return reject(err)
			}
			console.log('Success!')
			return resolve()
		})
	})

	this.getBuckets = () => new Promise((resolve, reject) => {
		return ensureDir(resolvePath(__dirname, 'buckets'))
			.then(() => {
				return readDir(resolvePath(__dirname, 'buckets'), (err, files) => {
					if (err) {
						console.log('Err getBuckets - local', err)
						return reject({
							method: 'getBuckets',
							data: {
								err
							}
						})
					}
					return resolve(files)
				})
			})
			.catch(err => console.log('getBuckets - err', err))
	})

	this.createBucket = (bucketName) => new Promise((resolve, reject) => {
		return makeDir(resolvePath(__dirname, 'buckets', bucketName), err => {
			if (err) {
				console.log('Error creating bucket - local', err)
				return reject({
					method: 'createBucket',
					data: {
						err
					}
				})
			}
			return resolve()
		})
	})

}

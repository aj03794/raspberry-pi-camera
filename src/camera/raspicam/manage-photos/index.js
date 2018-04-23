import { readdir as readDir, existsSync, unlink } from 'fs'
import { resolve as resolvePath } from 'path'

export const managePhotos = ({ location }) => new Promise((resolve, reject) => {
	if (existsSync(location)) {
		return readFolder({ location })
		.then(deleteFiles)
		.then(resolve)
	}
	console.log('Folder does not exist')
	return resolve()
})

export const deleteFiles = ({ files, location }) => new Promise((resolve, reject) => {
	if (files.length > 5) {
		console.log('Deleting oldest photo')
		const filePath = resolvePath(location, files[0])
		return unlink(filePath, err => {
			if (err) {
				console.log('Error - deleteFiles', err)
				return reject(err)
			}
			return resolve()
		})
	}
	return resolve()
})

export const readFolder = ({ location }) => new Promise((resolve, reject) => {
	return readDir(location, (err, files) => {
		if (err) {
			console.log('Err reading dir', err)
		}
		console.log('files', files)
		return resolve({ files, location })
	})
})

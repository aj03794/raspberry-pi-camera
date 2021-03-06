import { readdir as readDir, existsSync, remove, ensureDir, writeFileSync } from 'fs-extra'
import { resolve as resolvePath } from 'path'

const ensureDirectoryExists = ensureDir

const manageFolder = ({ location, maxFiles }) => new Promise((resolve, reject) => {
	if (existsSync(location)) {
		return readFolder({ location, maxFiles })
		.then(deleteFiles)
		.then(resolve)
		.catch(e => reject(err))
	}
	console.log('Folder does not exist')
	return resolve()
})

const deleteFiles = ({ files, location, maxFiles }) => new Promise((resolve, reject) => {
	if (files.length > maxFiles) {
		console.log('Deleting oldest photo', files[0])
		const filePath = resolvePath(location, files[0])
		return remove(filePath, err => {
			if (err) {
				console.log('Error - deleteFiles', err)
				return reject({msg: 'Error - deleteFiles', err})
			}
			return resolve()
		})
	}
	return resolve()
})

const readFolder = ({ location, maxFiles }) => new Promise((resolve, reject) => {
	return readDir(location, (err, files) => {
		if (err) {
			console.log('Err reading dir', err)
			reject({ msg: 'Error - reading folder', err })
		}
		return resolve({ files, location, maxFiles })
	})
})

export {
	manageFolder,
	writeFileSync,
	ensureDirectoryExists
}
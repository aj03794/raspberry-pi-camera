import { writeFile, mkdir as makeDir, ensureDir, readdir as readDir, copyFile } from 'fs-extra'
import { resolve as resolvePath } from 'path'


export const Storage = ({
	projectId
}) => {
	const folder = folderName => {
		// console.log('')
		console.log('folderName', folderName)
		return folderName
	}

	const upload = ({ fileName, folderName }) => new Promise((resolve, reject) => {
		console.log('====>', resolvePath(fileName))
		return copyFile(resolvePath(fileName), resolvePath(__dirname, folderName), err => {
			if (err) {
				console.log('Err uploading file - local', err)
				reject(err)
			}
			return resolve()
		})
	})

	const getFolders = () => new Promise((resolve, reject) => {
		return ensureDir(resolvePath(__dirname, 'folders'))
			.then(() => {
				return readDir(resolvePath(__dirname, 'folders'), (err, files) => {
					if (err) {
						console.log('Err getFolders - local', err)
						return reject({
							method: 'getFolders',
							data: {
								err
							}
						})
					}
					return resolve(files)
				})
			})
			.catch(err => console.log('getFolders - err', err))
	})

	const createFolder = (folderName) => new Promise((resolve, reject) => {
		return makeDir(resolvePath(__dirname, 'folders', folderName), err => {
			if (err) {
				console.log('Error creating bucket - local', err)
				return reject({
					method: 'createFolder',
					data: {
						err
					}
				})
			}
			return resolve()
		})
	})


	return {
		folder,
		upload,
		getFolders,
		createFolder
	}

}

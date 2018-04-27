import { Storage } from './storage'
import { checkIfFolderExists, createLocalFolder } from './folder-operations'
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
	const folderName = process.env.FOLDER_NAME
	const { location, name: file } = JSON.parse(msg.data[1])
	// const storage = new Storage({
	// 	projectId: process.env.GCP_PROJECT_ID
	// })
	const storage = Storage({
		projectId: process.env.PROJECT_ID
	})
	checkIfFolderExists({ storage, folderName })
	.then(folder => {
		if (!folder) {
			console.log('Folder does not exist')
			return createLocalFolder({ storage, folderName })
			.catch(err => reject(err))
		}
		console.log('Folder exists')
		return
	})
	.then(() => uploadFile({ storage, folderName, file, location }))
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

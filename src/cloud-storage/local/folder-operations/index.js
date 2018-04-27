export const createLocalFolder = ({ storage, folderName }) => new Promise((resolve, reject) => {
	return storage
		.createFolder(folderName)
		.then(() => {
			console.log(`Folder ${folderName} created.`);
			resolve()
		})
		.catch(err => {
			console.error('ERROR:', err);
		})
})

export const checkIfFolderExists = ({ storage, folderName }) => new Promise((resolve, reject) => {
	return storage
		.getFolders()
		.then(folders => {
			console.log('folders', folders)
			const folder = folders.filter(folder => {
				return folder === folderName
			})
			.map(folder => {
				return {
					meta: {},
					data: {
						name: folder.name
					}
				}
			})[0]
			return resolve(folder ? folder : null)
		})
		.catch(err => console.log('err retrieving local folders', err))
})

import { resolve as resolvePath } from 'path'

export const uploadFile = ({ storage, folderName, file, location }) => new Promise((resolve, reject) => {
	const fileName = resolvePath(`${location}/${file}`)
	// console.log('fileName')
	// console.log('asdfasf', storage.folder(folderName).upload())
	return storage
    // .folder(folderName)
    .upload({ fileName, folderName })
    .then(() => {
      console.log(`${file} uploaded to ${folderName}.`);
	  resolve({
		  msg: `${file} uploaded to ${folderName}`
	  })
    })
    .catch(err => {
      console.error('ERROR: ', err)
	  reject({
		  msg: 'Uploading error',
		  err
	  })
    })
	// setTimeout(() => {
	// 	resolve({
	// 		msg: 'Uploading successful'
	// 	})
	// }, 500)
})

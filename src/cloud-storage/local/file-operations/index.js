import { resolve as resolvePath } from 'path'

export const uploadFile = ({ storage, bucketName, file, location }) => new Promise((resolve, reject) => {
	const fileName = resolvePath(`${location}/${file}`)
	// console.log('fileName')
	// console.log('asdfasf', storage.folder(folderName).upload())
	return storage
    // .folder(folderName)
    .upload({ fileName, bucketName })
    .then(() => {
      console.log(`${file} uploaded to ${bucketName}.`);
	  resolve({
		  msg: `${file} uploaded to ${bucketName}`
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

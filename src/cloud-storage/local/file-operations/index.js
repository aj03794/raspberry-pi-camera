import { resolve as resolvePath } from 'path'

export const uploadFile = ({ storage, bucketName, file, location }) => new Promise((resolve, reject) => {
	console.log('storage', storage)
	const fileName = resolvePath(`${location}/${file}`)
	return storage
	.bucket(bucketName)
    .upload(fileName)
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
})

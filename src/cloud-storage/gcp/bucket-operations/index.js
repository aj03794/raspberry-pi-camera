export const createGcpBucket = ({ storage, bucketName }) => new Promise((resolve, reject) => {
	return storage
  .createBucket(bucketName)
  .then(() => {
    console.log(`Bucket ${bucketName} created.`);
	resolve()
  })
  .catch(err => {
    console.error('ERROR:', err);
  })
  // setTimeout(() => {
	//   resolve({
	// 	  msg: 'Bucket created'
	//   })
  // }, 500)
})

export const checkIfBucketExists = ({ storage, bucketName }) => new Promise((resolve, reject) => {
	return storage
		.getBuckets()
		.then(buckets => {
			const bucket = buckets[0].filter(bucket => {
				return bucket.metadata.id === bucketName
			})
			.map(bucket => {
				return {
					meta: {},
					data: {
						name: bucket.metadata.id
					}
				}
			})[0]
			return resolve(bucket ? bucket : null)
		})
		.catch(err => console.log('err retrieving GCP buckets', err))
})

import { ensureDirSync } from 'fs-extra'

const fakePhoto = ({
    location,
    name,
	msgToSend
}) => new Promise((resolve, reject) => {
	writeFileSync(`${location}/${name}`)
	return resolve(
	        msgToSend({ location, name })
	    )
})

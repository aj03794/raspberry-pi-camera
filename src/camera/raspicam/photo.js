import { writeFileSync } from 'fs-extra'
import { exec } from 'child_process'

const getPreviewMode = () => process.env.CAMERA_PREVIEW === true ? `-p` : `-n`
const getCameraTimeout = () => {
    process.env.CAMERA_TIMEOUT ? `-p ${process.env.CAMERA_TIMEOUT}` : `-p 500`
}

export const doFakePhoto = ({
    location,
    name,
	msgToSend
}) => new Promise((resolve, reject) => {
    const previewMode = getPreviewMode()
    const cameraTimeout = getCameraTimeout()
    console.log('previewMode', previewMode)
    console.log('camearTimeout', camearTimeouts)
	writeFileSync(`${location}/${name}`)
	const msg = msgToSend({ location, name })
	return resolve(msg)
})

export const doRealPhoto = ({
    location,
    name,
	msgToSend
}) => new Promise((resolve, reject) => {
    const previewMode = getPreviewMode()
    const cameraTimeout = getCameraTimeout()
    console.log('previewMode', previewMode)
    console.log('camearTimeout', camearTimeouts)
    return exec(`raspistill ${previewMode} ${cameraTimeout} -q 75 -md 3 -o ${name}`,
        {
            cwd: location
        },
        (err, stdout, stderr) => {
            if (err) {
                console.log('Something went wrong', err)
                return reject({ message: 'Picture could not be taken' })
            }
            console.log('Raspistill: ', stdout)
			const msg = msgToSend({ location, name })
            return resolve(msg)
        }
    )
})

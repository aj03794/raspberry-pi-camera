import { writeFileSync } from 'fs-extra'
import { exec } from 'child_process'

const getPreviewMode = () => process.env.CAMERA_PREVIEW === true ? `-p` : `-n`
const getCameraTimeout = () => {
    return process.env.CAMERA_TIMEOUT ? `-t ${process.env.CAMERA_TIMEOUT}` : `-t 500`
}

export const doFakePhoto = ({
    location,
    name,
	msgToSend
}) => new Promise((resolve, reject) => {
    const previewMode = getPreviewMode()
    const cameraTimeout = getCameraTimeout()
    console.log('previewMode', previewMode)
    console.log('cameraTimeout', cameraTimeout)
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
    console.log('cameraTimeout', cameraTimeout)
    return exec(`raspistill -md 3 ${cameraTimeout} ${previewMode} -o ${name}`,
    // return exec(`raspistill --nopreview -o ${name}`,
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

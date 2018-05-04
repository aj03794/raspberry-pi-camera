import { writeFileSync } from 'fs-extra'
import { exec } from 'child_process'

const doPreviewMode = () => process.env.CAMERA_PREVIEW === true ? `-p` : `-n`

export const doFakePhoto = ({
    location,
    name,
	msgToSend
}) => new Promise((resolve, reject) => {
	writeFileSync(`${location}/${name}`)
	const msg = msgToSend({ location, name })
	return resolve(msg)
})

export const doRealPhoto = ({
    location,
    name,
	msgToSend
}) => new Promise((resolve, reject) => {
    const previewMode = doPreviewMode()
    console.log('previewMode', previeMode)
    return exec(`raspistill ${previewMode} -q 75 -md 3 -o ${name}`,
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

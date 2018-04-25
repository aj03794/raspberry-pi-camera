import { writeFileSync } from 'fs-extra'
import { exec } from 'child_process'

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
    return exec(`raspistill -q 75 --mode 3 --output ${name}`,
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

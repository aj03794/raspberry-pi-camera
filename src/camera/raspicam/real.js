import { exec } from 'child_process'

const realPhoto = ({
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
            console.log(stdout)
            resolve(
                msgToSend({ location, name })
            )
        }
    )
})

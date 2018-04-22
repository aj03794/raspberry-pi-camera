// import RaspiCam from 'raspicam'
import { resolve as resolvePath } from 'path'
import { ensureDirSync } from 'fs-extra'
import { exec } from 'child_process'
import { get } from 'lodash/fp'
import { writeFileSync } from 'fs'

export const raspicam = ({ publish, subscribe }) => {
    console.log('-------------------------')
    console.log('raspicam')

    subscribe({
        channel: 'motion sensor'
    })
    .then(({ connect }) => connect())
    .then(({ allMsgs, filterMsgs }) => {
        filterMsgs(msg => {
            if (msg.data) {
                const { msg: { motion } } = JSON.parse(msg.data[1])
                return motion
            }
            return false
        }).subscribe(msg => {
            console.log('filteredMsg - raspicam', msg)
            takePhoto()
            .then(({
                data: { location, name }
            }) => {
                publish()
                    .then(({ connect }) => connect())
                    .then(({ send }) => send({
                        channel: 'cloud storage',
                        data: {
                            location,
                            name
                        }
                    }))
            })
        })
    })
}

const takePhoto = () => new Promise((resolve, reject) => {
    // console.log('Taking photo')
    const location = resolvePath(__dirname, 'pictures')
    ensureDirSync(location)
    const name = `${Date.now()}.jpg`
    writeFileSync(`${location}/${name}`)
    // exec(`raspistill -q 75 --mode 3 --output ${name}`,
    //     {
    //         cwd: photoLocation
    //     },
    //     (err, stdout, stderr) => {
    //         if (err) {
    //             console.log('Something went wrong', err)
    //             return reject({ message: 'Something went wrong uploading' })
    //         }
    //         console.log(stdout)
    //         return resolve({ msg: 'Picture taken successfully' })
    //     }
    // )
    resolve({
        meta: {},
        data: {
            location,
            name
        }
    })
})

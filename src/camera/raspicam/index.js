// import RaspiCam from 'raspicam'
import { resolve as resolvePath } from 'path'
import { ensureDirSync } from 'fs-extra'
import { exec } from 'child_process'
import { get } from 'lodash/fp'
import { writeFileSync } from 'fs'
import { managePhotos } from './manage-photos'

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
                // publish()
                //     .then(({ connect }) => connect())
                //     .then(({ send }) => send({
                //         channel: 'cloud storage',
                //         data: {
                //             location,
                //             name
                //         }
                //     }))
                return { location }
            })
            .then(managePhotos)
        })
    })
}

const takePhoto = () => new Promise((resolve, reject) => {
    // console.log('Taking photo')
    const location = resolvePath(__dirname, 'pictures')
    ensureDirSync(location)
    // const name = `${Date.now()}.jpg`
    const date = new Date()
    const name = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}::${date.getSeconds()}.jpg`
    writeFileSync(`${location}/${name}`)

    // exec(`raspistill -q 75 --mode 3 --output ${name}`,
    //     {
    //         cwd: location
    //     },
    //     (err, stdout, stderr) => {
    //         if (err) {
    //             console.log('Something went wrong', err)
    //             return reject({ message: 'Picture could not be taken' })
    //         }
    //         console.log(stdout)
            // return resolve({ msg: 'Picture taken successfully' })
            // resolve({
            //     meta: {},
            //     data: {
            //         location,
            //         name,
            //         msg: 'Picture taken successfully'
            //     }
            // })
        // }
    // )
    setTimeout(() => {
        resolve({
            meta: {},
            data: {
                location,
                name,
                msg: 'Picture taken successfully'
            }
        })
    }, 1000)
})

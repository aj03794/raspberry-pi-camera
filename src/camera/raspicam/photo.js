import { writeFileSync } from 'fs-extra'
import { exec } from 'child_process'

const getPreviewMode = ({ getSetting }) => getSetting('cameraPreview') === true ? `-p` : `-n`
const getCameraTimeout = ({ getSetting }) => {
    return getSetting('cameraTimeout') ? `-t ${getSetting('cameraTimeout')}` : `-t 500`
}

export const doFakePhoto = ({
    location,
    name,
    msgToSend,
    getSetting
}) => new Promise((resolve, reject) => {
    console.log('Taking fake photo')
    const previewMode = getPreviewMode({ getSetting })
    const cameraTimeout = getCameraTimeout({ getSetting })
    writeFileSync(`${location}/${name}`)
    const msg = msgToSend({ location, name })
    return resolve(msg)
})

export const doRealPhoto = ({
    location,
    name,
    msgToSend,
    getSetting
}) => new Promise((resolve, reject) => {
    console.log('Taking real photo')
    const previewMode = getPreviewMode({ getSetting })
    const cameraTimeout = getCameraTimeout({ getSetting })
    return exec(`raspistill -md 3 ${cameraTimeout} ${previewMode} -o ${name}`,
        {
            cwd: location
        },
        (err, stdout, stderr) => {
            if (err) {
                return reject({ msg: 'Picture could not be taken', err })
            }
            console.log('Raspistill: ', stdout)
            const msg = msgToSend({ location, name })
            return resolve(msg)
        }
    )
})

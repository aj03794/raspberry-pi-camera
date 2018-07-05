import { writeFileSync, ensureDirSync } from 'fs-extra'
import { exec } from 'child_process'
import { resolve as resolvePath } from 'path'
import dateTime from 'date-time'

const timestamp = () => {
    return dateTime({ local: true })
}

const getPreviewMode = ({ getSetting }) => getSetting('cameraPreview') === true ? `-p` : `-n`
const getCameraTimeout = ({ getSetting }) => {
    return getSetting('cameraTimeout') ? `-t ${getSetting('cameraTimeout')}` : `-t 500`
}

export const takePhoto = ({
    getSetting,
    uploadFileToSlack = null,
    msgToSend
}) => new Promise((resolve, reject) => {
    const location = resolvePath(__dirname, 'pictures')
    const folder = 'pictures'
    const name = `${timestamp()}.jpg`
    return ensureDirExists({ location })
    .then(({ location }) => {
      return process.argv[2] === 'dev'
          ? doFakePhoto({ getSetting, location, name, msgToSend })
          : doRealPhoto({ getSetting, location, name, msgToSend })
    })
    .then(({ data: { location, name } }) => {
        if (uploadFileToSlack) {
            const file = resolvePath(location, name)
            uploadFileToSlack({ file })
        }
        return resolve({ location, folder, name })
    })
})

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
    console.log('previewMode', previewMode)
    console.log('cameraTimeout', cameraTimeout)
    return exec(`raspistill -md 3 ${cameraTimeout} ${previewMode} -o "${name}"`,
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

export const ensureDirExists = ({ location }) => new Promise((resolve, reject) => {
    ensureDirSync(location)
    return resolve({ location })
})

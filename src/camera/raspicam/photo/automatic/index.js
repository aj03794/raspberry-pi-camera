
const getPreviewMode = ({ getSetting }) => getSetting('cameraPreview') === true ? `-p` : `-n`
const getCameraTimeout = ({ getSetting }) => {
    return getSetting('cameraTimeout') ? `-t ${getSetting('cameraTimeout')}` : `-t 500`
}

export const doFakeAutomaticPhoto = ({
    location,
    name,
    writeFile
}) => () => new Promise((resolve, reject) => {
    console.log('Taking fake photo')
    writeFile(`${location}/${name}`)
    .then(resolve)
    .catch(err => console.log('doFakePhoto failed', err))
})

export const doRealAutomaticPhoto = ({
    location,
    name,
    getSetting,
    exec
}) => () => new Promise((resolve, reject) => {
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
            return resolve(msg)
        }
    )
})
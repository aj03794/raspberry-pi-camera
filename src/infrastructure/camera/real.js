export const takeAutomaticPhoto = ({
    location,
    name,
    getSetting,
    exec,
    writeFileSync
}) => () => new Promise((resolve, reject) => {
    const file = `${location}/${name}`

    const camera = getSetting('camera')

    const previewMode = camera.config.preview === true ? `p` : `-n`
    const cameraTimeout = camera.config.timeout || `500`
    console.log('previewMode', previewMode)
    console.log('cameraTimeout', cameraTimeout)
    console.log('Taking real automatic photo')

    return exec(`raspistill -md 3 -t ${cameraTimeout} ${previewMode} -o "${name}"`,
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
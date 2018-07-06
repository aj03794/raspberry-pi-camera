export const takeAutomaticPhoto = ({
    location,
    name,
    getSetting,
    exec,
    writeFileSync
}) => () => new Promise((resolve, reject) => {
    const file = `${location}/${name}`
    const previewMode = getSetting('cameraPreview') === true ? `p` : `-n`
    const cameraTimeout = getSetting('cameraTimeout') || `500`
    console.log('previewMode', previewMode)
    console.log('cameraTimeout', cameraTimeout)
    if (process.argv[2] === 'dev') {
        console.log('Taking fake automatic photo')
        writeFileSync(file)
        return resolve({ file })
    }
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
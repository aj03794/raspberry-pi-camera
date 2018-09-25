export const real = ({
    photo,
    exec,
    config: {
        preview,
        timeout
    }
}) => new Promise((resolve, reject) => {

    const previewMode = preview === true ? `p` : `-n`
    const cameraTimeout = timeout || `500`
    console.log('previewMode', previewMode)
    console.log('cameraTimeout', cameraTimeout)
    console.log('Taking real automatic photo')

    return exec(`raspistill -md 3 -t ${cameraTimeout} ${previewMode} -o "${photo}"`,
        // {
        //     cwd: location
        // },
        (err, stdout, stderr) => {
            if (err) {
                return reject({ msg: 'Picture could not be taken', err })
            }
            console.log('Raspistill: ', stdout)
            return resolve()
        }
    )

})
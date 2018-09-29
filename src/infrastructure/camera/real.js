export const execute = ({
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
    console.log('Taking real ')

    // --output,    -o        Output filename <filename>
    // Specifies the output filename. If not specified, no file is saved.
    // If the filename is '-', then all output is sent to stdout.
    return exec(`raspistill -md 3 -t ${cameraTimeout} ${previewMode} -o`,
        (err, stdout, stderr) => {
            if (err) {
                return reject({ msg: 'Picture could not be taken', err })
            }
            if (stderr) {
                console.log({
                    stderr
                })
            }
            console.log('Raspistill: ', stdout)
            return resolve({
                photoAsBuffer: stdout
            })
        }
    )

})
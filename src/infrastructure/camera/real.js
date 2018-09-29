export const execute = ({
    photo,
    execSync,
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

    try {
        const photoAsBuffer = execSync(`raspistill -md 3 -t ${cameraTimeout} ${previewMode} -o`)
        console.log({
            photoAsBuffer
        })
        return resolve({
            photoAsBuffer
        })
    }
    catch (e) {
        console.log({
            msg: `Error taking photo`,
            err: e
        })
        reject(e)
    }
    

})
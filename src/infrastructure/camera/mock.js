export const takeRaspicamPhoto = ({
    location,
    name,
    getSetting,
    exec,
    writeFileSync
}) => () => {

    const file = `${location}/${name}`
    const camera = getSetting('camera')
    const previewMode = camera.config.preview === true ? `p` : `-n`
    const cameraTimeout = camera.config.timeout || `500`
    
    console.log('previewMode', previewMode)
    console.log('cameraTimeout', cameraTimeout)
    console.log('Taking fake photo')

    writeFileSync(file)

    return Promise.resolve({ file })
}
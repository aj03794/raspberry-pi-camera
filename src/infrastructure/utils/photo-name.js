import dateTime from 'date-time'

const timestamp = () => {
    return dateTime({ local: true })
}

export const createPhotoPath = ({
    photoDir
}) => {
    const photoName = `${timestamp()}.jpg`
    return `${photoDir}/${photoName}`
}
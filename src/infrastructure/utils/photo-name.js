import dateTime from 'date-time'

const timestamp = () => {
    return dateTime({ local: true, showMilliseconds: true })
}

export const createPhotoPath = ({
    photoDir
}) => {
    const photoName = `${timestamp()}.jpg`
    return `${photoDir}/${photoName}`
}
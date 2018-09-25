export const mock = ({
    writeFileSync,
    photo
}) => {
    console.log('Taking fake photo', photo)
    writeFileSync(photo)
    return Promise.resolve({ photo })
}
export const takePhoto = ({
    msg,
    ...args
}) => {
   
    return import(`./${msg.from}/index.js`)
        .then(({
            execute
        }) => {
            return execute({ ...args })
        })
        .catch(err => {
            return Promise.reject(err)
        })

}


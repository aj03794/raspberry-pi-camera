import { exec } from "child_process";

// TODO need to take out the switch between mock and dev
// That switch should occur at the infrastructure layer

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


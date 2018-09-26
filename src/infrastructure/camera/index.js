import { writeFileSync } from '../utils/fs'
import { exec } from 'child_process'
import { getSetting } from '../settings'

export const raspicam = () => {

    const {
        type,
        config
    } = getSetting('camera')

    console.log({
        type
    })

    return import(`./${type}`)
        .then(({
            execute
        }) => {
            return execute({
                config,
                exec
            })
        })

}

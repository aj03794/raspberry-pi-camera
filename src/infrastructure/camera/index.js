import { writeFileSync } from '../utils/fs'
import { exec } from 'child_process'
import { getSetting } from '../settings'

export const raspicam = ({
    photo
}) => {

    const {
        type,
        config
    } = getSetting('camera')

    console.log({
        type
    })

    return import(`./${type}`)
        .then(({
            [type]: raspistill
        }) => {
            console.log('--------')
            console.log('raspistill', raspistill)
            raspistill({
                writeFileSync,
                photo,
                config,
                exec
            })
        })

}

// import RaspiCam from 'raspicam'
import { resolve as resolvePath } from 'path'
import { exec } from 'child_process'

export const raspicam = () => {


    return {
        takePhoto: () => new Promise((resolve, reject) => {
            console.log('Taking photo')
            exec(`raspistill -q 75 --mode 3 --output cam.jpg`,
                {
                    cwd: resolvePath(__dirname)
                },
                (err, stdout, stderr) => {
                    if (err) {
                        console.log('Something went wrong', err)
                        return reject({ message: 'Something went wrong uploading' })
                    }
                    console.log(stdout)
                    return resolve({ msg: 'Picture taken successfully' })
                }
            )
        })
    }
}

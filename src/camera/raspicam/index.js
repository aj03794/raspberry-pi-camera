// import RaspiCam from 'raspicam'
import { resolve as resolvePath } from 'path'
import { exec } from 'child_process'

// //
// // //to take a snapshot, start a timelapse or video recording
// // camera.start()
// //
// // //to stop a timelapse or video recording
// // camera.stop()
// //
// // //listen for the "start" event triggered when the start method has been successfully initiated
// // camera.on("start", () => {
// // 	//do stuff
// // });
// //
// // //listen for the "read" event triggered when each new photo/video is saved
// // camera.on("read", (err, timestamp, filename) => {
// // 	//do stuff
// // });
// //
// // //listen for the "stop" event triggered when the stop method was called
// // camera.on("stop", () => {
// // 	//do stuff
// // });
// //
// // //listen for the process to exit when the timeout has been reached
// // camera.on("exit", () => {
// // 	console.log('')
// // });

export const raspicam = () => {


return {
    takePhoto: () => new Promise((resolve, reject) => {
        exec(`raspistill -o cam.jpg`,
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
    	)}
    })
}

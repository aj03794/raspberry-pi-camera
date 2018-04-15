// import RaspiCam from 'raspicam'
import { resolve as resolvePath } from 'path'


//
// //to take a snapshot, start a timelapse or video recording
// camera.start()
//
// //to stop a timelapse or video recording
// camera.stop()
//
// //listen for the "start" event triggered when the start method has been successfully initiated
// camera.on("start", () => {
// 	//do stuff
// });
//
// //listen for the "read" event triggered when each new photo/video is saved
// camera.on("read", (err, timestamp, filename) => {
// 	//do stuff
// });
//
// //listen for the "stop" event triggered when the stop method was called
// camera.on("stop", () => {
// 	//do stuff
// });
//
// //listen for the process to exit when the timeout has been reached
// camera.on("exit", () => {
// 	console.log('')
// });

export const raspicam = () => {

	// const camera = true
	console.log(resolvePath(__dirname, 'pictures'))

	const photoLocation = resolvePath()
	const opts = {
		mode: 'photo',
		// Will need to make a folder that houses the pictures
		output: resolvePath(__dirname, 'pictures', `${Date.now()}.jpg`)
	}

	const camera = new RaspiCam({ opts });

	return {
		takePhoto: () => new Promise((resolve, reject) => {
			console.log('Taking photo')
			// camera.start()
			// camera.on("stop", () => {
			// 	resolve({
			// 		photoLocation: resolvePath(__dirname, 'pictures')
			// 	})
			// })
			return resolve({
				photoLocation: resolvePath(__dirname, 'pictures')
			})
		})
	}
}

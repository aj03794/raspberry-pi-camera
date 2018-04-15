// import RaspiCam from 'raspicam'
// import { resolve as resolvePath } from 'path'


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

// export const raspicam = () => {

// 	// const camera = true
// 	// console.log(resolvePath(__dirname, 'pictures'))

// 	// const photoLocation = resolvePath()
// 	const opts = {
// 		mode: 'photo',
// 		// Will need to make a folder that houses the pictures
// 		output: './image.jpg'
// 	}

// 	const camera = new RaspiCam(opts)
// 	console.log('camera', camera)
//     camera.start( )
//     camera.stop( )
// 	return {
// 		takePhoto: () => new Promise((resolve, reject) => {
// 			console.log('Taking photo')
// 			// camera.start( );
//             // camera.stop( );
// 			// camera.on("stop", () => {
// 			// 	console.log('Finished uploading')
// 			// 	resolve({
// 			// 		photoLocation: resolvePath(__dirname, 'pictures')
// 			// 	})
// 			// })
//             return resolve()
// 			// return resolve({
// 			// 	photoLocation: resolvePath(__dirname, 'pictures')
// 			// })
// 		})
// 	}
// }


var RaspiCam = require("raspicam");

var camera = new RaspiCam({
    mode: 'photo',
    output: './image.jpg'
});

//to take a snapshot, start a timelapse or video recording
camera.start( );

//to stop a timelapse or video recording

//listen for the "start" event triggered when the start method has been successfully initiated
camera.on("start", function(){
	//do stuff
    console.log('starting')
});

//listen for the "read" event triggered when each new photo/video is saved
camera.on("read", function(err, timestamp, filename){ 
	//do stuff
    console.log('filename', filename)
});

//listen for the "stop" event triggered when the stop method was called
camera.on("stop", function(){
	//do stuff
});

//listen for the process to exit when the timeout has been reached
camera.on("exit", function(){
	//do stuff
});

camera.stop( );

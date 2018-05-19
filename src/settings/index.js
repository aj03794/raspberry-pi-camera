import { join as joinPath } from 'path'
import fs from 'fs'

// Does require cache things by default
// let settings = require('./settings')
export const getSetting = (settingToRetrieve) => {
  let setting
  try {
    console.log('SETTING FROM FILE', settingToRetrieve)
    console.log('FILE', joinPath(__dirname, 'settings.json'))
    setting = JSON.parse(fs.readFileSync(joinPath(__dirname, 'settings.json')))[settingToRetrieve]
    // return settings[setting]
  } catch (e) {
		console.log('Error getSetting', e)
		// return {
		// 	method: 'getSetting',
		// 	data: {
		// 		err
		// 	}
		// }
    // setting = getDefaultSetting(settingToRetrieve)
    // return settings[setting]
  }
  console.log(setting)
  return setting
}

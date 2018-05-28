import { resolve as resolvePath } from 'path'
import fs from 'fs'

// Does require cache things by default
// let settings = require('./settings')
export const getSetting = (settingToRetrieve) => {
  let setting
  try {
    console.log('SETTING FROM FILE', settingToRetrieve)
    setting = JSON.parse(fs.readFileSync(resolvePath(__dirname, 'settings.json')))[settingToRetrieve]
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

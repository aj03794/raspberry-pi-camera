import { resolve as resolvePath } from 'path'
import fs from 'fs'

export const getSetting = (settingToRetrieve) => {
  let setting
  try {
    setting = JSON.parse(fs.readFileSync(resolvePath(__dirname, 'settings.json')))[settingToRetrieve]
  } catch (e) {
		console.log('Error getSetting', e)
  }
  return setting
}

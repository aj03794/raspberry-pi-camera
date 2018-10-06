import { resolve as resolvePath } from 'path'
import fs from 'fs'

export const getSetting = (settingToRetrieve) => {
  let setting
  let fileName = `settings.json`
  // TODO make this more dynamic so that if we add in new settings files
  // this code does not need to be modified again
  if (process.argv[2] === 'dev') {
    fileName = `settings.dev.json`
  }
  if (process.argv[2] === 'test') {
    fileName = `settings.test.json`
  }
  console.log('fileName', fs.existsSync(resolvePath(__dirname, fileName)))
  try {
    console.log('ASDASDADSD')
    console.log('dirname', __dirname)
    console.log('')
    setting = JSON.parse(fs.readFileSync(resolvePath(__dirname, fileName)))[settingToRetrieve]
  } catch (e) {
		console.log('Error getSetting', e)
  }
  return setting
}
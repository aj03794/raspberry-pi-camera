import { createMonitorHome } from './monitor-home'

export const monitorHome = createMonitorHome({
    takePhoto,
    savePhotoLocally,
    uploadPhotoToSlack
})
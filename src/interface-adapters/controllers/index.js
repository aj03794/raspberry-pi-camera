export const createController = ({
    takePhotoUseCase
}) => {

    const takePhoto = (msg) => takePhotoUseCase.execute()

    return {
        takePhoto
    }

}
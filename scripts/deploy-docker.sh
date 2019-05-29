# image name
IMAGE=raspberry-pi-camera
# ensure we're up to date
# git pull
# bump version
# version=$(npm version patch -m "v%s [ci skip]")
# version=$(echo $version | cut -c 2-)
echo "version: $version"
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
docker tag $DOCKER_USERNAME/$IMAGE:latest $DOCKER_USERNAME/$IMAGE:$version
# # push it
docker push $DOCKER_USERNAME/$IMAGE:latest
docker push $DOCKER_USERNAME/$IMAGE:$version
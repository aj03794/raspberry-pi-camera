# image name
IMAGE=raspberry-pi-camera
# ensure we're up to date
# git pull
# bump version
version=$(npm version patch)
version=$(echo $version | cut -c 2-)
echo "version: $version"
docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$version
# # push it
docker push $USERNAME/$IMAGE:latest
docker push $USERNAME/$IMAGE:$version
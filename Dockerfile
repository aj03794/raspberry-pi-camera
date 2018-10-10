## Specifies the base image we're extending
FROM aj03794/rpi-raspbian-with-node

ARG github_token
RUN echo github_token
ENV GITHUB_OAUTH_TOKEN=$github_token

RUN git config --global user.name "aj03794"
RUN git config --global user.email "adamjohnston151@yahoo.com"

## Create base directory
RUN mkdir /raspberry-pi-camera

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /raspberry-pi-camera

## Copy entire source directory minus contents specified in .dockerignore file
COPY . .
RUN npm install --unsafe-perm
## Specifies the base image we're extending
FROM resin/rpi-raspbian

ARG github_token
RUN echo github_token
ENV GITHUB_OAUTH_TOKEN=$github_token

RUN sudo apt-get update -y
RUN sudo apt-get install wget -y
RUN sudo apt-get install zip -y
RUN sudo apt-get install git -y

RUN git config --global user.name "aj03794"
RUN git config --global user.email "adamjohnston151@yahoo.com"

RUN wget -q https://nodejs.org/dist/v10.11.0/node-v10.11.0-linux-armv6l.tar.gz
RUN tar -xzf node-v10.11.0-linux-armv6l.tar.gz
RUN cp -R  node-v10.11.0-linux-armv6l/* /usr/local/
RUN rm -rf node-v10.11.0-linux-armv6l.tar.gz
RUN rm -rf node-v10.11.0-linux-armv6l

## Create base directory
RUN mkdir /raspberry-pi-camera

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /raspberry-pi-camera

## Copy entire source directory minus contents specified in .dockerignore file
COPY . .
RUN npm install
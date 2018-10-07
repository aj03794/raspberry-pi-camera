## Specifies the base image we're extending
FROM resin/rpi-raspbian

RUN sudo apt-get update -y
RUN sudo apt-get install wget -y

RUN wget https://nodejs.org/dist/v10.11.0/node-v10.11.0-linux-armv6l.tar.gz
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
# RUN npm run test
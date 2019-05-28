## Specifies images we need in our docker image
FROM balenalib/rpi-raspbian
FROM node:10.15.3

RUN apt-get update
RUN apt-get upgrade
RUN apt-get install git

ARG github_token
RUN echo github_token
# # ENV GITHUB_OAUTH_TOKEN=$github_token

ARG DOCKER_USERNAME
RUN echo DOCKER_USERNAME
ARG DOCKER_PASSWORD

## Create base directory
RUN mkdir /raspberry-pi-camera

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /raspberry-pi-camera

## Copy entire source directory minus contents specified in .dockerignore file
COPY . .
RUN npm install
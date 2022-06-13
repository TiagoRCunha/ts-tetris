#!/bin/bash

echo "-------------------------------Docker Container Services-------------------------------"

echo "Services: Start Docker (start), Stop Docker (stop) and Show Docker Status (status)"

echo "Enter the service you want"
read service

function start() {
    echo "Building container"
    docker build -t tetris .
    echo "Starting container"
    docker run -d --rm -p 7171:7171 --name tetris tetris
}

function stop() {
    docker stop tetris
    echo "docker stopped"
}

function status() {
    echo "docker status:"
    docker container inspect tetris | grep Status
    echo "docker container info:"
    docker ps -a -f name=tetris
}

case $service in
    start)
        start;;
    stop)
        stop;;
    status)
        status;;
    *)
        echo "This service does not exist"
esac
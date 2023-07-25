#!/bin/bash

# 기존 도커 삭제
if [ "$(docker ps -q -f name=boot_app)" ]; then
    # 컨테이너가 실행 중이면 중지(stop)하고 삭제(remove)
    docker stop boot_app
    docker rm boot_app
fi

if [ "$(docker ps -q -f name=nlp_app)" ]; then
    # 컨테이너가 실행 중이면 중지(stop)하고 삭제(remove)
    docker stop nlp_app
    docker rm nlp_app
fi

# 도커 기동
docker build -t boot_app .
docker build -t nlp_app ./nlp-check

docker-compose --compatibility up -d
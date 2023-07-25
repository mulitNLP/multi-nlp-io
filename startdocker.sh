#!/bin/bash

# 도커 기동
docker build -t boot_app .
docker build -t nlp_app ./nlp-check

docker-compose --compatibility up -d
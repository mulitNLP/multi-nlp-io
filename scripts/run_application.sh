#!/bin/bash

RESOURCES_PATH="/home/ec2-user/multi-mlpgame/src/main/resources"

# cd basic-websocket-gameserver
cd /home/ec2-user/multi-mlpgame/

npm install > /home/ec2-user/nohup.out 2>&1
npm run build > /home/ec2-user/nohup.out 2>&1

# copy
cp -f "${RESOURCES_PATH}/static/dist/index.html" "${RESOURCES_PATH}/templates/"

TARGET_PORT=8080

process_id=$(lsof -ti:$TARGET_PORT)

if [ ! -z "$process_id" ]; then
  kill $process_id
fi

nohup java -jar -Dserver.port=${TARGET_PORT} /home/ec2-user/multi-nlpgame/build/libs/* > /home/ec2-user/nohup.out 2>&1 &
echo "> Now new WAS runs at ${TARGET_PORT}."
exit 0
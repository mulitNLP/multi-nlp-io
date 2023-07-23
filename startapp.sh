npm install

RESOURCES_PATH="./src/main/resources"

# cd basic-websocket-gameserver
# mv_dir=$(dirname "$0")
# cd ${mv_dir}

npm run build

# copy
cp -f  "${RESOURCES_PATH}/static/dist/index.html" "${RESOURCES_PATH}/templates/"

process_id=$(lsof -ti:8080)

if [ ! -z "$process_id" ]; then
  kill $process_id
fi

./gradlew clean build
java -jar build/libs/multi-nlp-io-0.0.1-SNAPSHOT.jar

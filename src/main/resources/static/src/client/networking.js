// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#4-client-networking
// import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';
import constants from '../shared/constants';
import renderCheckbox from './htmlRender/checkbox';

// import redis from 'redis';

// websocket connection
const roomId = 1;
const devaddr = 'localhost';
const prodaddr = '3.35.214.100';
const addr = process.env.ADDRR;
// const websocket = new WebSocket(`ws://13.124.67.137:8080/room/${roomId}`);
const websocket = new WebSocket(`ws://${addr}:8080/room/${roomId}`);

const wsconnectedPromise = new Promise(resolve => {
  // to websocket, 이벤트 핸들러 변경
  // io 와는 다르게 WebSocket 을 사용할 때는 이벤트 핸들러를 직접 등록해야 한다.
  websocket.onopen = (() => {
    console.log('Connected to web socket game server!');
    resolve();
  });
});

export let playerId;
export let playerName;

// connect 이후 콜백 등록
export const connect = onGameOver => (
  wsconnectedPromise.then(() => {
    // Register callbacks
    // socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    // 이벤트 핸들러 등록 (open, close, error 제외한 일반적인 메시지에 대한 이벤트 핸들러)
    // 
    websocket.onmessage = event => {
      const message = JSON.parse(event.data);

      if (message.type === 'sentergame') {
        playerId = message.player.objectId;
        playerName = message.player.name;
        console.log(`enter game!! ${playerId}`);

      } else if (message.type === 'sspawn') {
        console.log('spawn!!');

      } else if (message.type === 'supdate') { // update (움직임 패킷)
        // 플레이어 update
        // me 와 others 구분
        const meItem = message.update.others.find((item) => { return item['id'] === playerId });
        const idx = message.update.others.indexOf(meItem);

        if (idx > -1) message.update.others.splice(idx, 1);

        const update = {
          t: message.update.t,
          me: meItem,
          others: message.update.others,
          bullets: message.update.bullets,
          meteors: message.update.meteors,
          leaderboard: message.update.leaderboard,
        };
        // console.log(update);
        processGameUpdate(update);

      } else if (message.type === 'smove') { // move update (움직임 패킷)
        // processGameUpdate(message.update);
        // 일단은 무시 (나중에 bullet, meteor 처리 시에 사용될 무브)
      } else if (message.type === 'schat') {
        // console.log('schat');
      } else if (message.type === 'sskill') {
        // console.log('sskill');
      } else if (message.type === 'sdie') {
        console.log('sdie');
        if (message.objectId === playerId)
          onGameOver(message.attackerId);
      }
    };

    websocket.onclose = () => {
      console.log('Disconnected from server.');
      document.getElementById('disconnect-modal').classList.remove('hidden');
      document.getElementById('reconnect-button').onclick = () => {
        window.location.reload();
      };
    };
  })
);

// send data << 어차피 이거 아님
export const play = name => {
  const message = {
    type: 'centergame',
    protocol: 'C_EnterGame',
    username: name,
  };
  websocket.send(JSON.stringify(message));
};

export const updateInputKeyBoardDown = throttle(20, (key) => {
  let dir;
  if (key === 87) {
    dir = 'North';
  } else if (key === 83) {
    dir = 'South';
  } else if (key === 68) {
    dir = 'East';
  } else if (key === 65) {
    dir = 'West';
  }

  const message = {
    type: 'cmove',
    protocol: 'C_Move',
    posInfo: {
      pos: {},
      dirs: [],
      state: null,
    },
    dir: dir,
    updown: true,
  };

  websocket.send(JSON.stringify(message));
});

export const updateInputKeyBoardUp = (key) => {
  let dir;
  if (key === 87) {
    dir = 'North';
  } else if (key === 83) {
    dir = 'South';
  } else if (key === 68) {
    dir = 'East';
  } else if (key === 65) {
    dir = 'West';
  }

  const message = {
    type: 'cmove',
    protocol: 'C_Move',
    posInfo: {
      pos: {},
      dirs: [],
      state: null,
    },
    dir: dir,
    updown: false,
  };

  websocket.send(JSON.stringify(message));
};

const bullletInstance = {
  skillId: 1,
  name: 'bullet',
  damage: constants.BULLET_DAMAGE,
  skillType: 'BULLET',
  projectile: {
    speed: constants.BULLET_SPEED,
    range: constants.BULLET_RADIUS,
  }
};

const shieldInstance = {
  skillId: 2,
  name: 'shield',
  damage: 0,
  skillType: 'SHIELD',
};

export const handleChatAttack = (targetID, content, positive, percent) => {
  // if (content === 's') {
  //   positive = false;
  // }

  // const targetType = (targetId >> 24) & 0x7f;
  // var result;
  // if (targetType === 1) { // 1: player
  //   if (positive == true)
  //     result = true;
  //   else
  //     result = false;
  // } else if (targetType === 2) { // 2: meteor
  //   if (positive === true)
  //     result = true;
  //   else
  //     return;
  // }


  // console.log(`${targetId} ${result}`)

  sendSkill(targetID, positive);

}

function sendSkill(targetId, positive) {

  if (positive === null) {
    return;
  }

  let info = positive === true ? bullletInstance : shieldInstance;
  const skillPacket = {
    type: 'cskill',
    protocol: 'C_Skill',
    target: targetId,
    info: info
  }
  // skill
  websocket.send(JSON.stringify(skillPacket));
}

let analysisResult = { result: null, percentage: null };

export const performSentimentAnalysis = (playerID, targetID, inputValue) => {
  console.log('perform sentiment analysis');
  const url = `http://${addr}:5050/sentiment-analysis`; // Adjust the URL to match your Python server
  const dataString = playerID + '|' + targetID + '|' + inputValue;
  // Send the input value to the Python server using fetch API
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Connection': 'keep-alive'
    },
    body: dataString
  })
    .then(response => response.json())
    .then(data => {
      const result = data.result;
      handleChatAttack(targetID, inputValue, result, data.percentage);
      console.log(result);
      analysisResult.result = data.result;
      analysisResult.percentage = data.percentage;
      // Update the UI with the sentiment analysis result as needed
      renderCheckbox(data.result);

    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export { analysisResult };

// get leaderboard

export const requestLeaderBoard = (roomId) => {
  const url = `http://${addr}:8080/get/leaderboard?roomId=` + roomId;
  return fetch(url, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const requestTodayRanking = () => {
  const url = `http://${addr}:8080/get/today_ranking`;
  fetch(url, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
};



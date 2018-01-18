const updates = require('./updates');
const { store } = require('./game/store');
const { wrapInAction } = require('./game/actions');

let events = [];
updates.subscribe(ev => (events = [...events, ...ev]));

const update = function(delta) {
  //console.log('--- tick ---');
  for (const ev of events) {
    store.dispatch(wrapInAction(ev));
  }
  events = [];
};


let prevTick = Date.now();
const tickRate = 1000 / 1; // 1000/30

const gameLoop = function() {
  const now = Date.now();
  const state = store.getState();

  if (prevTick + tickRate <= now) {
    const delta = (now - prevTick) / 1000;
    prevTick = now;

    update(delta);
  }
  
  if (!state.gameState.gameOver) {
    if (now - prevTick < tickRate - 16) {
      setTimeout(gameLoop);
    } else {
      setImmediate(gameLoop);
    }
  }
};

gameLoop();

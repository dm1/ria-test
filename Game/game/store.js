const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { discardDeadPlayerActions, forbidReconnecting } = require('./middleware/server-rules');
const logger = require('./middleware/logger');
const rootReducer = require('./reducers');

const { isAlive } = require('./util');
const actions = require('./actions');

const initialState = {
  gameState: {
    gameOver: false,
    gameStarted: false
  },
  players: []
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, discardDeadPlayerActions, forbidReconnecting, logger)
);

//Правила игры:
store.subscribe(() => {
  const state = store.getState();
  const activePlayers = state.players.filter(isAlive);

  //Игра начинается когда присоединяется хотя бы 2 игрока
  //это нужно чтобы условие на конец игры сразу не сработало
  if (!state.gameState.gameStarted && activePlayers.length >= 2) {
    store.dispatch({ type: actions.GAME_STARTED });
  }

  //Игра завершается когда в живых остается только один игрок
  if (state.gameState.gameStarted && !state.gameState.gameOver && activePlayers.length == 1) {
    store.dispatch({
      type: actions.GAME_OVER,
      playerId: activePlayers[0].playerId
    });
  }

  //Так же условие на случай ничьей, в теории оно никогда не долно сработать
  if (state.gameState.gameStarted && !state.gameState.gameOver && activePlayers.length == 0) {
    store.dispatch({ type: actions.GAME_OVER });
  }
});

module.exports = { store };

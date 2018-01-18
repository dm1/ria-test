const actions = require('../actions');

const initialState = {
  gameOver: false,
  //Для начала игры нужно хотя бы 2 игрока
  gameStarted: false
};

module.exports = function gameState(state = initialState, action) {
  switch (action.type) {
    case actions.GAME_STARTED: {
      return { ...state, gameOver: false, gameStarted: true };
    }
    case actions.GAME_OVER: {
      return { ...state, gameOver: true, gameStarted: false };
    }
  }
  return state;
};

const gameState = require('./game-state');
const players = require('./players');
const { combineReducers } = require('redux');

module.exports = combineReducers({ gameState, players });

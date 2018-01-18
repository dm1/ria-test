const chalk = require('chalk');
const randomColor = require('randomcolor');
const actions = require('../actions');
const { playerById } = require('../util');

const name = playerId => {
  return `${chalk.hex(randomColor({ seed: playerId }))('#' + playerId)}`;
};

const status = player => {
  return `${name(player.playerId)}[${chalk.green(player.hp)}hp]`;
};

const logAction = store => next => action => {
  const state = store.getState();
  const player = playerById(state, action.playerId);
  const target = playerById(state, action.targetId);

  let msg = null;
  switch (action.type) {
    case actions.ADD_PLAYER:
      msg = `Player ${name(action.playerId)} entered the world as ${action.class}`;
      break;
    case actions.ATTACK:
      {
        msg = `Player ${status(player)} attacked player ${status(target)} with a ${chalk.cyan(player.weapon)}`;
      }
      break;
    case actions.CHANGE_WEAPON:
      msg = `Player ${status(player)} equiped a ${chalk.cyan(action.weapon)}`;
      break;
    case actions.MOVE:
      msg = `Player ${status(player)} moved to [${action.x},${action.y}]`;
      break;
    case actions.GAME_STARTED:
      msg = chalk.yellow('GAME STARTED');
      break;
    case actions.GAME_OVER:
      {
        if (action.playerId) {
          msg = chalk.yellow(`\nGAME OVER\nPlayer ${status(player)} won the game`);
        } else {
          msg = chalk.yellow('\nGAME OVER\n ended in a draw');
        }
      }
      break;
    case actions.CHECK_PLAYER_KILLED: {
      if (target && target.hp === 0) {
        msg = chalk.bgRed(
          `>>> Player ${status(target)} was killed by ${status(player)} with a ${chalk.cyan(player.weapon)} <<<`
        );
      }
      break;
    }
    default:
      msg = null;
  }
  if (msg) {
    console.log(msg);
  }

  return next(action);
};

module.exports = logAction;

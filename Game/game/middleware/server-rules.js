const { isAlive, playerById } = require('../util');
const actions = require('../actions');

//Не позволяем мертвым игрокам совершать действия
const discardDeadPlayerActions = store => next => action => {
  const { playerId, targetId } = action;
  const state = store.getState();
  const player = playerById(state, playerId);
  const target = playerById(state, targetId);

  if (player && !isAlive(player)) {
    return;
  }
  return next(action);
};

//запрещаем игрокам подключатся несколько раз
const forbidReconnecting = store => next => action => {
  const { type, playerId } = action;
  const state = store.getState();
  const player = playerById(state, playerId);

  if (type === actions.ADD_PLAYER && player && isAlive(player)) {
    return;
  }
  return next(action);
};

module.exports = {
  discardDeadPlayerActions,
  forbidReconnecting
};

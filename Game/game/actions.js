const actions = {
  /* external API */
  ADD_PLAYER: 'add player',
  MOVE: 'move',
  CHANGE_WEAPON: 'change weapon',
  ATTACK: 'attack',

  CHECK_PLAYER_KILLED: 'PLAYER_KILLED',
  GAME_STARTED: 'GAME_STARTED',
  GAME_OVER: 'GAME_OVER'
};

const wrapInAction = event => {
  if (event.type == actions.ATTACK) {
    //После атаки диспатчим доп. экшн чтобы залогировать смерть
    return function(dispatch) {
      const { playerId, targetId } = event;
      dispatch(event);
      dispatch({ type: actions.CHECK_PLAYER_KILLED, playerId, targetId });
    };
  }
  return event;
};

module.exports = { ...actions, wrapInAction };

const actions = require('../actions');
const { weapons, attack } = require('../weapons');
const { isAlive, canMove } = require('../util');

const initialState = {
  players: []
};

module.exports = function(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_PLAYER: {
      if (state.some(p => p.playerId === action.playerId)) {
        return state;
      }

      return [
        ...state,
        {
          playerId: action.playerId,
          class: action.class,
          weapon: action.weapon,
          hp: action.hp,
          x: action.x,
          y: action.y
        }
      ];
    }
    case actions.ATTACK: {
      return [
        ...state.map((target, i) => {
          if (target.playerId === action.targetId) {
            const player = state.find(p => p.playerId == action.playerId);
            return attack(player, target);
          }
          return target;
        })
      ];
    }
    case actions.CHECK_PLAYER_KILLED: {
      return state;
    }
    case actions.CHANGE_WEAPON: {
      return [
        ...state.map((player, i) => {
          if (player.playerId === action.playerId) {
            if (weapons[action.weapon]) {
              return { ...player, weapon: action.weapon };
            }
          }
          return player;
        })
      ];
    }
    case actions.MOVE: {
      return [
        ...state.map((player, i) => {
          if (player.playerId === action.playerId && canMove(action.x, action.y, state)) {
            return { ...player, x: action.x, y: action.y };
          }
          return player;
        })
      ];
    }
  }

  return state;
};

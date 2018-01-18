const isAlive = player => player.hp > 0;

//сделаем так, что в одной точке может находится только один игрок
const canMove = (x, y, others = []) => !others.filter(isAlive).some(p => p.x === x && p.y === y);

const playerById = (state, playerId) => state.players.find(p => p.playerId === playerId);

module.exports = {
  isAlive,
  canMove,
  playerById
};

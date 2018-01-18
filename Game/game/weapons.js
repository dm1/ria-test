//Пускай оружие делится на оружие дальнего и ближнего боя.
//
const weapons = {
  knife: { damage: 5, melee: false },
  'baseball bat': { damage: 10, melee: false },
  shotgun: { damage: 30, melee: false },
  'laser gun': { damage: 35, melee: false }
};

const attack = (player, target) => {
  if (player && target) {
    const weapon = weapons[player.weapon];
    if ((weapon && !weapon.melee) || (weapon.melee && nearby(player, target))) {
      return { ...target, hp: Math.max(0, target.hp - weapon.damage) };
    }
  }
  return { ...target };
};

//будем считать 2х игроков стоящими рядом если
//они стоят на соседних клетках по диагоналяи или вертикалям
/*
[][][]  p2[][]
p2p1[]  []p1[]
[][][]  [][][]
*/
const nearby = (player1, player2) => {
  const dx = Math.abs(player1.x - player2.x);
  const dy = Math.abs(player1.y - player2.y);
  return dx <= 1 && dy <= 1;
};

module.exports = { weapons, attack };

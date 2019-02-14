const fs = require('fs');
const path = require('path');

const team = fs
  .readFileSync(path.join(__dirname, 'team.txt'), {
    encoding: 'utf-8',
  })
  .trim()
  .split('\n');

const positions = [
  '1 Off',
  '2 Off',
  '3 Off',
  '1 leg',
  '3 Leg',
  'Backstop',
  'Keeper',
  'Floating',
];

const randomNumber = () => Math.floor(Math.random() * 10) + 5;

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  const cutAt = Math.floor(Math.random() * a.length);

  return [...a.slice(cutAt), ...a.slice(0, cutAt)];
};

const shufflerFactory = rounds => arr => {
  let shuffled = [...arr];

  for (let a = 0; a < rounds; a++) {
    shuffled = shuffle(shuffled);
  }

  return shuffled;
};

const randomizeFielding = (team, positions) => {
  const shuffler = shufflerFactory(randomNumber());
  const shuffledTeam = shuffler(team);

  return [...new Array(8).keys()]
    .map((x, a) => `${positions[a]}: ${shuffledTeam[a]}`)
    .join('\n');
};

const randomizeBatting = team => {
  const shuffler = shufflerFactory(randomNumber());
  const shuffledTeam = shuffler(team);

  return shuffledTeam.map((x, i) => `${i + 1}: ${x}`).join('\n');
};

console.log('*Batting:*');
console.log(randomizeBatting(team));
console.log('');
console.log('*Fielding:*');
console.log(randomizeFielding(team, positions));

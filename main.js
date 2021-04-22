// TODO: преобразовать клиент

// var gameClient = new GameClient(url);

// gameClient.run(function(board) {
//   var random = Math.floor(Math.random() * Object.keys(ACTIONS).length);
//   return ACTIONS[Object.keys(ACTIONS)[random]];
// });

const util = require('util');
const readline = require('readline');
const { exec } = require('child_process');

solverStartCommand = process.argv[1]
const solver = exec(solverStartCommand);

rl = readline.createInterface({input: solver.stdin, output: solver.stdout});
question = util.promisify(rl.question).bind(rl);


async function main() {
  while (true) {
    state = "state\n";
    command = await question(state);
    console.log(command);
  }
}

main();
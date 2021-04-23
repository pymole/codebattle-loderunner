const util = require('util');
const readline = require('readline');
const { spawn } = require('child_process');

const solver = spawn(process.argv[2], process.argv.slice(3));

const rl = readline.createInterface({input: solver.stdout, output: solver.stdin});

const question = util.promisify(rl.question).bind(rl);


async function main() {
  while (true) {
      const state = "state\n";
      try{
          const command = await question(state);
          console.log(command);
      }

      catch (e) {
          console.log(e);
      }
  }
}

main();
// const { EvenOdd, helloWorld_Cpp, author, sumToNCpp } = require("../lib/binding.js");
const readline = require("readline");
const { getMD5String, getMD5StringJs, sum, sumJs } = require("../lib/binding.js");


// console.log("AuthorName:", author);
// console.log("Is 5 even:", EvenOdd(5));
// console.log("Is 100001001 even:", EvenOdd(100001001));
// console.log("Is 10000100 even:", EvenOdd(10000100));

console.log("----------------------------------");

for (let i = 0; i < 10; i += 1) {
  const num = 10 ** i;

  console.time(`${num.toString().padStart(10)} sum JS`);
  sumJs(num);
  console.timeEnd(`${num.toString().padStart(10)} sum JS`);

  console.time(`${num.toString().padStart(10)} sum CPP`);
  sum(num);
  console.timeEnd(`${num.toString().padStart(10)} sum CPP`);
}

// read input string from console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let message = "";
rl.question("Enter a string: ", (input) => {
  console.log(`You entered: ${input}`);
  message = input;
  console.time("CPP");
  const hash = getMD5String(message);
  console.timeEnd("CPP");
  console.time("Node.js");
  const jsHash = getMD5StringJs(message);
  console.timeEnd("Node.js");

  console.log({ hash, jsHash, equal: hash === jsHash });
  rl.close();
  process.exit(0);
});

// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

//uses old scrabble scoring system to give score
// function oldScrabbleScorer(word) {
//   word = word.toUpperCase();
//   let letterPoints = "";

//   for (let i = 0; i < word.length; i++) {
//     for (const pointValue in oldPointStructure) {
//       if (oldPointStructure[pointValue].includes(word[i])) {
//         letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
//       }
//     }
//   }
//   return letterPoints;
// }

// let wordToScore = " ";
// function initialPrompt() {
//   console.log("Let's play some scrabble!");

//   wordToScore = input.question("Enter a word to score: ");
//   console.log(oldScrabbleScorer(wordToScore));
// }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

//simple score that gives 1 point for each letter
function simpleScorer(word) {
  word = word.toUpperCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i].match(/[A-Z]/)) {
      score++;
    }
  }
  return score;
}

// let simpleScore = " ";
// function initialPrompt() {
//   console.log("Let's play some scrabble!");

//   simpleScore = input.question("Enter a word to score: ");
//   console.log(simpleScorer(simpleScore));
// }

// gives each vowel 3 points and each cosonant 1 point
function vowelBonusScorer(word) {
  word = word.toUpperCase();
  let vowelPoints = 3;
  let cosonantPoints = 1;
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i].match(/[A-Z]/)) {
      if (["A", "E", "I", "O", "U"].includes(word[i])) {
        score += vowelPoints;
      } else {
        score += cosonantPoints;
      }
    }
  }
  return score;
}

// let vowelScorer = " ";
// function initialPrompt() {
//   console.log("Let's play some scrabble!");
//   vowelScorer = input.question("Enter a word to score: ");
//   console.log(vowelBonusScorer(vowelScorer));
// }

function transform(oldPointStructure) {
  let transformedPointStructure = {};
  for (pointValue in oldPointStructure) {
    let letters = oldPointStructure[pointValue];
    for (let i = 0; i < letters.length; i++) {
      transformedPointStructure[letters[i].toLowerCase()] = Number(pointValue);
    }
  }
  return transformedPointStructure;
}

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
  word = word.toLowerCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    if (newPointStructure.hasOwnProperty(letter)) {
      score += newPointStructure[letter];
    }
  }
  return score;
}

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowel",
    description: "Vowels are 3 points, consonants are 1 point.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm",
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use?");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(
      `${i} -${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`
    );
  }
  let selection = input.question(
    "Enter the number corresponding to your choice: "
  );
  return scoringAlgorithms[selection];
}
function initialPrompt() {
  console.log("Let's play some scrabble!");
  console.log("-------------------------");
  let wordToScore = input.question("Enter a word to score: ");
  console.log("----------------------");
  let selectedAlgorithm = scorerPrompt();
  console.log("----------------------------------------------");
  console.log(
    `Score for '${wordToScore}':\n\ ${selectedAlgorithm.scoringFunction(
      wordToScore
    )}`
  );
}

function runProgram() {
  initialPrompt();
}
console.log("I am having github issues");
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};

// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85
const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word = ''

function initialPrompt() {
  alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];
  

  let word = input.question("Let's play some Scrabble!\n\nEnter a word to score: ");

  for (i=0;i<word.length;i++){
    if(alphabet.includes(word[i])==false){
      console.log('Invalid Input.');
      initialPrompt();
    } else{
      console.log(`Score for '${word}': ${scorerPrompt(word)}`);
    }
  }
    
}

let simpleScore = function(word){
  score = 0
  for (i=0;i<word.length;i++){
    if (word[i] == ''){
      Pass
    } else {
      score += 1;
    }
  }
  return score;
}

let vowelBonusScore = function(word){
  word = word.toLowerCase();
  let vowels = ['a','e','i','o','u','y'];
  let consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','z'];
  let score = 0;
  for (i=0;i<word.length;i++){
    if (word[i] == ''){
      Pass
    } else if (vowels.includes(word[i])){
      score += 3;
    } else {
      score +=1;
    }
  }
  return score;
}

let scrabbleScore = function(word){
  word = word.toUpperCase();
  score = 0;
  for (i=0;i<word.length;i++){
    letter = word[i];
    score += newPointStructure[letter];
  }
  return score;
}

const scoringAlgorithms = [
  {name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scorerFunction: simpleScore},
  {name: 'Bonus Vowels',
  description:'Vowels are 3 pts,consonants are 1 pt.',
  scorerFunction:vowelBonusScore},
  {name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scorerFunction: scrabbleScore}
];


function scorerPrompt(word) {
  let selection = '';
  

  while(true){

  
    selection = input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ");

    selection = Number(selection);

    if (isNaN(selection) ||selection <0 || selection>2){
      console.log('Invalid input.');
    } else {
      break
    }

  }  


  score = scoringAlgorithms[selection].scorerFunction(word);

  return score;

}

function transform(oldPointStructure) {
  let newPointStructure = {};
  for (key in oldPointStructure){
    if (oldPointStructure[key].length >1){
      for(i=0;i<oldPointStructure[key].length;i++){
        newPointStructure[oldPointStructure[key.toLowerCase()][i]] = Number(key);
      } 
      } else {
        newPointStructure[oldPointStructure[key.toLowerCase()][0]] = Number(key);
      }
    }
  return newPointStructure;
}

let newPointStructure = transform(oldPointStructure);

newPointStructure[' '] = 0;

function runProgram() {
   initialPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};


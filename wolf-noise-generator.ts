import * as fs from "fs"; // File system module

// Function to getRandomInt
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to read the JSON data
function getWolfNoises(): {
  howl: string[];
  playful: string[];
  scared: string[];
  punctuation: { [category: string]: string[]; }; // Nested object for category-specific punctuation
} {
  try {
    const data = fs.readFileSync("./wolf-noises.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading wolf-noises.json:", error);
    throw error; // Re-throw the error for handling
  }
}

export function generateWolfNoiseString(): string {
    const wolfNoises = getWolfNoises(); // Read JSON data
    const category = getRandomInt(0, Object.keys(wolfNoises).length - 1); // Pick a random category key
    const randomWords = wolfNoises[Object.keys(wolfNoises)[category]]; // Get words for that category
  
    let result = "";
    let currentSentenceLength = 0;
  
    const maxLength = 280; // Set maximum length for the generated string
  
    while (result.length < maxLength) {
      const randomWord = randomWords[getRandomInt(0, randomWords.length - 1)];
      const wordLength = randomWord.length;
  
      // Check if adding the word exceeds the maximum length
      if (result.length + wordLength <= maxLength) {
        // Add a space if it's not the first word and result is not empty
        if (result.length > 0) {
          result += " ";
        }
        result += randomWord;
        currentSentenceLength += wordLength;
      } else {
        // Break the loop if adding the word would exceed the maximum length
        break;
      }
    }
  
    return result.trim(); // Remove any leading/trailing whitespace
  }  
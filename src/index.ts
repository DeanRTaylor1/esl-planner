// create a 2d array that represents a wordsearch based on a list of words.

const wordsList: string[] = ["cat", "dog", "horse", "camel", "mouse", "rat", "wolf", "bear", "chicken", "dinosaur"]

class wordSearch {
  private readonly wordSearch: string[][];
  private readonly answerKey: string[][];
  private wordsList: string[];
  private wordSearchSize: number;
  private wordSearchWords: string[];
  private alphabet: string[] = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");


  constructor(wordsList: string[]) {
    this.wordsList = wordsList.map((word) => word.toUpperCase());
    this.wordSearchSize = this.calculateSize();
    this.wordSearch = this.createWordSearch();
    this.wordSearchWords = this.placeWords();
    this.answerKey = this.setAnswerKey();
    this.addRandomLetters();

  }
  private calculateSize(){
    const wordsSum = wordsList.map(x => {
      return Math.pow(x.length, 2)
    }).reduce((a, b) => {
      return a + b
    }, 0)

    return Math.ceil(Math.sqrt(wordsSum)) + 1
  }

  getWordSearch(): string[][] {
    return this.wordSearch;
  }
  getAnswerKey(): string[][] {
    return this.answerKey;
  }

  private createWordSearch(): string[][] {
    let wordSearch: string[][] = [];
    for (let i = 0; i < this.wordSearchSize; i++) {
      wordSearch[i] = [];
      for (let j = 0; j < this.wordSearchSize; j++) {
        wordSearch[i][j] = " ";
      }
    }
    return wordSearch;
  }

  private checkIfWordFits(
    x: number,
    y: number,
    direction: number,
    word: string
  ): boolean {
    let wordLength = word.length;
    if (direction === 0) {
      if (x + wordLength < this.wordSearchSize) {
        return true;
      }
    } else if (direction === 1) {
      if (x - wordLength > 0) {
        return true;
      } else {
        return false;
      }
    } else if (direction === 2) {
      if (y + wordLength < this.wordSearchSize) {
        return true;
      } else {
        return false;
      }
    } else if (direction === 3) {
      if (y - wordLength > 0) {
        return true;
      } else {
        return false;
      }
    } else if (direction === 4) {
      if (
        x + wordLength < this.wordSearchSize &&
        y + wordLength < this.wordSearchSize
      ) {
        return true;
      } else {
        return false;
      }
    } else if (direction === 5) {
      if (x - wordLength > 0 && y - wordLength > 0) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

  private getDirection(word: string): {
    x: number;
    y: number;
    direction: number;
  } {
    let isValidDirection = false;
    let direction = 0;
    let x = 0;
    let y = 0;
    while (!isValidDirection) {
      x = Math.floor(Math.random() * this.wordSearchSize);

      y = Math.floor(Math.random() * this.wordSearchSize);

      direction = Math.floor(Math.random() * 6);

      console.log(this.checkIfWordFits(x, y, direction, word), direction);

      isValidDirection =
        this.checkIfWordFits(x, y, direction, word) &&
        this.checkIfLocationEmpty(word, x, y, direction);
    }
    return { x, y, direction };
  }

  private checkIfLocationEmpty(
    word: string,
    x: number,
    y: number,
    direction: number
  ): boolean {
    if (direction === 0) {
      for (let j = 0; j < word.length; j++) {
        if (this.wordSearch[x + j][y] !== " ") {
          return false;
        }
      }
      return true;
    }
    if (direction === 1) {
      for (let j = 0; j < word.length; j++) {
        console.log(x, y, j);
        if (this.wordSearch[x - j][y] !== " ") {
          return false;
        }
      }
      return true;
    }
    if (direction === 2) {
      for (let j = 0; j < word.length; j++) {
        if (this.wordSearch[x][y + j] !== " ") {
          return false;
        }
      }
      return true;
    }

    if (direction === 3) {
      for (let j = 0; j < word.length; j++) {
        if (this.wordSearch[x][y - j] !== " ") {
          return false;
        }
      }
      return true;
    }
    if (direction === 4) {
      for (let j = 0; j < word.length; j++) {
        if (this.wordSearch[x + j][y + j] !== " ") {
          return false;
        }
      }
      return true;
    }
    if (direction === 5) {
      for (let j = 0; j < word.length; j++) {
        if (this.wordSearch[x - j][y - j] !== " ") {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  private placeWords(): string[] {
    let wordSearchWords: string[] = [];
    for (let i = 0; i < this.wordsList.length; i++) {
      let word = this.wordsList[i];
      let wordLength = word.length;
      let validDirections = false;

      const { x, y, direction } = this.getDirection(word);

      let placed = false;
      console.log(direction);
      while (!placed) {
        if (direction === 0) {
          for (let j = 0; j < wordLength; j++) {
            this.wordSearch[x + j][y] = word[j];
            placed = true;
          }
        } else if (direction === 1) {
          for (let j = 0; j < wordLength; j++) {
            this.wordSearch[x - j][y] = word[j];
            placed = true;
          }
        } else if (direction === 2) {
          for (let j = 0; j < wordLength; j++) {
            this.wordSearch[x][y + j] = word[j];
            placed = true;
          }
        } else if (direction === 3) {
          for (let j = 0; j < wordLength; j++) {
            this.wordSearch[x][y - j] = word[j];
            placed = true;
          }
        } else if (direction === 4) {
          for (let j = 0; j < wordLength; j++) {
            this.wordSearch[x + j][y + j] = word[j];
            placed = true;
          }
        } else if (direction === 5) {
          for (let j = 0; j < wordLength; j++) {
            this.wordSearch[x - j][y - j] = word[j];
            placed = true;
          }
        } else {
          break;
        }
      }
    }
    return wordSearchWords;
  }

  private setAnswerKey = (): string[][] => {
    const answerKey = JSON.parse(JSON.stringify(this.wordSearch))
    return answerKey;
  }

  private getRandomLetter() {
    const randomNum = Math.floor(Math.random() * 26);
    return this.alphabet[randomNum];
  }

  private addRandomLetters() {
    for(let i = 0; i < this.wordSearch.length; i++){
      for(let j = 0; j < this.wordSearch[i].length; j++){
        if(this.wordSearch[i][j] === ' '){
          this.wordSearch[i][j] = this.getRandomLetter();
        }
      }
    }
  }
}

const testWordSearch = new wordSearch(wordsList);

console.table(testWordSearch.getAnswerKey())
console.table(testWordSearch.getWordSearch())

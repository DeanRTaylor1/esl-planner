"use strict";
const wordsList = ["cat", "dog", "horse", "camel", "mouse", "rat"];
class wordSearch {
    constructor(wordsList) {
        this.wordsList = wordsList;
        this.wordSearchSize = this.wordsList.length * 2;
        this.wordSearch = this.createWordSearch();
        this.wordSearchWords = this.placeWords();
    }
    createWordSearch() {
        let wordSearch = [];
        for (let i = 0; i < this.wordSearchSize; i++) {
            wordSearch[i] = [];
            for (let j = 0; j < this.wordSearchSize; j++) {
                wordSearch[i][j] = " ";
            }
        }
        return wordSearch;
    }
    checkIfWordFits(x, y, direction, word) {
        let wordLength = word.length;
        if (direction === 0) {
            if (x + wordLength < this.wordSearchSize) {
                return true;
            }
        }
        else if (direction === 1) {
            if (x - wordLength > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (direction === 2) {
            if (y + wordLength < this.wordSearchSize) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (direction === 3) {
            if (y - wordLength > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (direction === 4) {
            if (x + wordLength < this.wordSearchSize &&
                y + wordLength < this.wordSearchSize) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (direction === 5) {
            if (x - wordLength > 0 && y - wordLength > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
    getDirection(word) {
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
    checkIfLocationEmpty(word, x, y, direction) {
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
    placeWords() {
        let wordSearchWords = [];
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
                }
                else if (direction === 1) {
                    for (let j = 0; j < wordLength; j++) {
                        this.wordSearch[x - j][y] = word[j];
                        placed = true;
                    }
                }
                else if (direction === 2) {
                    for (let j = 0; j < wordLength; j++) {
                        this.wordSearch[x][y + j] = word[j];
                        placed = true;
                    }
                }
                else if (direction === 3) {
                    for (let j = 0; j < wordLength; j++) {
                        this.wordSearch[x][y - j] = word[j];
                        placed = true;
                    }
                }
                else if (direction === 4) {
                    for (let j = 0; j < wordLength; j++) {
                        this.wordSearch[x + j][y + j] = word[j];
                        placed = true;
                    }
                }
                else if (direction === 5) {
                    for (let j = 0; j < wordLength; j++) {
                        this.wordSearch[x - j][y - j] = word[j];
                        placed = true;
                    }
                }
                else {
                    break;
                }
            }
        }
        return wordSearchWords;
    }
}
const testWordsearch = new wordSearch(wordsList);
console.table(testWordsearch.wordSearch);

"use strict";
const wordsList = [
    'cat',
    'dog',
    'horse',
    'camel',
    'mouse',
    'rat',
    'wolf',
    'bear',
    'chicken',
    'dinosaur',
];
class wordSearch {
    constructor(wordsList, difficulty) {
        this.alphabet = 'abcdefghijklmnopqrstuvwxyz'
            .toUpperCase()
            .split('');
        this.setAnswerKey = () => {
            const answerKey = JSON.parse(JSON.stringify(this.wordSearch));
            return answerKey;
        };
        this.difficulty = difficulty;
        this.wordsList = wordsList.map((word) => word.toUpperCase());
        this.wordSearchSize = this.calculateSize();
        this.wordSearch = this.createWordSearch();
        this.placeWords();
        this.answerKey = this.setAnswerKey();
        this.addRandomLetters();
    }
    calculateSize() {
        const wordsSum = wordsList
            .map((x) => {
            return Math.pow(x.length, 2);
        })
            .reduce((a, b) => {
            return a + b;
        }, 0);
        return Math.ceil(Math.sqrt(wordsSum)) + 1;
    }
    getWordSearch() {
        return this.wordSearch;
    }
    getAnswerKey() {
        return this.answerKey;
    }
    createWordSearch() {
        let wordSearch = [];
        for (let i = 0; i < this.wordSearchSize; i++) {
            wordSearch[i] = [];
            for (let j = 0; j < this.wordSearchSize; j++) {
                wordSearch[i][j] = ' ';
            }
        }
        return wordSearch;
    }
    checkIfWordFits(x, y, direction, word) {
        let wordLength = word.length;
        switch (direction) {
            case 0:
                if (y + wordLength < this.wordSearchSize) {
                    return true;
                }
                else {
                    return false;
                }
            case 1:
                if (x + wordLength < this.wordSearchSize) {
                    return true;
                }
                else {
                    return false;
                }
            case 2:
                if (y - wordLength > 0) {
                    return true;
                }
                else {
                    return false;
                }
            case 3:
                if (x - wordLength > 0) {
                    return true;
                }
                else {
                    return false;
                }
            case 4:
                if (x + wordLength < this.wordSearchSize &&
                    y + wordLength < this.wordSearchSize) {
                    return true;
                }
                else {
                    return false;
                }
            case 5:
                if (x - wordLength > 0 && y - wordLength > 0) {
                    return true;
                }
                else {
                    return false;
                }
            default:
                return false;
        }
    }
    getDirection(word) {
        let isValidDirection = false;
        let direction = 0;
        let x = 0;
        let y = 0;
        while (!isValidDirection) {
            x = Math.floor(Math.random() * this.wordSearchSize);
            y = Math.floor(Math.random() * this.wordSearchSize);
            direction = Math.floor(Math.random() * this.difficulty);
            console.log(this.checkIfWordFits(x, y, direction, word), direction);
            isValidDirection =
                this.checkIfWordFits(x, y, direction, word) &&
                    this.checkIfLocationEmpty(word, x, y, direction);
        }
        return { x, y, direction };
    }
    checkIfLocationEmpty(word, x, y, direction) {
        switch (direction) {
            case 0:
                for (let j = 0; j < word.length; j++) {
                    if (this.wordSearch[x][y + j] !== ' ') {
                        return false;
                    }
                }
                return true;
            case 1:
                for (let j = 0; j < word.length; j++) {
                    if (this.wordSearch[x + j][y] !== ' ') {
                        return false;
                    }
                }
                return true;
            case 2:
                for (let j = 0; j < word.length; j++) {
                    if (this.wordSearch[x][y - j] !== ' ') {
                        return false;
                    }
                }
                return true;
            case 3:
                for (let j = 0; j < word.length; j++) {
                    console.log(x, y, j);
                    if (this.wordSearch[x - j][y] !== ' ') {
                        return false;
                    }
                }
                return true;
            case 4:
                for (let j = 0; j < word.length; j++) {
                    if (this.wordSearch[x + j][y + j] !== ' ') {
                        return false;
                    }
                }
                return true;
            case 5:
                for (let j = 0; j < word.length; j++) {
                    if (this.wordSearch[x - j][y - j] !== ' ') {
                        return false;
                    }
                }
                return true;
            default:
                return false;
        }
    }
    placeWords() {
        let wordSearchWords = [];
        for (let i = 0; i < this.wordsList.length; i++) {
            let word = this.wordsList[i];
            let wordLength = word.length;
            const { x, y, direction } = this.getDirection(word);
            let placed = false;
            console.log(direction);
            while (!placed) {
                switch (direction) {
                    case 0:
                        for (let j = 0; j < wordLength; j++) {
                            this.wordSearch[x][y + j] = word[j];
                            placed = true;
                        }
                        break;
                    case 1:
                        for (let j = 0; j < wordLength; j++) {
                            this.wordSearch[x + j][y] = word[j];
                            placed = true;
                        }
                        break;
                    case 2:
                        for (let j = 0; j < wordLength; j++) {
                            this.wordSearch[x][y - j] = word[j];
                            placed = true;
                        }
                        break;
                    case 3:
                        for (let j = 0; j < wordLength; j++) {
                            this.wordSearch[x - j][y] = word[j];
                            placed = true;
                        }
                        break;
                    case 4:
                        for (let j = 0; j < wordLength; j++) {
                            this.wordSearch[x + j][y + j] = word[j];
                            placed = true;
                        }
                        break;
                    case 5:
                        for (let j = 0; j < wordLength; j++) {
                            this.wordSearch[x - j][y - j] = word[j];
                            placed = true;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return wordSearchWords;
    }
    getRandomLetter() {
        const randomNum = Math.floor(Math.random() * 26);
        return this.alphabet[randomNum];
    }
    addRandomLetters() {
        for (let i = 0; i < this.wordSearch.length; i++) {
            for (let j = 0; j < this.wordSearch[i].length; j++) {
                if (this.wordSearch[i][j] === ' ') {
                    this.wordSearch[i][j] = this.getRandomLetter();
                }
            }
        }
    }
}
const testWordSearch = new wordSearch(wordsList, 6);
console.table(testWordSearch.getAnswerKey());
console.table(testWordSearch.getWordSearch());

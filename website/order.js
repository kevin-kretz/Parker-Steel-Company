class Piece {
    constructor(length, quantity) {
        this.length = length;
        this.quantity = quantity;
    }
}

class Pattern {
    constructor(pattern, remainingLength) {
        this.pattern = pattern;
        this.remainingLength = remainingLength;
    }
}

let stockLength;
const piecesOrdered = [];
const allPossiblePatterns = [];

function getBestCuttingSequence() {
    stockLength = parseFloat(document.getElementById("stock-length").value);
    getPiecesOrdred();
    getAllPossiblePatterns();
}

function getPiecesOrdred() {
    const numPurchaseLines = document.getElementsByTagName("fieldset").length;

    for (let purchaseLine = 1; purchaseLine <= numPurchaseLines; purchaseLine++) {
        let length = parseFloat(document.getElementById(`line-${purchaseLine}-length`).value);
        let quantity = parseFloat(document.getElementById(`line-${purchaseLine}-quantity`).value);
        piecesOrdered.push(new Piece(length, quantity));
    }
}

function getAllPossiblePatterns() {
    let previousPattern;
    let pattern = getFirstPattern();
    allPossiblePatterns.push(pattern);
    while (anotherPatternPossible(pattern.pattern)) {
        previousPattern = pattern;
        pattern = getNextPattern(previousPattern);
        allPossiblePatterns.push(pattern);
    }
}

function getFirstPattern() {
    let pattern = [];
    let remainingLength = stockLength;

    for (let piece in piecesOrdered) {
        let quantityNeeded = piecesOrdered[piece].quantity;
        let maxQuantityPossible = Math.floor(remainingLength / piecesOrdered[piece].length);
        let quantity = Math.min(quantityNeeded, maxQuantityPossible);
        remainingLength -= quantity * piecesOrdered[piece].length;
        pattern.push(new Piece(piecesOrdered[piece].length, quantity));
    }
    
    return new Pattern(pattern, remainingLength);
}

function anotherPatternPossible(previousPattern) {
    for (let piece in previousPattern) {
        if (previousPattern[piece].quantity > 0) {
            return true;
        }
    }
    return false;
}

function getNextPattern(previousPattern) {
    const startIndexAndLoweredPattern = lowerSmallestLength(previousPattern);
    const nextPattern = useRemainingLength(startIndexAndLoweredPattern);
    return nextPattern;
}

function lowerSmallestLength(pattern) {
    let startIndex;
    let loweredPattern = pattern;
    for (let i = loweredPattern.pattern.length -1; i >= 0; i--) {
        if (loweredPattern.pattern[i].quantity > 0) {
            loweredPattern.pattern[i].quantity -= 1;
            loweredPattern.remainingLength += loweredPattern.pattern[i].length;
            startIndex = i + 1;
            break;
        }
    }
    
    return [startIndex, loweredPattern]
}

function useRemainingLength(startIndexAndLoweredPattern) {
    const startIndex = startIndexAndLoweredPattern[0];
    let loweredPattern = startIndexAndLoweredPattern[1];

    for (let i = startIndex; i < loweredPattern.pattern.length; i++) {
        while (loweredPattern.pattern[i].length <= loweredPattern.remainingLength && loweredPattern.pattern[i].quantity < piecesOrdered[i].quantity) {
            loweredPattern.pattern[i].quantity += 1;
            loweredPattern.remainingLength -= loweredPattern.pattern[i].length;
        }
    }
    return loweredPattern
}

function printSummary() {}

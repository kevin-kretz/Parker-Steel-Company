class Piece {
    constructor(length, quantity) {
        this.length = length;
        this.quantity = quantity;
    }
}

let stockLength;
const piecesOrdered = [];
const allPossiblePatterns = [];

function getBestCuttingSequence() {
    stockLength = parseFloat(document.getElementById("stock-length").value);
    getPiecesOrdred();
    getAllPossiblePatterns();
    console.log(allPossiblePatterns);
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

    while (anotherPatternPossible(pattern)) {
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
    
    pattern.push(remainingLength);
    return pattern;
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

function lowerSmallestLength(previousPattern) {
    let startIndex;
    let loweredPattern = [];

    for (let i = previousPattern.length - 2; i >= 0; i--) {
        if (previousPattern[i].quantity > 0) {
            loweredPattern.unshift(new Piece(previousPattern[i].length, previousPattern[i].quantity - 1));
            remainingLength = previousPattern[previousPattern.length - 1] + previousPattern[i].length;
            startIndex = i + 1;
            break;
        }
        else {
            loweredPattern.unshift(new Piece(previousPattern[i].length, previousPattern[i].quantity));
        }
        
    }

    for (let i = startIndex - 2; i >= 0; i--) {
        loweredPattern.unshift(new Piece(previousPattern[i].length, previousPattern[i].quantity));
    }

    loweredPattern.push(remainingLength);

    return [startIndex, loweredPattern]
}

function useRemainingLength(startIndexAndLoweredPattern) {
    const startIndex = startIndexAndLoweredPattern[0];
    let loweredPattern = startIndexAndLoweredPattern[1];
    remainingLength = loweredPattern[loweredPattern.length - 1];

    nextPattern = [];

    for (let i = 0; i < loweredPattern.length - 1; i++) {
        while (i < startIndex) {
            nextPattern.push(new Piece(loweredPattern[i].length, loweredPattern[i].quantity));
            break;
        }
        while (i >= startIndex) {
            if (loweredPattern[i].length <= remainingLength && loweredPattern[i].quantity < piecesOrdered[i].quantity) {
                quantity = Math.floor(remainingLength / loweredPattern[i].length);
                remainingLength -= loweredPattern[i].length * quantity;
                nextPattern.push(new Piece(loweredPattern[i].length, quantity));
            }
            else {
                nextPattern.push(new Piece(loweredPattern[i].length, loweredPattern[i].quantity));
            }
            break;
        }
    }
    nextPattern.push(remainingLength);

    return nextPattern;
}

function printSummary() {}

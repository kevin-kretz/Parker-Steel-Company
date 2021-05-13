class Piece {
    
    /** 
     * A piece is a piece to be cut from stock material.  Each Piece has its own length and quatity required for the order.
     * @constructor 
     * @param {number} length - The length of the piece required
     * @param {number} quantity - The number of pieces required for the order.
    */

    constructor(length, quantity) {
        this.length = length;
        this.quantity = quantity;
    }
}

const STOCK_LENGTH = parseFloat(document.getElementById("stock-length").value);  /** The length of the stock material the pieces will be cut from. */
const PIECES_REQUIRED = [];  /** An array of all the required Pieces for the order. */
const ALL_POSSIBLE_PATTERNS = [];  /** An array of all the possible patterns to cut the pieces required. */

function getBestCuttingSequence() {
    /** Gets the optimal cutting pattern for the user, deteremined by the least amount of wasted material. */
    getPiecesRequired();
    getAllPossiblePatterns();
    console.log(ALL_POSSIBLE_PATTERNS);
}

function getPiecesRequired() {
    const NUM_PURCHASE_LINES = document.getElementsByTagName("fieldset").length;

    for (let purchaseLine = 1; purchaseLine <= NUM_PURCHASE_LINES; purchaseLine++) {
        let length = parseFloat(document.getElementById(`line-${purchaseLine}-length`).value);
        let quantity = parseFloat(document.getElementById(`line-${purchaseLine}-quantity`).value);
        PIECES_REQUIRED.push(new Piece(length, quantity));
    }
}

function getAllPossiblePatterns() {
    /** Gets all of the possible patterns the stock material can be cut into the required pieces.
     * @constructor
    */
    let previousPattern;
    let pattern = getFirstPattern();
    ALL_POSSIBLE_PATTERNS.push(pattern);

    while (anotherPatternPossible(pattern)) {
        previousPattern = pattern;
        pattern = getNextPattern(previousPattern);
        ALL_POSSIBLE_PATTERNS.push(pattern);
    }
}

/**
 * @function getFirstPattern
 * @desc Gets the first pattern when getting all possible patterns
 * @returns {Piece[]} list of Pieces
 */

function getFirstPattern() {
    let pattern = [];  /** Each pattern is an array of Pieces */
    let remainingLength = STOCK_LENGTH;

    for (let piece in PIECES_REQUIRED) {
        let quantityNeeded = PIECES_REQUIRED[piece].quantity;
        let maxQuantityPossible = Math.floor(remainingLength / PIECES_REQUIRED[piece].length);
        let quantity = Math.min(quantityNeeded, maxQuantityPossible);
        remainingLength -= quantity * PIECES_REQUIRED[piece].length;
        pattern.push(new Piece(PIECES_REQUIRED[piece].length, quantity));
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
            if (loweredPattern[i].length <= remainingLength && loweredPattern[i].quantity < PIECES_REQUIRED[i].quantity) {
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

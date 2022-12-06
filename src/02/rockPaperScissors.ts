


export function calculateTotalScore(moves: string[]): number {
    let totalScore = 0;
    let lineNumberErrorMessage = 1;
    for (const moveset of moves) {
        if (moveset.length !== 3) throw `error reading input at line ${lineNumberErrorMessage}, expected 3 characters, got ${moveset.length}`;
        const opponentMove = moveset[0] as opponentMove;
        const playerMove = moveset[2] as playerMove;
        if (!playerMoveMap[playerMove]) throw `error reading input at line ${lineNumberErrorMessage}, 3rd character should be X, Y or Z, got ${playerMove}`;
        if (!opponentMoveMap[opponentMove]) throw `error reading input at line ${lineNumberErrorMessage}, 1st character should be A, B or X, got ${playerMove}`;
        totalScore += calculateScore(opponentMove, playerMove);
        lineNumberErrorMessage++;
    }
    return totalScore;
}

export function calculateScore(opponent: "A" | "B" | "C", player: "X" | "Y" | "Z") {
    const opponentMove = opponentMoveMap[opponent];
    const playerMove = playerMoveMap[player];

    return resultScore[getResult(opponentMove, playerMove)] + moveScore[playerMove];
}


export function getResult(opponent: move, player: move): result {
    if (winRules[opponent] === player) return "lose";
    if (winRules[player] === opponent) return "win";
    return "draw";
}


export type playerMove = "X" | "Y" | "Z";
export type opponentMove = "A" | "B" | "C";
export type move = "rock" | "paper" | "scissors";

export const moveScore: Record<move, number> = {
    "rock": 1,
    "paper": 2,
    "scissors": 3
}

export type result = "win" | "lose" | "draw";

export const resultScore: Record<result, number> = {
    "win": 6,
    "lose": 0,
    "draw": 3
}

export const winRules: Record<move, move> = {
    "paper": "rock",
    "rock": "scissors",
    "scissors": "paper"
}

export const playerMoveMap: Record<playerMove, move> = {
    "X": "rock",
    "Y": "paper",
    "Z": "scissors"
}

export const opponentMoveMap: Record<opponentMove, move> = {
    "A": "rock",
    "B": "paper",
    "C": "scissors"
}


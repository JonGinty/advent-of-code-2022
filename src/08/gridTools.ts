


export function readGrid(input: string): grid {
    const grid: grid = [];
    let row: number[] = [];
    grid.push(row);
    for (const char of input) {
        if (char === "\n") {
            row = [];
            grid.push(row);
        } else {
            const num = parseInt(char);
            if (isNaN(num)) throw new Error("expected number, got " + char);
            row.push(parseInt(char))
        }
    }
    return grid;
}

export function countVisible(grid: grid): number {
    let visible = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            visible = isVisible(grid, i, j) ? visible + 1 : visible;
        }
    }
    return visible;
}

export function maxScore(grid: grid): number {
    let max = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const score = evaluateScore(scoreDirections(grid, i, j));
            max = Math.max(score, max);
        }
    }
    return max;
}

export function isVisible(grid: grid, row: number, col: number) {
    if (row === 0 || row === grid.length - 1 || col === 0 || col === grid[row].length - 1) return true;
    const val = grid[row][col];
    for (let i = row - 1; i >= 0; i--) {
        if (grid[i][col] >= val) break;
        if (i === 0) return true;
    }
    for (let i = row + 1; i < grid.length; i++) {
        if (grid[i][col] >= val) break;
        if (i === grid.length - 1) return true;
    }
    for (let i = col - 1; i >=0; i--) {
        if (grid[row][i] >= val) break;
        if (i === 0) return true;
    }
    for (let i = col + 1; i < grid[row].length; i++) {
        if (grid[row][i] >= val) break;
        if (i === grid[row].length - 1) return true;
    }
    return false;
}

export function scoreDirections(grid: grid, row: number, col: number) {
    let [up, down, left, right] = [0,0,0,0];
    if (row === 0 || row === grid.length - 1 || col === 0 || col === grid[row].length - 1) return { up, down, left, right};
    const val = grid[row][col];
    
    for (let i = row - 1; i >= 0; i--) {
        up++;
        if (grid[i][col] >= val) break;
    }
    for (let i = row + 1; i < grid.length; i++) {
        down++
        if (grid[i][col] >= val) break;
    }
    for (let i = col - 1; i >=0; i--) {
        left++
        if (grid[row][i] >= val) break;
    }
    for (let i = col + 1; i < grid[row].length; i++) {
        right++;
        if (grid[row][i] >= val) break;
    }
    return { up, down, left, right }
}

export function evaluateScore(score: {up: number, down: number, left: number, right: number}) {
    return score.up * score.down * score.left * score.right;
}



export type grid = number[][];
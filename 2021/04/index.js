const MARK = "X";

export function part1(data) {
  const [raw_numbers, ...raw_boards] = data.split("\n\n");
  const numbers = raw_numbers.split(",").map(Number);
  const boards = raw_boards.map((board_string) =>
    board_string.split("\n").map((board_line) =>
      board_line
        .split(" ")
        .filter((s) => s)
        .map(Number)
    )
  );

  let winner = -1;
  let number;

  // iterate numbers
  for (let i in numbers) {
    // iterate boards
    for (let j in boards) {
      mark(boards[j], numbers[i]);

      if (!boards[j].won && (checkX(boards[j]) || checkY(boards[j]))) {
        winner = j;
        number = numbers[i];
        boards[j].won = true;
      }
      if (allWon(boards)) break;
    }
    if (allWon(boards)) break;
  }

  const sum = sumOfBoard(boards[winner]);

  return sum * number;
}

export function part2(data) {
  console.log(":D");
}

function allWon(boards) {
  const notWonBoards = boards.filter((board) => !board.won);
  return notWonBoards.length === 0;
}

function sumOfBoard(board) {
  let sum = 0;
  for (let x of board) {
    for (let y of x) {
      if (y !== MARK) sum += parseInt(y);
    }
  }
  return sum;
}

function mark(board, number) {
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      if (board[x][y] === number) board[x][y] = MARK;
    }
  }
}

function checkX(board) {
  const exp = new RegExp("^" + MARK + "{" + board.length + "}$");
  let won = false;

  for (let row of board) {
    won = exp.test(row.join(""));
    if (won) break;
  }

  return won;
}

function checkY(board) {
  return checkX(transpose(board));
}

function transpose(arr) {
  return arr[0].map((_, i) => arr.map((x) => x[i]));
}

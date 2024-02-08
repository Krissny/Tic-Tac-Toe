// game module
const game = (function () {
  const row = 3;
  const col = 3;
  let board = [];

  function reset() {
    for (let i = 0; i < row; i++) {
      board[i] = [];
      for (let j = 0; j < col; j++) {
        board[i][j] = "null";
      }
    }
  }
  reset();

  function Players(name1 = "Player 1", name2 = "Player 2") {
    const player1 = { name: name1, sign: "X" };
    const player2 = { name: name2, sign: "O" };
    return { player1, player2 };
  }
  return { Players, board, reset };
})();

//module for playing
const play = (function () {
  let player = game.Players().player1;

  function turns() {
    if (player.sign == "X") {
      player = game.Players().player2;
      console.log("Player2 Turn");
    } else {
      player = game.Players().player1;
      console.log("Player1 Turn");
    }
  }

  //for console log
  function showboard() {
    for (let i = 0; i < game.board.length; i++) {
      console.log(
        `${game.board[i][0]} ${game.board[i][1]} ${game.board[i][2]}`
      );
    }
    checkWinner();
  }

  function checkWinner() {
    function winner(val) {
      if (val == "X") {
        console.log(`${game.Players().player1.name} wins`);
      } else {
        console.log(`${game.Players().player2.name} wins`);
      }
      player = game.Players().player1;
      game.reset();
    }

    for (let i = 0; i < 3; i++) {
      if (
        game.board[i][0] != "null" &&
        game.board[i][0] == game.board[i][1] &&
        game.board[i][2] == game.board[i][0]
      ) {
        winner(game.board[i][0]);
        return;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        game.board[0][i] != "null" &&
        game.board[0][i] == game.board[1][i] &&
        game.board[2][i] == game.board[0][i]
      ) {
        winner(game.board[0][i]);
        return;
      }
    }
    const mid = game.board[1][1];
    if (mid != "null") {
      if (game.board[0][0] == mid && game.board[2][2] == mid) {
        winner(mid);
      } else if (game.board[0][2] == mid && game.board[2][0] == mid) {
        winner(mid);
        return;
      }
    }
  }

  function changeValue(row, col) {
    if (
      row >= 3 ||
      col >= 3 ||
      row < 0 ||
      col < 0 ||
      game.board[row][col] != "null"
    ) {
      console.log("Enter a valid location");
      return;
    } else {
      game.board[row][col] = player.sign;
    }
    showboard();
    turns();
  }
  return { changeValue };
})();

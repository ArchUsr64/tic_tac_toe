let dropdown= document.getElementById("dropdown") as HTMLSelectElement;
let button = document.getElementById("button") as HTMLButtonElement;
let board_element= document.getElementById("board") as HTMLElement;
let turn_display= document.getElementById("turn_display") as HTMLElement;

const enum SquareValue {
  Empty,
  X,
  O
};

const enum BoardState{
  O_Wins,
  X_Wins,
  Draw,
  NonTerminate,
};

const board: SquareValue[] = [
  SquareValue.Empty, SquareValue.Empty, SquareValue.Empty,
  SquareValue.Empty, SquareValue.Empty, SquareValue.Empty,
  SquareValue.Empty, SquareValue.Empty, SquareValue.Empty,
];

function get_board_state(board: SquareValue[]): BoardState{
  let board_mask = board.map((cell_value) => {
    if (cell_value == SquareValue.Empty) 
      return 0 
    else return 1
  });
  let player_1_mask = board.map((cell_value) => {
    if (cell_value == SquareValue.X) 
      return 1 
    else return 0
  });
  let player_2_mask = board.map((cell_value) => {
    if (cell_value == SquareValue.O) 
      return 1 
    else return 0
  });
  let win_conditions: number[][] = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
  ];
  for (const win_condition of win_conditions) {
    let player_1_flag = true;
    let player_2_flag = true;
    for(let i = 0; i < 9; i++) {
      if (win_condition[i] === 1 && player_1_mask[i] !== 1) {
        player_1_flag = false;
      }
      if (win_condition[i] === 1 && player_2_mask[i] !== 1) {
        player_2_flag = false;
      }
    }
    if (player_1_flag)
      return BoardState.X_Wins;
    if (player_2_flag)
      return BoardState.O_Wins;
  }
  let filled_cell_count = board_mask.filter((value) => value === 1).length;
  if (filled_cell_count === 9)
    return BoardState.Draw
  return BoardState.NonTerminate
}

function board_to_string(board: SquareValue[]): string{
  let text : string= "";
  for(let i = 0; i < 9; i++) {
    switch(board[i]) {
      case SquareValue.Empty:
        text += "-"
        break;
      case SquareValue.X:
        text += "X"
        break;
      case SquareValue.O:
        text += "O"
        break;
    }
    if (i % 3 == 2) {
      text += "\n";
    }
  }
  return text;
}

function update_dropdown(board: SquareValue[]) {
  let empty_cell_index : number[] = [];
  for(let i = 0; i < 9; i++) {
    if (board[i] === SquareValue.Empty) {
      empty_cell_index.push(i);
    }
  }
  let dropdown_html = "";
  empty_cell_index.map((x) => x+1).forEach((cell_index) => dropdown_html += `<option label="${cell_index}"></option>`);
  dropdown.innerHTML = dropdown_html;
}

let turn: boolean = true;
turn_display.textContent = "Player 1's turn";

button.addEventListener("click", () => {
  let index = parseInt(dropdown.options[dropdown.selectedIndex].label) - 1;
  if (board[index] === SquareValue.Empty) {
    if (turn) {
      board[index] = SquareValue.X;
      turn = false;
      turn_display.textContent = "Player 2's turn";
    }
    else {
      board[index] = SquareValue.O;
      turn = true;
      turn_display.textContent = "Player 1's turn";
    }
    board_element.textContent = board_to_string(board);
    let board_state = get_board_state(board);
    let game_state= () => {
      switch (board_state) {
      case BoardState.O_Wins:
        return "Player 2 Won"
      case BoardState.X_Wins:
        return "Player 1 Won"
      case BoardState.Draw:
        return "Game Draw"
      case BoardState.NonTerminate:
        return "Continue"
      }
    };
    console.log(game_state());
    update_dropdown(board);
    }
});

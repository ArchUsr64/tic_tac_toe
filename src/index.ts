let dropdown= document.getElementById("dropdown") as HTMLSelectElement;
let button = document.getElementById("button") as HTMLButtonElement;
let board_element= document.getElementById("board") as HTMLElement;
let turn_display= document.getElementById("turn_display") as HTMLElement;

enum SquareValue {
  Empty,
  X,
  O
};

const board: SquareValue[] = [
  SquareValue.Empty, SquareValue.Empty, SquareValue.Empty,
  SquareValue.Empty, SquareValue.Empty, SquareValue.Empty,
  SquareValue.Empty, SquareValue.Empty, SquareValue.Empty,
];

function get_board_state(board: SquareValue[]): string{
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
    board_element.textContent = get_board_state(board);
    update_dropdown(board);
    }
});

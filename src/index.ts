let grid= document.getElementById("grid") as HTMLSelectElement;
let size_slider= document.getElementById("size_slider") as HTMLSelectElement;
let game_status= document.getElementById("game_status") as HTMLSelectElement;

const enum GridCell {
  Empty,
  X,
  O,
}

const enum Player {
  X,
  O,
}

const enum GameState {
  Turn_X,
  Turn_O,
  Win_X,
  Win_O,
  Draw
}

function set_size_display(size: number) {
  let size_display= document.getElementById("size_display") as HTMLSelectElement;
  size_display.innerText = `${size}x${size}`;
}

function get_player_hud(state: GameState): string {
  switch (state) {
    case GameState.Turn_X:
      return "Turn: Player 1";
    case GameState.Turn_O:
      return "Turn: Player 2";
    case GameState.Win_X:
      return "Player 1 Won";
    case GameState.Win_O:
      return "Player 2 Won";
    case GameState.Draw:
      return "Game Draw";
  }
}

class Board{
  size: number;
  grid: GridCell[];
  turn: Player;

  constructor(size: number) {
    this.size = size;
    this.grid = Array(size * size).fill(GridCell.Empty)
    this.turn = Player.X;
  }

  set(index: number): boolean {
    if (this.grid[index] !== GridCell.Empty)
      return false;
    if (this.turn === Player.X) {
      this.grid[index] = GridCell.X;
      this.turn = Player.O;
    }
    else if (this.turn === Player.O) {
      this.grid[index] = GridCell.O;
      this.turn = Player.X;
    }
    return true;
  }

  state() {
    let player_x_mask = this.grid.map((cell_value) => {
      if (cell_value === GridCell.X) return 1; 
      else return 0;
    });
    let player_o_mask = this.grid.map((cell_value) => {
      if (cell_value === GridCell.O) return 1; 
      else return 0;
    });
    const win = (mask: (1 | 0)[]): boolean => {
      for (let i = 0; i < this.size; i++) {
        let flag_horizontal = true;
        let flag_vertical = true;
        for (let j = 0; j < this.size; j++) {
          if (mask[i * this.size + j] === 0)
            flag_horizontal = false;
          if (mask[i + j * this.size] === 0)
            flag_vertical = false;
          if (!flag_horizontal && !flag_vertical)
            break;
        }
        let straight_line_found = flag_horizontal || flag_vertical;
        if (straight_line_found)
          return true;
      }
      let diagonal_top_left_to_bottom_right = true;
      let diagonal_top_right_to_bottom_left = true;
      for (let i = 0; i < this.size; i++) {
        if (mask[i * this.size + i] === 0)
          diagonal_top_left_to_bottom_right = false;
        if (mask[(i + 1) * this.size - i - 1] === 0)
          diagonal_top_right_to_bottom_left = false;
          if (!diagonal_top_left_to_bottom_right && !diagonal_top_right_to_bottom_left)
            break;
      }
      let diagonal_found = diagonal_top_left_to_bottom_right || diagonal_top_right_to_bottom_left;
      if (diagonal_found)
        return true;
      return false;
    }
    if (win(player_x_mask))
      return GameState.Win_X;
    if (win(player_o_mask))
      return GameState.Win_O;
    let empty_mask = this.grid.map((cell_value) => {
      if (cell_value === GridCell.Empty) return 1; 
      else return 0;
    });
    let grid_filled = empty_mask.reduce((acm, i) => (acm + i) as (0 | 1), 0) === 0;
    if (grid_filled)
      return GameState.Draw;
    switch (this.turn) {
      case Player.X:
      return GameState.Turn_X;
      case Player.O:
      return GameState.Turn_O;
    }
  }
}

let board :Board;

function generate_board(size: number): HTMLElement[] {
  let button_arr: HTMLElement[] = [];
  const get_class = (index: number): string[] => {
    let class_str: string[] = [];
    if (index < size) {
      class_str.push("TopEdge")
    }
    if (index % size == 0) {
      class_str.push("LeftEdge")
    }
    if (index % size == size - 1) {
      class_str.push("RightEdge")
    }
    if (index >= size * (size - 1)) {
      class_str.push("BottomEdge")
    }
    return class_str;
  }
  let range = Array.from({length: size * size}, (_, i) => i);
    grid.innerHTML = ""
    range.forEach((x) => {
    let grid_cell = document.createElement("button");
    grid_cell.addEventListener("click", () => {
      if (board.set(x)) {
        let next_turn = board.turn;
        let cell_text = next_turn === Player.X? "O": "X";
        grid.childNodes[x].textContent = cell_text;
        console.log(board.state());
        game_status.innerText = get_player_hud(board.state());
      };
    });
    grid_cell.classList.add("grid_cell");
    grid_cell.classList.add(...get_class(x));
    button_arr.push(grid_cell);
    }
  )
  return button_arr;
}

function reset() {
  let size = parseInt(size_slider.value);
  board = new Board(size);
  grid.innerHTML = ""
  grid.style.setProperty("--grid_size", size.toString())
  generate_board(size).forEach((element) => grid.appendChild(element));
  set_size_display(size);
}


size_slider.addEventListener("input" ,reset)

reset()

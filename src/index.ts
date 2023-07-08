let grid= document.getElementById("grid") as HTMLSelectElement;
let size_slider= document.getElementById("size_slider") as HTMLSelectElement;

function generate_board(size: number): HTMLElement[] {
  let button_arr: HTMLElement[] = [];
  const get_id = (index: number): string => {
    switch (index) {
      case 0:
        return "TopLeft"
      case size - 1:
        return "TopRight"
      case size * (size - 1):
        return "BottomLeft"
      case (size * size) - 1:
        return "BottomRight"
    }
    if (index < size) {
      return "TopEdge"
    }
    if (index % size == 0) {
      return "LeftEdge"
    }
    if (index % size == size - 1) {
      return "RightEdge"
    }
    if (index > (size * size) - 1) {
      return "BottomEdge"
    }
    return "Inner"
  }
  let range = Array.from({length: size * size}, (_, i) => i);
    grid.innerHTML = ""
    range.forEach((x) => {
    let grid_cell = document.createElement("button");
    grid_cell.classList.add("grid_cell");
    grid_cell.innerText = "X";
    grid_cell.id = get_id(x);
    button_arr.push(grid_cell);
    if (x % size === size - 1){
      button_arr.push(document.createElement("br"));
      }
    }
  )
  return button_arr;
}

size_slider.addEventListener("input" ,() => {
  let size = parseInt(size_slider.value);
  grid.innerHTML = ""
  generate_board(size).forEach((element) => grid.appendChild(element));
})

let size = parseInt(size_slider.value);
grid.innerHTML = ""
generate_board(size).forEach((element) => grid.appendChild(element));

let grid= document.getElementById("grid") as HTMLSelectElement;
let size_slider= document.getElementById("size_slider") as HTMLSelectElement;

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
    grid_cell.classList.add("grid_cell");
    grid_cell.classList.add(...get_class(x));
    button_arr.push(grid_cell);
    }
  )
  return button_arr;
}

size_slider.addEventListener("input" ,() => {
  let size = parseInt(size_slider.value);
  grid.innerHTML = ""
  grid.style.setProperty("--grid_size", size.toString())
  generate_board(size).forEach((element) => grid.appendChild(element));
})

let size = parseInt(size_slider.value);
grid.innerHTML = ""
generate_board(size).forEach((element) => grid.appendChild(element));

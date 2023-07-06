let input= document.getElementById("input") as HTMLInputElement;
let button = document.getElementById("button") as HTMLButtonElement;
let output = document.getElementById("output") as HTMLPreElement;
button.addEventListener("click", () => output.textContent = "Length of the input string is " + input.value.length.toString())

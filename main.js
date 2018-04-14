// event listeners and chess settings
const button = document.querySelector(".submit");
button.addEventListener("click", getValue);

function getValue(e) {
  N = document.querySelector(".input").value;
  run();
  e.preventDefault();
}

function run() {
  if (N < 14) {
    //szerokosc szachownicy
    let sizeWidth = (80 * N).toString();
    let chess = document.querySelector(".chess-board");
    chess.style.width = `${sizeWidth}px`;
    //
    //
    //szachownica
    const doneArray = insertChessArray();

    doneArray.forEach(div => {
      chess.appendChild(div);
    });

    const originArr = runFunction();
    console.log(originArr);

    let firstSolution = changeArr(originArr[0]);

    firstSolution.forEach(place => {
      for (let i = 0; i <= doneArray.length; i++) {
        if (i === place) {
          doneArray[i].style.backgroundColor = "orangered";
        }
      }
    });
  }
}
//
//
let clear = document.querySelector(".clear");
clear.addEventListener("click", clearFields);
function clearFields() {
  e.preventDefault();
  let chess = document.querySelector(".chess-board");
  chess.forEach(div => {
    div.remove();
  });
}
//
//
function handleSubmit(e) {
  e.preventDefault();
  const input = document.querySelector(".input").value;
  console.log(input);
  return input;
}
//
//
// N na N indexowane 0 do N
function insertChessArray() {
  const puzzleArr = [];
  for (let i = 0; i < N * N; i++) {
    let newPuzzle = document.createElement("div");
    newPuzzle.classList.add("chess-board__puzzle");
    puzzleArr.push(newPuzzle);
  }
  return puzzleArr;
}
//
//
//index change, zamienia index 0-N na 0-N*N
function changeArr(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr.length * i + arr[i]);
  }
  return newArr;
}
//
//
//wywolanie i message
function runFunction() {
  let timeMessage = document.querySelector(".time-elapsed");
  let start = Date.now();
  const finalSolution = queenPuzzle(N, N);
  let stop = Date.now();
  let time = `${stop - start} milisekund`;
  timeMessage.innerHTML = `Czas wykonania: ${time}`;
  return finalSolution;
}
//
//
// solution
function queenPuzzle(rows, columns) {
  return rows <= 0 ? [[]] : addQueen(rows - 1, columns);
}
//
//
//
function addQueen(newRow, columns, prevSolution) {
  let newSolutions = [];
  let someSol = [];
  let prev = queenPuzzle(newRow, columns);
  for (let i = 0; i < prev.length; i++) {
    let solution = prev[i];
    for (let newColumn = 0; newColumn < columns; newColumn++) {
      if (!hasConflict(newRow, newColumn, solution))
        newSolutions.push(solution.concat([newColumn]));
    }
  }
  return newSolutions;
}
//
//
//
function hasConflict(newRow, newColumn, solution) {
  for (let i = 0; i < newRow; i++) {
    if (
      solution[i] == newColumn ||
      solution[i] + i == newColumn + newRow ||
      solution[i] - i == newColumn - newRow
    ) {
      return true;
    }
  }
  return false;
}

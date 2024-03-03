//gameboard object: have state of board(x's and o's) in an array. 
//public functions: get board state array for analyzing; get 3 in a row lines as
//strings to check them; update display using state array; mark board state
//array with index and mark, then update display
const gameboard = ( ()=> {
  //make array of 9 zero-indexed elements, every three represents a row.
  const boardArr = new Array(9).fill(null);
  // [ boardArr[0], boardArr[3], boardArr[6] ]=['X','X','X']; //test using destructuring assignment

  const getBoardArr = ()=> boardArr;

  const getCheckLines = ()=> {
    return {
      row1: [boardArr[0],boardArr[1],boardArr[2]].join(''),
      row2: [boardArr[3],boardArr[4],boardArr[5]].join(''),
      row3: [boardArr[6],boardArr[7],boardArr[8]].join(''),

      col1: [boardArr[0],boardArr[3],boardArr[6]].join(''),
      col2: [boardArr[1],boardArr[4],boardArr[7]].join(''),
      col3: [boardArr[2],boardArr[5],boardArr[8]].join(''),
      
      forwardDiag: [boardArr[6],boardArr[4],boardArr[2]].join(''),
      backDiag:    [boardArr[0],boardArr[4],boardArr[8]].join(''),
    }
  };

  const updateDisplay = ()=> {
    boardArr.forEach( (item,i)=> {
      if (item){ //skip empty spots
        document.querySelector(`[data-cell='${i}']`).textContent = `${item}`;
      }
    });
  }

  const markBoard = (cellIndex, marker)=> {
    if (!boardArr[cellIndex]){//only mark if cell is empty
      boardArr[cellIndex] = marker;
      updateDisplay();
      console.log(boardArr);
    }else {
      console.log('oops, cell occupied');
    }
  }

  //public exposure object, will reference closure scope
  return {getBoardArr, getCheckLines, updateDisplay, markBoard};
})();

//player objects factory function. make player objects from an event handler
const player = (name, marker)=> {
  let wins = 0;
  let ties = 0;
  //getter and setter functions use closure to allow for private variables
  const setWin = ()=> { wins++ }
  const getWins = ()=> wins;
  const setTie = ()=> { ties++ }
  const getTies = ()=> ties;
  return {
    name,
    marker,
    setWin,
    setTie,
    getWins,
    getTies,
  }
}


//usage
// const billy = player('Billy','O')
// billy.setWin()
// console.log(billy.getWins())

//game flow object: 1. logic will be in this object to start the game, event listeners will check for wins/ties 
const gameFlow = ( ()=> {
  // console.log( 'gameFlow object created')
  
})();
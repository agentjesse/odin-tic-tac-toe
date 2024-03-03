//gameboard object: have state of board(x's and o's) in an array. 
//public functions: get board state array for analyzing; get 3 in a row lines as
//strings to check them; update display using state array; mark board state
//array with index and mark, then update display; clear the board
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

  const clearBoard = ()=> {
    
  }

  //public exposure object, will reference closure scope
  return {getBoardArr, getCheckLines, updateDisplay, markBoard, clearBoard};
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
  //local vars
  const xNameInput = document.querySelector('#xName');
  const oNameInput = document.querySelector('#oName');
  let playerX, playerO;
  //listener removal logic, uses controller
  const controller = new AbortController();
  const signal = controller.signal; //get AbortSignal object from controller

  const enableGameboard = ()=> {
    //gameBoard listener for cell clicks
    document.querySelector('#gameBoard').addEventListener('click', e=>{
      e.stopPropagation;
      if (e.target.className === 'boardCell'){
        gameboard.markBoard(e.target.dataset.cell, playerX.marker)//mark board, using playerX for testing
        
      }
    },{signal}); //pass in AbortSignal object via options obj to remove this listener
  }
  
  //listener for buttons
  document.querySelector('.namesAndButtonsWrapper').addEventListener('click', e=>{ //uses bubbling
    e.stopPropagation;
    //handle button clicks
    if (e.target.id === 'start'){
      playerX = player(xNameInput.value ? xNameInput.value : 'Player X','X');
      playerO = player(oNameInput.value ? oNameInput.value : 'Player O','O');
      enableGameboard();
    }
    //clear name fields and board, disable gameboard
    if (e.target.id === 'restart'){
      xNameInput.value = '';
      oNameInput.value = '';
      controller.abort();
    }
  });
  

})();
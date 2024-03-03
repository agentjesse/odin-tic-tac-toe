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
    // set cell data to boardArr data
    boardArr.forEach( (item,i)=> {
        document.querySelector(`[data-cell='${i}']`).textContent = `${item ? item : ''}`;
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
    boardArr.fill(null);
    updateDisplay();
  }

  //public exposure object, will reference closure scope
  return {getBoardArr, getCheckLines, updateDisplay, markBoard, clearBoard};
})();

//player objects factory function. make player objects from an event handler. commented code is just for closure learning purposes, i.e. private variables example.
const player = (name, marker)=> {
  // let wins = 0;
  // let ties = 0;
  //getter and setter functions use closure to allow for private variables
  // const setWin = ()=> { wins++ }
  // const getWins = ()=> wins;
  // const setTie = ()=> { ties++ }
  // const getTies = ()=> ties;
  return {
    name,
    marker,
    // setWin,
    // setTie,
    // getWins,
    // getTies,
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
  //***ABORT CONTROLLER IS NOT BEING USED*** KEPT JUST FOR LEARNING PURPOSES.**
  //allow listener removal via the single-use AbortController AbortSignal object
  let controller = new AbortController();

  const enableGameboard = ()=> {
    //if needed, make a new AbortController object to reenable the event listener after aborting it previously. aborted is a property of the AbortSignal object, accessible from the signal property.
    if ( controller.signal.aborted ) { controller = new AbortController() }
    //gameBoard listener for cell clicks
    document.querySelector('#gameBoard').addEventListener('click', e=>{
      e.stopPropagation;
      if (e.target.className === 'boardCell'){
        gameboard.markBoard(e.target.dataset.cell, playerX.marker)//mark board, using playerX for testing
        
      }
    },{signal:controller.signal}); //providing an AbortSignal object allows removal of this listener
  }
  
  //listener for buttons
  document.querySelector('.namesAndButtonsWrapper').addEventListener('click', e=>{ //uses bubbling
    e.stopPropagation;
    //handle button clicks
    if (e.target.id === 'start'){
      //handle empty name fields first
      xNameInput.value = xNameInput.value ? xNameInput.value : 'Player 1';
      oNameInput.value = oNameInput.value ? oNameInput.value : 'Player 2';
      playerX = player(xNameInput.value,'X');
      playerO = player(oNameInput.value,'O');
      enableGameboard();
    }
    //clear name fields and board, disable gameboard
    if (e.target.id === 'restart'){
      gameboard.clearBoard();
      // [ xNameInput.value, oNameInput.value ] = ['','']; //fancy assignment example
      // controller.abort(); //not using for now, just for listener removal example
    }
  });
  

})();
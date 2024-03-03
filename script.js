//gameboard object: have state of board(x's and o's) in an array. 
//public functions: get board state array for analyzing; update display using state array; mark board state array with index and mark, then update display; clear the board; check board and return a result obj
const gameboard = ( ()=> {
  //make array of 9 zero-indexed elements, every three represents a row.
  const boardArr = new Array(9).fill(null);
  // [ boardArr[2], boardArr[5], boardArr[8] ]=['O','O','O']; //test using destructuring assignment

  const getBoardArr = ()=> boardArr;//for dev

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
      console.log('current boardArr: ',boardArr);//for debugging
    }else {
      console.log('oops, cell occupied');
    }
  }

  const clearBoard = ()=> {
    boardArr.fill(null);
    updateDisplay();
  }

  const checkForWinner = ()=> {
    const checkLines = getCheckLines()
    for (const key in checkLines){
      if(checkLines[key] === 'XXX'){ //variable key name, need to use square brackets
        return {winner:'X', line: key};
      }
      else if (checkLines[key] === 'OOO'){
        return {winner:'O', line: key};
      }
    }
  }

  //development public exposure object, will reference closure scope
  // return {getBoardArr, updateDisplay, markBoard, clearBoard, checkForWinner, getCheckLines};
  //release public exposure object
  return { markBoard, clearBoard, checkForWinner };
})();

//player objects factory function. make player objects from an start button event handler.
const player = (name, marker)=> {
  return { 
    name,
    marker,
  }
};

//game flow object: 1. logic will be in this object to start the game, event listeners will check for wins/ties 
const gameFlow = ( ()=> {
  //local vars
  const xNameInput = document.querySelector('#xName');
  const oNameInput = document.querySelector('#oName');
  const messageBox = document.querySelector('#messageBox');
  const startBtn = document.querySelector('#start');
  const restartBtn = document.querySelector('#restart');
  let playerX, playerO, currentPlayer;
  let totalMarks = 0;
  //allow listener removal via the single-use AbortController AbortSignal object
  let controller = new AbortController();

  const enableGameboard = ()=> {
    //if needed, make a new AbortController object to reenable the event listener after aborting it previously. aborted property is a property of the AbortSignal object, which is accessible from the signal property of the controller.
    if ( controller.signal.aborted ) { controller = new AbortController() }
    //gameBoard listener for cell clicks
    document.querySelector('#gameBoard').addEventListener('click', e=>{
      e.stopPropagation;
      //return early if board is full, otherwise increase mark counter and mark board
      if (totalMarks >8){ return };
      totalMarks++;
      if (e.target.className === 'boardCell'){
        currentPlayer = currentPlayer === playerO ? playerX : playerO; //switch last player before marking
        gameboard.markBoard(e.target.dataset.cell, currentPlayer.marker)
        //tie check, overwritten later if there is a winner
        if (totalMarks === 9) { messageBox.textContent = `Tie Game!`; }
        const result = gameboard.checkForWinner();
        if (result){ //truthy value means result obj with winner came back
          messageBox.textContent = `${result.winner === 'X' ? playerX.name: playerO.name} wins! ___line key: ${result.line}`;
          //handle win: remove this listener, restart button handles rest
          controller.abort();
        }
      }
    },{signal:controller.signal}); //providing an AbortSignal object allows removal of this listener
  }
  
  //listener for buttons
  document.querySelector('.namesAndButtonsWrapper').addEventListener('click', e=>{ //uses bubbling
    e.stopPropagation;
    //handle button clicks
    if (e.target.id === 'start'){
      //make players, handle empty name fields first.
      xNameInput.value = xNameInput.value ? xNameInput.value : 'Player 1';
      oNameInput.value = oNameInput.value ? oNameInput.value : 'Player 2';
      playerX = player(xNameInput.value,'X');
      playerO = player(oNameInput.value,'O');
      //start with marker X player
      messageBox.textContent = `${playerX.name} goes first!`
      currentPlayer = playerO; //#gameBoard listener switches player before calling markBoard, set opposite
      enableGameboard();
      startBtn.disabled = true; //no need to use anymore
      restartBtn.disabled = false; //allow immediate name changes (error handling)
    }
    //clear board to restart game. extra code is to disable gameboard and clear names
    if (e.target.id === 'restart'){
      controller.abort();//need to abort or else listener on #gameBoard will get called twice!
      totalMarks = 0; //reset before allowing clicks again
      gameboard.clearBoard();
      setPlayerNames();
      messageBox.textContent = `${playerX.name} goes first!`
      currentPlayer = playerO; //#gameBoard listener switches player before calling markBoard, set opposite
      enableGameboard();
    }
  });

  const setPlayerNames = ()=> {
    //handle empty name fields (error handling) first, then set player objects
    xNameInput.value = xNameInput.value ? xNameInput.value : 'Player 1';
    oNameInput.value = oNameInput.value ? oNameInput.value : 'Player 2';
    playerX.name = xNameInput.value;
    playerO.name = oNameInput.value;
  }

})();

//todo: handle glitch where clicking same space allows turn skip
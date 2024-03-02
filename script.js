//gameboard object: have state of board(x's and o's) in an array. public functions to: 1.set 
//the state array 2. get array of state of all the possible three-in-a-rows lines
const gameboardModule = (function () {
  const boardArr = new Array(9).fill(null);
  [ boardArr[0], boardArr[3], boardArr[6] ]=['X','X','X']; //test using destructuring assignment

  const logBoardArr = ()=> console.log(boardArr); //for debugging

  const getCheckLines = ()=> {
    return {
      row1: [boardArr[0],boardArr[1],boardArr[2]],
      row2: [boardArr[3],boardArr[4],boardArr[5]],
      row3: [boardArr[6],boardArr[7],boardArr[8]],

      col1: [boardArr[0],boardArr[3],boardArr[6]],
      col2: [boardArr[1],boardArr[4],boardArr[7]],
      col3: [boardArr[2],boardArr[5],boardArr[8]],
      
      forwardDiag: [boardArr[6],boardArr[4],boardArr[2]],
      backDiag:    [boardArr[0],boardArr[4],boardArr[8]],
    }
  }

  //public exposure object, references closure scope
  return {logBoardArr,getCheckLines};
})();


//module with closure example
// const pebblesModule = (function () {
//   let pebbles = 1;
//   const plusPebbles = ()=> {
//     pebbles++
//     console.log('pebble added')
//   }
//   const getPebbles = ()=> {
//     return pebbles;
//   }
//   return {getPebbles, plusPebbles};
// })();

//player objects: each object will store name of each player per object and 
//their marker (X/O). create these objects from press of a start button which 
//should call this factory function

//game flow object: 1. logic will be in this object to check for wins/ties 
//2. display update logic will be here with most event handlers. 
//gameboard object: have state of game in an array. public functions to: 1.set 
//the state array 2. get array of state of all the possible three-in-a-rows
const gameboardModule = (function () {
  const boardArr = new Array(9).fill(null);
  const logBoard = ()=> console.log(boardArr);

  //public exposure object, references closure scope
  return {logBoard};
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
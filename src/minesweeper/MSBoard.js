 import React from 'react'
 import {Tile} from './Tile.js'

const rand = (max) => (Math.floor(Math.random()*max));

const checkMine = (mine, newMine) => {
  if (mine[0] == newMine[0] && mine[1] == newMine[1]){
    return true;
  }
  else {
    return false;
  }
};

const checkMineList = (mineList, newMine) => (mineList.some(mine => checkMine(mine, newMine)));

const createMineList = (width, height, bombs) => {
  var mineList = [];
    for(var i = 0; i < bombs; i++){
      var newMine = [rand(width), rand(height)];
      checkMineList(mineList, newMine) ? i-- : mineList.push(newMine);
    }
  return mineList;
}

const increaseCounter = (tile) => (tile.counter += 1);

const plantMines = (field, width, height, bombs, clickBomb) => {
  var mineList = createMineList(width, height, bombs);
  var newField = field;
  for (var i = 0; i < bombs; i++){
    var y = mineList[i][0];
    var x = mineList[i][1];
    newField[y][x].isMine = true;
    newField[y][x].handleClick = clickBomb;

    try {increaseCounter(newField[y-1][x-1])}
    catch(err) {}
    try {increaseCounter(newField[y-1][x])}
    catch(err) {}
    try {increaseCounter(newField[y-1][x+1])}
    catch(err) {}
    try {increaseCounter(newField[y][x-1])}
    catch(err) {}
    try {increaseCounter(newField[y][x+1])}
    catch(err) {}
    try {increaseCounter(newField[y+1][x-1])}
    catch(err) {}
    try {increaseCounter(newField[y+1][x])}
    catch(err) {}
    try {increaseCounter(newField[y+1][x+1])}
    catch(err) {}

  }
  return newField;

}

export const createBoard = (width, height, bombs, click, clickBomb, clickFlag) => {
  var field = [];
  for(var row = 0; row < height; row++){
    field.push([]);
    for(var col = 0; col < width; col++){
      field[row].push({
        x           : col,
        y           : row,
        isMine      : false,
        counter     : 0,
        isClicked   : false,
        handleClick : click,
        isFlaged    : false,
        handleFlag  : clickFlag
      });
    }
  }
  var minedField = plantMines(field, width, height, bombs, clickBomb);
  return minedField;
}

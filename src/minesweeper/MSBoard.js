import React from 'react';

const rand = (max) => (Math.floor(Math.random()*max));

const checkMine = (mine, newMine) => mine === newMine ?  true :  false;

const checkMineList = (mineList, newMine) => {
    var isNew = true;
    mineList.map((mine) => checkMine(mine, newMine) ? isNew=false : isNew=true);
    return isNew;
}

const createMineList = (width, height, bombs) => {
  var mineList = []
    for(var i = 0; i < bombs; i++){
      var newMine = [rand(width), rand(height)];
      checkMineList(mineList, newMine) ? mineList.push(newMine) : i--;
    }
  return mineList;
}

const increaseCounter = (tile) => {
  var increment = tile.counter + 1;
  tile.counter = increment;
}

const plantMines = (field, width, height, bombs, clickBomb) => {
    var mineList = createMineList(width, height, bombs);
    var newField = field;
    for (var i = 0; i < bombs; i++){
      var x = mineList[i][0];
      var y = mineList[i][1];
      newField[x][y].isMine = true;
      newField[x][y].handleClick = clickBomb;

      try {increaseCounter(newField[x-1][y-1])}
      catch(err) {}
      try {increaseCounter(newField[x-1][y])}
      catch(err) {}
      try {increaseCounter(newField[x-1][y+1])}
      catch(err) {}
      try {increaseCounter(newField[x][y-1])}
      catch(err) {}
      try {increaseCounter(newField[x][y+1])}
      catch(err) {}
      try {increaseCounter(newField[x+1][y-1])}
      catch(err) {}
      try {increaseCounter(newField[x+1][y])}
      catch(err) {}
      try {increaseCounter(newField[x+1][y+1])}
      catch(err) {}

    }
    return newField;
}

export const createBoard = (width, height, bombs, click, clickBomb, clickFlag) => {
  var infoBoard = [];
  for(var row = 0; row < width; row++){
    infoBoard.push([]);
    for(var col = 0; col < height; col++){
      infoBoard[row].push({
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
  var minedField = plantMines(infoBoard, width, height, bombs, clickBomb);
  return minedField;
}

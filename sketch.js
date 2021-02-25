
const SCREEN_SIZE = 400;
const TILE_SIZE = SCREEN_SIZE / 8;
const OFFSET = 5;
const PIECE_SIZE = TILE_SIZE - 2*OFFSET;
const EXTRA_SIZE = 50;

var clicked = false;
var playerMove = 1;
var oldPos;
var id;
var state = 0;
var statusTexts;
var winner;
var timer = 0;

/* 0 = playing
  1 = game over
 */
//PLAYER ONE IS WHITE 1 = reg 3 = KING
//PLAYER TWO IS BLACK 2 = reg 4 = KING
/* board = [[8,1,8,1,8,1,8,1],
              [1,8,1,8,1,8,1,0],
              [8,1,8,1,8,1,8,1],
              [0,8,0,8,2,8,0,8],
              [8,0,8,0,8,0,8,0],
              [0,8,2,8,0,8,0,8],
              [8,0,8,0,8,0,8,0],
              [0,8,0,8,0,8,0,8]]; */
var board = [[8,1,8,1,8,1,8,1],
              [1,8,1,8,1,8,1,0],
              [8,1,8,1,8,1,8,1],
              [0,8,0,8,0,8,0,8],
              [8,0,8,0,8,0,8,0],
              [2,8,2,8,2,8,2,8],
              [8,2,8,2,8,2,8,2],
              [2,8,2,8,2,8,2,8]];
/* var board = [[8,0,8,0,8,0,8,0],
            [0,8,0,8,0,8,0,0],
            [8,0,8,0,8,0,8,0],
            [0,8,0,8,0,8,0,8],
            [8,0,8,0,8,0,8,0],
            [2,8,2,8,2,8,2,8],
            [8,2,8,2,8,2,8,2],
            [2,8,2,8,2,8,2,8]]; */

function setup() {
  createCanvas(SCREEN_SIZE, SCREEN_SIZE + EXTRA_SIZE);
  statusTexts = new StatusText(SCREEN_SIZE, EXTRA_SIZE)
  statusTexts.setText("Player One's Turn");
}

function draw() {
  background(220);
  drawBackground();
  drawBoard();
  promote();
  
  statusTexts.show();
  if (clicked){
    ellipseMode(CENTER);
    switch (id){
      case 1:
        fill(245,245,245);
        ellipse(mouseX,mouseY, PIECE_SIZE, PIECE_SIZE);
        break;
      case 2:
        fill(80,80,80);
        ellipse(mouseX,mouseY, PIECE_SIZE, PIECE_SIZE);
        break;
      case 3:
        fill(245,245,245);
        star(mouseX, mouseY, PIECE_SIZE/2, PIECE_SIZE/3, 5);
        break;
      case 4:
        fill(80,80,80);
        star(mouseX, mouseY, PIECE_SIZE/2, PIECE_SIZE/3, 5);
        break;
    }
  }
  if (state == 1){
    if (timer == 0){
      if (winner == 1)
        statusTexts.setText("Player One Wins")
      else if (winner == 2)
        statusTexts.setText("Player Two Wins")
    }
    timer++;
      if (timer % 259 == 0){
        if (winner == 1)
          statusTexts.setText("Player One Wins")
        else if (winner == 2)
          statusTexts.setText("Player Two Wins")
  }
    if (timer % 167 == 0)
    statusTexts.setText("Space to play again")
  }
}

function keyPressed(){
  if (keyCode == 32 && state == 1){
    board = [[8,1,8,1,8,1,8,1],
              [1,8,1,8,1,8,1,0],
              [8,1,8,1,8,1,8,1],
              [0,8,0,8,0,8,0,8],
              [8,0,8,0,8,0,8,0],
              [2,8,2,8,2,8,2,8],
              [8,2,8,2,8,2,8,2],
              [2,8,2,8,2,8,2,8]];         
    state = 0;
    clicked = false;
    playerMove = 1;
    oldPos;
    id;
    state = 0;
    statusTexts;
    winner;
    timer = 0;
    statusTexts.setText("Player One's Turn");
  }
}

function mousePressed(){
  if (state == 0 && mouseX < SCREEN_SIZE && mouseX > 0 && mouseY < SCREEN_SIZE && mouseY > 0){
    let pos = mousePos();
    if ((board[pos[1]][pos[0]] == 1 || board[pos[1]][pos[0]] == 3 ) && playerMove == 1){
      oldPos = [pos[1],pos[0]];
      id = board[pos[1]][pos[0]];
      board[pos[1]][pos[0]] = 0;
      clicked = true;
    }if ((board[pos[1]][pos[0]] == 2 || board[pos[1]][pos[0]] == 4) && playerMove == 2){
      oldPos = [pos[1],pos[0]];
      id = board[pos[1]][pos[0]];
      board[pos[1]][pos[0]] = 0;
      clicked = true;
    }
  }
}

function mouseReleased(){
  if (state == 0 && mouseX < SCREEN_SIZE && mouseX > 0 && mouseY < SCREEN_SIZE && mouseY > 0){
    let pos = mousePos();
    if (clicked && validMove(oldPos, pos, id) && board[pos[1]][pos[0]] == 0){
      if (playerMove == 1 ){
        fill(245,245,245);
        board[pos[1]][pos[0]] = id;
        clicked = false;
        playerMove = 2;
        statusTexts.setText("Player Two's Turn");
        if(checkWin()){
          timer = 0;
          state = 1;
          if (winner == 1)
            statusTexts.setText("Player One Wins")
          else if (winner == 2)
            statusTexts.setText("Player Two Wins")
        }
      }
      else if (playerMove == 2){
        fill(80,80,80);
        board[pos[1]][pos[0]] = id;
        clicked = false;
        playerMove = 1;
        statusTexts.setText("Player One's Turn");
        if(checkWin()){
          timer = 0;
          state = 1;
          if (winner == 1)
            statusTexts.setText("Player One Wins")
          else if (winner == 2)
            statusTexts.setText("Player Two Wins")
        }
      }
      else{
        board[oldPos[0]][oldPos[1]] = id;
        clicked = false;
      }

    }else if (clicked){
      board[oldPos[0]][oldPos[1]] = id;
      clicked = false;
    }
  }else if(clicked){
    board[oldPos[0]][oldPos[1]] = id;
    clicked = false;
  }
}

function drawBackground(){
  fill(130,130,130);
  noStroke();
  for (let a = 1; a < 8; a += 2){
    for(let b = 0; b < 8; b += 2){
      rect(TILE_SIZE * a, TILE_SIZE * b, TILE_SIZE,TILE_SIZE);
    }
  }for (let a = 0; a < 8; a += 2){
    for(let b = 1; b < 8; b += 2){
      rect(TILE_SIZE * a, TILE_SIZE * b, TILE_SIZE,TILE_SIZE);
    }
  }
  fill(50,50,50);
  rect(0,SCREEN_SIZE, SCREEN_SIZE, EXTRA_SIZE);
}
function mousePos(){
  return [int(mouseX/TILE_SIZE), int(mouseY/TILE_SIZE)];
}

function drawBoard(){
  ellipseMode(CORNER);
  for (var a = 0; a < 8; a++){
    for(var b = 0; b < 8; b++){
      if (board[a][b] === 1){
        fill(245,245,245);
        ellipse(b*TILE_SIZE + OFFSET, a*TILE_SIZE + OFFSET, PIECE_SIZE, PIECE_SIZE);
      }else if (board[a][b] === 2){
        fill(80,80,80);
        ellipse(b*TILE_SIZE + OFFSET, a*TILE_SIZE + OFFSET, PIECE_SIZE, PIECE_SIZE);
      }else if (board[a][b] == 3){
        fill(245,245,245);
        star(b*TILE_SIZE + OFFSET+ PIECE_SIZE/2, a*TILE_SIZE + PIECE_SIZE/2+ OFFSET, PIECE_SIZE/2, PIECE_SIZE/3, 5);
      }else if (board[a][b] == 4){
        fill(80,80,80);
        star(b*TILE_SIZE + OFFSET + PIECE_SIZE/2, a*TILE_SIZE + PIECE_SIZE/2+ OFFSET, PIECE_SIZE/2, PIECE_SIZE/3, 5);
      }
    }
  }
}

function validMove(oldPos, pos, id){
  console.log(id);
  let dx = pos[0] - oldPos[1];
  let dy = pos[1] - oldPos[0];
  if (id == 1 || id == 2){//--------------------------------------------------------regular tiles
    if (dx*dx == 1){
      if (playerMove == 1 && dy == 1){
        return true;
      }else if (playerMove == 2 && dy == -1){
        return true;
      }
    }else if(dx*dx == 4){
      if (playerMove == 1 && dy == 2){//-----------------------------regular tile jumps
        if (board[oldPos[0]+1][oldPos[1]+dx/2] == 2 || board[oldPos[0]+1][oldPos[1]-1] == 4){
          board[oldPos[0]+1][oldPos[1]+dx/2] = 0;
          return true;
        }
      }else if (playerMove == 2 && dy == -2){
        if (board[oldPos[0]-1][oldPos[1]+dx/2] == 1 || board[oldPos[0]-1][oldPos[1]+1] == 3){
          board[oldPos[0]-1][oldPos[1]+dx/2] = 0;
          return true;
        }
      }
    }
  }else if (id == 3 || id == 4 ){//--------------------------------------------------king tiles
    if (dx*dx == 1 && dy*dy == 1){
      return true; 
    }
    else if(dx*dx == 4 && dy*dy == 4){//----------------------------------------------king tile jumps
      if (playerMove == 1){
        if (board[oldPos[0]+dy/2][oldPos[1]+dx/2] == 2 || board[oldPos[0]+dy/2][oldPos[1]+dx/2] == 4){
          board[oldPos[0]+dy/2][oldPos[1]+dx/2] = 0;
          return true;
        }
      }else if (playerMove == 2){
        if (board[oldPos[0]+dy/2][oldPos[1]+dx/2] == 1 || board[oldPos[0]+dy/2][oldPos[1]+dx/2] == 3){
          board[oldPos[0]+dy/2][oldPos[1]+dx/2] = 0;
          return true;
        }
      }
    }
  }
  return false;
}

function star(x, y, radius1, radius2, npoints) {
  let angle = PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function promote(){
  for (let n = 0; n < 8; n++ ){
    if (board[0][n] == 2){
      board[0][n] = 4;
    }if (board[7][n] == 1){
      board[7][n] = 3;
    }
  }
}

function checkWin(){
  let p1 = false;
  let p2 = false;
  for (var a = 0; a < 8; a++){
    for(var b = 0; b < 8; b++){
      if (board[a][b] == 1 || board[a][b] == 3){
        p1 = true;
        if (p2)
        return false;
      }else if (board[a][b] == 2 || board[a][b] == 4){
        p2 = true;
        if (p1)
        return false;
      }
    }
  }
  if (p1 && p2)
    return false;
  if (p1)
  winner = 1
  if (p2)
  winner = 2
  return true;
}

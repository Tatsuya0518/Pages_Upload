const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// キャラクターの初期位置
let pacmanX = gridSize;
let pacmanY = gridSize;
const pacmanSpeed = 2;
let direction = "right";

// 敵の初期位置
let ghostX = canvasWidth - gridSize;
let ghostY = canvasHeight - gridSize;
const ghostSpeed = 1;

// マップ (0: 壁、1: 通路)
const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// 入力処理
let keysPressed = {};
document.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
});
document.addEventListener("keyup", (e) => {
  keysPressed[e.key] = false;
});

// ゲームループ
function gameLoop() {
  // 入力処理
  if (keysPressed["ArrowUp"] && direction !== "down") {
    direction = "up";
  } else if (keysPressed["ArrowDown"] && direction !== "up") {
    direction = "down";
  } else if (keysPressed["ArrowLeft"] && direction !== "right") {
    direction = "left";
  } else if (keysPressed["ArrowRight"] && direction !== "left") {
    direction = "right";
  }

  // キャラクターの移動
  switch (direction) {
    case "up":
      pacmanY -= pacmanSpeed;
      break;
    case "down":
      pacmanY += pacmanSpeed;
      break;
    case "left":
      pacmanX -= pacmanSpeed;
      break;
    case "right":
      pacmanX += pacmanSpeed;
      break;
  }

  // 壁との衝突判定 (簡略化)
  if (pacmanX < 0) pacmanX = 0;
  if (pacmanX > canvasWidth - gridSize) pacmanX = canvasWidth -
gridSize;
  if (pacmanY < 0) pacmanY = 0;
  if (pacmanY > canvasHeight - gridSize) pacmanY = canvasHeight -
gridSize;

  // 敵の移動 (簡略化)
  // TODO: AI を実装して、より賢く動かす
  ghostX -= ghostSpeed;
  if (ghostX < 0) ghostX = canvasWidth - gridSize;

  // 描画
  draw();

  // 再帰呼び出し
  requestAnimationFrame(gameLoop);
}

// 描画処理
function draw() {
  // キャンバスのクリア
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // マップの描画
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === 0) {
        ctx.fillStyle = "black";
        ctx.fillRect(col * gridSize, row * gridSize, gridSize,
gridSize);
      }
    }
  }

  // パックマンの描画
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(pacmanX + gridSize / 2, pacmanY + gridSize / 2, gridSize
/ 2, 0, 2 * Math.PI);
  ctx.fill();

  // 敵の描画
  ctx.fillStyle = "red";
  ctx.fillRect(ghostX, ghostY, gridSize, gridSize);
}

// ゲーム開始
gameLoop();
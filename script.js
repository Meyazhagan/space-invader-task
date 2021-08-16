var hero = {
  left: 575,
  top: 700,
};

var enemieStep = 1;
var missileStep = 10;
var score = 0;

var missiles = [];

let enemies = [];
for (let top = 100; top < 200; top += 75) {
  for (let left = 200; left < 1000; left += 100) {
    enemies.push({ left: left, top: top });
  }
}

document.onkeydown = function (e) {
  if (e.keyCode === 37 && hero.left >= 0) {
    hero.left = hero.left - 10;
  }
  if (e.keyCode === 39 && hero.left <= 1150) {
    hero.left = hero.left + 10;
  }
  if (e.keyCode === 32) {
    missiles.push({
      left: hero.left + 20,
      top: hero.top - 20,
    });
    drawMissiles();
  }
  drawHero();
};

function drawHero() {
  document.getElementById("hero").style.left = hero.left + "px";
  document.getElementById("hero").style.top = hero.top + "px";
}

function drawMissiles() {
  document.getElementById("missiles").innerHTML = "";
  missiles.forEach((missile) => {
    document.getElementById("missiles").innerHTML += `
            <div class="missile1" style="left:${missile.left}px; top:${missile.top}px;"></div>
            `;
  });
}

function moveMissiles() {
  missiles.forEach((missile) => {
    missile.top = missile.top - missileStep;
  });
}

function drawEnemies() {
  document.getElementById("enemies").innerHTML = "";
  enemies.forEach((enemie) => {
    document.getElementById("enemies").innerHTML += `
            <div class="enemy" style="left:${enemie.left}px; top:${enemie.top}px;"></div>
            `;
  });
}

function moveEnemies() {
  enemies.forEach((enemie) => {
    enemie.top = enemie.top + enemieStep;
  });
}

function shooting() {
  for (let enemy = 0; enemy < enemies.length; enemy++) {
    for (let missile = 0; missile < missiles.length; missile++) {
      if (
        missiles[missile].left >= enemies[enemy].left &&
        missiles[missile].top >= enemies[enemy].top &&
        missiles[missile].left <= enemies[enemy].left + 50 &&
        missiles[missile].top <= enemies[enemy].top + 50
      ) {
        enemies.splice(enemy, 1);
        missiles.splice(missile, 1);
        score += 10;
      }
    }
  }
}

function enemyChecker() {
  document.querySelector("#score").innerText = score;
  return enemies.some((data) => data.top === 645);
}
function disable() {
  document.onkeydown = function (e) {
    return false;
  };
}
let game;
function gameLoop() {
  game = setTimeout(gameLoop, 100);
  moveMissiles();
  drawMissiles();
  moveEnemies();
  drawEnemies();
  shooting();
  gameEnd();
}
gameLoop();

function gameEnd() {
  if (enemies.length === 0) {
    displayMessage("You Won");
  } else if (enemyChecker()) {
    displayMessage("You Lost");
  }
}

function displayMessage(message) {
  let container = document.getElementById("background");
  let result = document.createElement("div");
  result.setAttribute("class", "result");
  result.innerText = message;

  container.appendChild(result);

  clearTimeout(game);
  disable();
}

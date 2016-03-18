// Enemies our player must avoid
var Enemy = function () {
    this.x = (Math.round(Math.random() * 10) * 90.9);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var locAdd = (dt * this.speed) * 1.01;
    this.x += locAdd;

    //moves enemy back to the far edge of the screen and
    //re-randomizes y axis
    //Right exit
    if (this.x >= 909) {
        this.x = -101;
        this.y = this.setY(this.row);
    } else if (this.x <= -102) {
        this.x = 909;
        this.y = this.setY(this.row);
    }

    //handles player collision
    if (this.x < player.x + 75 &&
        this.x + 75 > player.x &&
        this.y < player.y + 83 &&
        this.y + 83 > player.y) {
        gameOver();
    }
};

Enemy.prototype.setY = function(row) {
    switch (row) {
        case 'top':
            return 60;
        case 'middle':
            return 143;
        case 'bottom':
            return (Math.round(Math.random()) * 83) + 226;
    }
};

var Enemy1 = function() {
    Enemy.call(this);
    this.sprite = 'images/enemy-bug.png';
    this.row = "bottom";
    this.y = (Math.round(Math.random()) * 83) + 226;
    this.speed = (Math.round(Math.random() * 20) * 10) + 50;
};
Enemy1.prototype = Object.create(Enemy.prototype);

var Enemy2 = function() {
    Enemy.call(this);
    this.sprite = 'images/enemy-bug-2.png';
    this.row = "middle";
    this.y = 143;
    this.speed = ((Math.round(Math.random() * 20) * 10) * -1) - 150;
};
Enemy2.prototype = Object.create(Enemy.prototype);

var Enemy3 = function() {
    Enemy.call(this);
    this.sprite = 'images/enemy-bug-3.png';
    this.row = "top";
    this.y = 60;
    this.speed = (Math.round(Math.random() * 20) * 10) + 150;
};
Enemy3.prototype = Object.create(Enemy.prototype);

// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    //x and y are set in the reset() below
    this.x;
    this.y;
    this.direction;
};

Player.prototype.update = function() {
    switch (this.direction) {
        case 'left':
            this.x -= 101;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            this.y += 83;
            break;
    }
    if (this.x < 0 ||
        this.x > 900 ||
        this.y > 400) {
        //out of bounds
        reset();
    } else if (this.y < 0) {
        //win!
        console.log("win");
        reset();
     }
  this.direction = null;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    this.direction = keyCode;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(),
    enemy1s = 7,
    enemy2s = 4,
    enemy3s = 5,
    en1 = new Array(enemy1s),
    en2 = new Array(enemy2s),
    en3 = new Array(enemy3s);

for (var i = 0; i < en1.length; i++) {
    en1[i] = new Enemy1();
}
for (var i = 0; i < en2.length; i++) {
    en2[i] = new Enemy2();
}
for (var i = 0; i < en3.length; i++) {
    en3[i] = new Enemy3();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function gameOver() {
    document.getElementById('game-over').style.display = 'block';
    active = false;
}

function reset() {
    document.getElementById('game-over').style.display = 'none';
    player.x = 404;
    player.y = 392;
    for (var enemy in en1) {
        en1[enemy].x = (Math.round(Math.random() * 10) * 90.9);
    }
    for (var enemy in en2) {
        en2[enemy].x = (Math.round(Math.random() * 10) * 90.9);
    }
    for (var enemy in en3) {
        en3[enemy].x = (Math.round(Math.random() * 10) * 90.9);
    }
    active = true;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = (Math.round(Math.random() * 10) * 50.5);
    this.y = (Math.round(Math.random() * 2) * 83) + 60;
    this.speed = (Math.round(Math.random() * 20) * 10) + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var locAdd = (dt * this.speed) * 1.01;
    this.x += locAdd;

    //moves enemy back to the far edge of the screen and
    //re-randomizes y axis and speed
    if (this.x >= 606) {
      this.x = -101;
      this.y = (Math.round(Math.random() * 2) * 83) + 60;
      this.speed = (Math.round(Math.random() * 20) * 10) + 100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 393;
};

Player.prototype.update = function() {
  //null
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function() {
  //null
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(),
    numEnemies = 5,
    allEnemies = new Array(numEnemies);

for (var i = 0; i < allEnemies.length; i++) {
    allEnemies[i] = new Enemy();
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

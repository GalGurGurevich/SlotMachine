var config = {
    type:Phaser.AUTO,
    width:800,
    height:600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 200}
        }
    },
    scene: [Example1, Example2],
}

var game = new Phaser.Game(config);

// load asset files for our game
gameScene.preload = function() {
    // load images
    this.load.image('background', 'assets/slotContainer.png');
  };
/*
window.onload = function() {
    var game = new Phaser.Game();
}
*/

class Example1 extends Phaser.Scene {
    constructor() {
        super({ key:"Example1" });
    }

    preload() {
        this.load.image('potion1', 'assets/potion1.png');
    }

    create() {
        this.image = this.add.image(400, 300, 'potion1');

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.input.on('pointerdown', function(event) {
            this.image.x = event.x;
            this.image.y = event.y;
        }, this);

        this.input.keyboard.on('keyup_P', function(event) {
            var physicsImage = this.physics.add.image(this.image.x, this.image.y, 'potion1');
            physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-100,100), -300);
        }, this);

        this.input.keyboard.on('keyup', function(e) {
            if(e.key == "2") {
                this.scene.start("Example2");
            }
        }, this);

    }
    
    update(delta) {
        if(this.key_A.isDown) 
            this.image.x--;
        if(this.key_D.isDown) 
            this.image.x++;
       if(this.key_W.isDown) 
            this.image.y--;
        if(this.key_S.isDown) 
            this.image.y++;    
    }

}

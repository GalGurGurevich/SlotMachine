class Loby extends Phaser.Scene {
    constructor() {
        super({ key: 'Lobby' });
    }

    preload() {
        this.load.image('potion1', 'assets/potion1.png');
        this.load.image('potion2', 'assets/potion2.png');
        this.load.image('potion3', 'assets/potion3.png');
        this.load.image('potion4', 'assets/potion4.png');
        this.load.image('potions', 'assets/potions.png');
        this.load.image('button_spin', 'assets/button_spin.png');
        this.load.image('button_stop', 'assets/button_stop.png');
        this.load.image('slotContainer', 'assets/slotContainer.png');
        this.load.audio('bg_music', ['assets/BG_Music.wav']);
        this.load.audio('spin', ['assets/Spin.wav']);
    }
    create() {

        var images = [];
        /*
        Group 1 line of potions
        var group = this.add.group({
            key: 'potions',
            frame: [ 0 ],
            frameQuantity: 1
        });
    
        Phaser.Actions.GridAlign(group.getChildren(), {
            width: 10,
            height: 10,
            cellWidth: 32,
            cellHeight: 32,
            x: 100,
            y: 100
        });
        */

        //Background Music
        this.soundFX = this.sound.add("bg_music", { loop: "true" });
        this.soundFX.play();

        //Welcome Text
        this.text = this.add.text(150, 0, "Welcome to the (slot) Machine!", {font: "5em Impact", color: "Blue"});

        var tween = this.tweens.add({
            targets: this.text,
            x:190,
            y:10,
            duration: 2000,
            ease:"Elastic",
            easeParams: [1.5, 0.5],
            delay: 1000,
            onComplete: function(src, tgt) {
                tgt[0].x = 150;
                tgt[0].y = 0;
                tgt[0].setColor("Pink");
            }
        }, this);

        var container = this.add.image(0, 0, 'slotContainer');
        var slots = this.add.image(0, 0, 'potions');
        var spinBtn = this.add.image(500, 800, 'button_spin');

        Phaser.Display.Align.In.Center(container, this.add.zone(500, 500, 1000, 1000));
        Phaser.Display.Align.In.Center(slots, container);

        spinBtn.setInteractive();

        spinBtn.on('clicked', this.clickHandler, this);

        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);
        /*
        var frames = ['potion1', 'potion2', 'potion3', 'potion4'];

        for (var i = 0; i < frames.length; ++i) 
        {
            images[i] = this.add.tileSprite(i * 150, 130, 140, 555, frames[i]);
            images[i].originX = 0;
            images[i].originY = 0;
            Phaser.Display.Align.In.Center(frames, container);
        }
        */
    }

    clickHandler(spinBtn) {
        spinBtn.setAlpha(0.5);
    }

    update(e) {

    }
}



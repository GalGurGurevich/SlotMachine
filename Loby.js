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
        this.load.image('potionsY', 'assets/potionsY.png');
        this.load.image('button_spin', 'assets/button_spin.png');
        this.load.image('button_stop', 'assets/button_stop.png');
        this.load.image('slotContainer', 'assets/slotContainer.png');
        this.load.audio('bg_music', ['assets/BG_Music.wav']);
        this.load.audio('spin', ['assets/Spin.wav']);
    }
    create() {

        this.barGroup = []
        this.graphics = this.add.graphics();

        //Background Music
        this.soundFX = this.sound.add("bg_music", { loop: "true" });
        this.soundFX.play();

        this.hitSpinBtn = false;

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
        this.spinBtn = this.add.image(500, 800, 'button_spin');

        Phaser.Display.Align.In.Center(container, this.add.zone(500, 500, 1000, 1000));

        for (var i = 0; i < 4; i++) {
            var bar = this.add.sprite(260 + i * 170, 400, "potionsY");
            this.barGroup.push(bar);
        }

        this.spinBtn.setInteractive();
        
        this.spinBtn.on('clicked', this.clickHandler, this);

        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);

        var mask = this.add.graphics()
	                    .setVisible(false)
	                    .fillStyle(0xFFFFFF)
	                    .fillRect(0, 530, 1000, 200)
                        .createGeometryMask();
                        
        this.barGroup.forEach(obj => obj.setMask(mask));

        this.spinBtn.on('clicked', this.startSpin, this);

        this.tweens.add({
            targets: this.barGroup,
            y: 900,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });

    }

    clickHandler() {
        this.disableSpinButton();
        this.spinning = true;
        this.time.delayedCall(1000, this.enableSpinButton, null, this);
      }
      disableSpinButton() {
        this.spinBtn.setAlpha(0.5);
        this.spinBtn.inputEnabled = false;
        this.spinBtn.setAlpha(0.5);
      }
      enableSpinButton() {
        this.spinBtn.setAlpha(1);
        this.spinBtn.inputEnabled = true;
      }

    startSpin() {
            var tween = this.tweens.add({
                targets: this.barGroup,
                y:500,
                duration: 3000,
                ease:"Elastic",
                easeParams: [1.5, 0.5],
                delay: 100,
                onComplete: function(src, tgt) {
                    tgt[0].y = Phaser.Math.RND.integerInRange(500,1600);
                    }
                }, this); 
    }

    setStop() {
       
    }

    spin() {

    }

    finalSpin() {
    
    }

    checkFinished() {

    }

    update(e) {
        if(this.spinning == true) {
            
        }
    }
}



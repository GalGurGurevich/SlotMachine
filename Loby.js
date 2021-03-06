class Loby extends Phaser.Scene {
    constructor() {
        super({ key: 'Lobby' });
    }

    preload() {
        this.load.image('potion1', 'assets/potion1.png');
        this.load.image('potion2', 'assets/potion2.png');
        this.load.image('potion3', 'assets/potion3.png');
        this.load.image('potion4', 'assets/potion4.png');
        this.load.image('potions', 'assets/potionsY.png');
        this.load.image('button_spin', 'assets/button_spin.png');
        this.load.image('button_stop', 'assets/button_stop.png');
        this.load.image('slotContainer', 'assets/slotContainer.png');
        this.load.audio('bg_music', ['assets/BG_Music.wav']);
        this.load.audio('spin', ['assets/Spin.wav']);
    }
    create() {

        this.barGroup = [];
        this.graphics = this.add.graphics();

        //Background Music
        this.soundFX = this.sound.add("bg_music", { loop: "true" });
        this.spinSoundFx = this.sound.add("spin", {loop: "false"}); 
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

        //set container, img as buttons
        var container = this.add.image(0, 0, 'slotContainer');
        this.spinBtn = this.add.image(600, 800, 'button_spin');
        this.stopBtn = this.add.image(430, 800, 'button_stop');
        this.stopBtn.setVisible(false);

        //center container
        Phaser.Display.Align.In.Center(container, this.add.zone(500, 500, 1000, 1000));

        //add potions as group and position them
        for (var i = 0; i < 4; i++) {
            var bar = this.add.sprite(260 + i * 170, 400, "potions");
            this.barGroup.push(bar);
        }

        this.spinBtn.setInteractive();
        
        this.spinBtn.on('clicked', this.clickHandler, this);

        //enable click events on objects
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);

        //hide part of potions to fit content of container
        var mask = this.add.graphics()
	                    .setVisible(false)
	                    .fillStyle(0xFFFFFF)
	                    .fillRect(100, 330, 1000, 400)
                        .createGeometryMask();
                        
        this.barGroup.forEach(obj => obj.setMask(mask));

        this.spinBtn.on('clicked', this.startSpin, this);

        this.tweens.add({
            targets: this.barGroup,
            y: 550,
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
        this.stopBtn.setVisible(true);
        this.spinSoundFx.play();
      }
      disableSpinButton() {
        this.spinBtn.setAlpha(0.5);
        this.spinBtn.inputEnabled = false;
        this.spinBtn.setAlpha(0.5);
      }
      enableSpinButton() {
        this.spinBtn.setAlpha(1);
        this.spinBtn.inputEnabled = true;
        this.stopBtn.setVisible(false);
        this.spinSoundFx.stop();
      }

    startSpin() {
            for(let i = 0; i < this.barGroup.length; i++) {
                this.tweens.add({
                    targets: this.barGroup[i],
                    y: 750,
                    x: 270 + (170 * i),
                    duration: 100,
                    ease: "Bounce.easeIn",
                    yoyo: true,
                    loop: 10
                });
            }
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



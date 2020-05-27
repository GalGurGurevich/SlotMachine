class Example3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Example3' });
    }

    preload() {
        this.load.audio('BG_Music', ['assets/BG_Music.wav']);
    }

    create() {
        this.soundFX = this.sound.add('BG_Music', { loop: 'true' });
        this.soundFX.play();
    }
}

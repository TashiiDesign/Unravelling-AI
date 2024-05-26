import { getCenterX, getCenterY } from '../utils.js';

class GameStart extends Phaser.Scene {
    constructor() {
        super({ key: 'GameStart' });
    }

    preload() {
        this.load.image('background', './src/assets/static/start_scene.jpg');
        this.load.image('start-btn', './src/assets/graphics/ui/buttons/startgame_button.png');
        this.load.image('start-btn-hover', './src/assets/graphics/ui/buttons/startgame_button_hover.png');
    }
        
    

    create() {
        // Add the background image centered on the screen
        this.add.image(getCenterX(this.game), getCenterY(this.game), 'background');
      
        // Add the start button centered horizontally and slightly below the center vertically
        const startBtn = this.add.image(getCenterX(this.game), getCenterY(this.game) + 180, 'start-btn').setInteractive();

        // Add text "WHISPERS OF REBELLION" and "UNRAVELLING AI CONTROL"
        this.add.text(getCenterX(this.game), getCenterY(this.game) +10, 'WHISPERS OF REBELLION', { font: '48px Orbitron', fill: '#00bfff' }).setOrigin(0.5);
        this.add.text(getCenterX(this.game), getCenterY(this.game) + 60, 'UNRAVELLING AI CONTROL', { font: '24px Orbitron', fill: '#ffffff' }).setOrigin(0.5);

        // Add 'Enter' text inside the start button
        this.add.text(getCenterX(this.game), getCenterY(this.game) + 180, 'ENTER', { font: '24px Orbitron', fill: '#ffffff' }).setOrigin(0.5);

       
     

        // Handle the pointerover and pointerout events to change the button texture
        startBtn.on('pointerover', () => {
            startBtn.setTexture('start-btn-hover');
        });

        startBtn.on('pointerout', () => {
            startBtn.setTexture('start-btn');
        });

           // Handle the pointerdown event for the start button to switch to the HomeScene
           startBtn.on('pointerdown', () => {
            this.scene.start('HomeScene');
        });
    }
};
export default GameStart;
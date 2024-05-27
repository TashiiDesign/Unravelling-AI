//import { PuzzleBase } from '../PuzzleBase.js';
import { getCenterX, getCenterY } from './../../../utils.js';

export class LockBox extends Phaser.Scene {
    constructor() {
        super({ key: 'LockboxPuzzle' }, 'lockbox');
    }

    lockboxGraphics = [
        '012', '123', '234', '345', '456', '567', '678', '789', '890', '901',
    ];
    
    lockboxBgGraphics = [
        'lockboxCorrect', 'lockboxIncorrect', 'lockboxOpen', "lockbox"
    ];

    positions = [
        { x: 739.7, y: 342.3 },
        { x: 739.7, y: 393 },
        { x: 739.7, y: 444.3 },
        { x: 739.7, y: 493.3 },
    ];

    bgPositions = [
        { x: 1920, y: 1080 },  // Example positions for background graphics
        { x: 1920, y: 1080 },
        { x: 1920, y: 1080 },
    ];

    preload() {
      
        this.lockboxGraphics.forEach(value => {
            this.load.image(value, `assets/graphics/scenes/home/graphics/${value}.png`);
        });

        this.lockboxBgGraphics.forEach(value => {
            this.load.image(value, `assets/graphics/static/${value}.jpg`);
        });
    }

    create() {
        // Create the background image for the lockbox puzzle
        const lockboxBg = this.add.image(getCenterX(this.game), getCenterY(this.game), 'lockbox');
        lockboxBg.setOrigin(0.5, 0.5);

        // Create lockbox graphics and set visibility to false
        this.lockboxGraphics.forEach((value, index) => {
            const position = this.positions[index];
            if (position) {
                this.add.image(position.x, position.y, value).setVisible(false);
            }
        });

        // // Create lockbox background graphics and set visibility to false
        // this.lockboxBgGraphics.forEach((value, index) => {
        //     const position = this.bgPositions[index];
        //     if (position) {
        //         this.add.image(position.x, position.y, value).setVisible(false);
        //     }
        // });
    }
}

export default LockBox;

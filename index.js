import GameStart from './src/js/scenes/GameStart.js';
import HomeScene from './src/js/scenes/HomeScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: [GameStart, HomeScene],
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);

// window.addEventListener('resize', () => {
//     game.scale.resize(window.innerWidth, window.innerHeight);
// });

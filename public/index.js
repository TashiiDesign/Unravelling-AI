import GameStart from './src/js/scenes/GameStart.js';
import DialogueScene from './src/js/scenes/DialogueScene.js';
import HomeScene from './src/js/scenes/HomeScene/HomeScene.js';
import LockboxPuzzle from './src/js/scenes/HomeScene/Puzzles/LockboxPuzzle.js';


const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: [GameStart, DialogueScene, HomeScene, LockboxPuzzle, ],
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

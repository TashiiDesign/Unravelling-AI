import DialogueManagement from '../../ui/DialogueManagement.js';
import Button from '../../ui/Button.js';
import Popup from '../../ui/Popup.js';
import { getCenterX, getCenterY } from '../../utils.js';

class HomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HomeScene' });
        this.luminaTalking = false; // Initial state
        this.initialDialogueEnded = false; // Track if initial dialogue has ended
    }

    preload() {
        this.load.image('home_scene_fade_popup', `src/assets/static/home_scene_fade_popup.jpg`);
        this.load.image('home_scene', `src/assets/static/home_scene.jpg`);
        this.load.image('lockbox', `src/assets/static/lockbox.jpg`);
        this.load.image('lumina', `src/assets/graphics/ui/lumina.png`);
        this.load.image('timer_frame', `src/assets/graphics/ui/timer_frame_mobile_laptop.png`);

        const assets = [
            'postcard_small', 'postcard', 'postcard_small_hover', 'poem_small_hover', 
            'lockbox_small_hover', 'laptop_small_hover', 'poem_small', 'poem', 
            'lockbox_small', 'laptop_small',
        ];

        assets.forEach(asset => {
            this.load.image(asset, `src/assets/graphics/scenes/home/graphics/${asset}.png`);
        });

        this.load.json('dialogue', './src/assets/data/dialogue.json');
        this.luminaTalking = !this.luminaTalking;
    }

    create() {
        const background = this.add.image(getCenterX(this.game), getCenterY(this.game), 'home_scene');
        background.setOrigin(0.5, 0.5);

        this.popup = new Popup(this);

        const poem_small = this.add.image(1362, 334.93, 'poem_small').setInteractive().setOrigin(0);
        const postcard_small = this.add.image(897, 402.93, 'postcard_small').setInteractive().setOrigin(0);
        const laptop_small = this.add.image(837, 529, 'laptop_small').setInteractive().setOrigin(0);
        const lockbox_small = this.add.image(1519, 782.93, 'lockbox_small').setInteractive().setOrigin(0);

        const interactiveElements = [
            { element: poem_small, texture: 'poem_small', hoverTexture: 'poem_small_hover' },
            { element: postcard_small, texture: 'postcard_small', hoverTexture: 'postcard_small_hover' },
            { element: laptop_small, texture: 'laptop_small', hoverTexture: 'laptop_small_hover' },
            { element: lockbox_small, texture: 'lockbox_small', hoverTexture: 'lockbox_small_hover' },
        ];

        interactiveElements.forEach(({ element, texture, hoverTexture }) => {
            element.setOrigin(0.5);
            element.on('pointerover', () => element.setTexture(hoverTexture));
            element.on('pointerout', () => element.setTexture(texture));
        });

        poem_small.on('pointerdown', () => this.startDialogue('Home', 'Lumina'));
        postcard_small.on('pointerdown', () => this.startDialogue('Home', 'Commander'));
        lockbox_small.on('pointerdown', () => this.scene.launch('LockboxPuzzle'));

        const timerFrame = this.add.image(-0.5, -0.07, 'timer_frame').setOrigin(0);
        this.add.text(170, 60, 'TIME UNTIL NETWORK', { font: '18px Orbitron', fill: '#ff9900' }).setOrigin(0.5, 0.5);
        this.add.text(160, 90, 'UNRECOVERABLE:', { font: '18px Orbitron', fill: '#ff9900' }).setOrigin(0.5, 0.5);
        this.add.text(190, 130, '60:00', { font: '32px Orbitron', fill: '#ffffff' }).setOrigin(0.5, 0.5);

        this.luminaButton = new Button(this, 42.18, 826.07, 'lumina_button', 'lumina_button_hover', () => {
            this.toggleLuminaTalking(true);
        });

        this.add.image(-1, 300, 'lumina').setVisible(false).setOrigin(0);
        
        this.time.delayedCall(2000, () => {
            this.scene.launch('DialogueScene', { 
                dialogueData: this.cache.json.get('dialogue'), 
                x: 100, 
                y: 100 
            });
        });
    
    }

    update() {
        // Your update logic
    }

    handleInteraction(x, y, texture, hoverTexture, popupGraphic) {
        const element = this.add.image(x, y, texture).setInteractive();

        element.on('pointerover', () => element.setTexture(hoverTexture));
        element.on('pointerout', () => element.setTexture(texture));
        element.on('pointerdown', () => this.popup.showPopup(popupGraphic));
    }

    disableInteractions() {
        this.children.list.forEach(child => {
            if (child.input && child.texture.key !== 'dialogue_continue') {
                child.disableInteractive();
            }
        });
    }
}

export default HomeScene;
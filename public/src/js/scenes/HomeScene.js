import AddDialogue from '../ui/AddDialogue.js';
import Popup from '../ui/Popup.js';
import { getCenterX, getCenterY } from '../utils.js';

class HomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HomeScene' });
        this.luminaTalking = false; // Initial state
        this.initialDialogueEnded = false; // Track if initial dialogue has ended
        this.lockboxGraphics = [
            '012', '123', '234', '345', '456', '567', '678', '789', '890', '901',
        ];


        this.positions = [
            {x:739.7, y: 342.3},
            {x: 739.7, y: 393},
            {x: 739.7, y: 444.3},
            {x: 739.7, y: 493.3},
        ];
       
    }

    preload() {
        this.load.image('home_scene', './src/assets/static/home_scene.jpg');
        this.load.image('home_scene_fade_popup', './src/assets/static/home_scene_fade_popup.jpg');
        this.load.image('lumina_button', './src/assets/graphics/ui/buttons/lumina_button.png');
        this.load.image('lumina_button_hover', './src/assets/graphics/ui/buttons/lumina_button_hover.png');
        this.load.image('postcard_small', './src/assets/graphics/scenes/home/graphics/postcard_small.png');
        this.load.image('postcard', './src/assets/graphics/scenes/home/graphics/postcard.png');
        this.load.image('postcard_small_hover', './src/assets/graphics/scenes/home/graphics/postcard_small_hover.png');
        this.load.image('poem_small_hover', './src/assets/graphics/scenes/home/graphics/poem_small_hover.png');
        this.load.image('lockbox_small_hover', './src/assets/graphics/scenes/home/graphics/lockbox_small_hover.png');
        this.load.image('laptop_small_hover', './src/assets/graphics/scenes/home/graphics/laptop_small_hover.png');
        this.load.image('poem_small', './src/assets/graphics/scenes/home/graphics/poem_small.png');
        this.load.image('poem', './src/assets/graphics/scenes/home/graphics/poem.png');
        this.load.image('lockbox_small', './src/assets/graphics/scenes/home/graphics/lockbox_small.png');
       this.load.image('lockbox', './src/assets/static/lockbox.jpg');
        this.load.image('laptop_small', './src/assets/graphics/scenes/home/graphics/laptop_small.png');
      //  this.load.image('laptop', './src/assets/graphics/scenes/home/graphics/laptop.png');
        this.load.image('timer_frame', './src/assets/graphics/ui/timer_frame_mobile_laptop.png');
        this.load.image('dialogue_box', './src/assets/graphics/ui/dialogue_box.png');
        this.load.image('close_button', './src/assets/graphics/ui/buttons/popup_close.png');
        this.load.image('close_button_hover', './src/assets/graphics/ui/buttons/popup_close_hover.png');
        this.load.image('dialogue_continue', './src/assets/graphics/ui/buttons/dialogue_continue.png');
        this.load.image('dialogue_continue_hover', './src/assets/graphics/ui/buttons/dialogue_continue_hover.png');
        this.load.image('lumina', './src/assets/graphics/ui/lumina.png');
        this.load.json('dialogue', './src/assets/data/dialogue.json');
              this.load.image('lockboxCorrect', 'assets/static/lockbox_correct.jpg');
        this.load.image('lockboxIncorrect', 'assets/static/lockbox_incorrect.jpg');
        this.load.image('lockboxOpen', 'assets/static/lockbox_open.jpg');

        this.lockboxGraphics.forEach((value, i) => { 
            this.load.image(value, `assets/graphics/scenes/home/graphics/${value}.png`);
        });
       

        
    }

    create() {
        try {
            // Add the background image centered on the screen
            const background = this.add.image(getCenterX(this.game), getCenterY(this.game), 'home_scene');
            background.setOrigin(0.5, 0.5);

            // Add the timer frame to the top left
            const timerFrame = this.add.image(-0.5, -0.07, 'timer_frame').setOrigin(0);
            this.lockboxGraphics.forEach((value) => { 
                this.add.image(value.x, value.y, value).setVisible(false);
            });
            // Add the timer text with correct styling
            this.add.text(170, 60, 'TIME UNTIL NETWORK', { font: '18px Orbitron', fill: '#ff9900' }).setOrigin(0.5, 0.5);
            this.add.text(160, 90, 'UNRECOVERABLE:', { font: '18px Orbitron', fill: '#ff9900' }).setOrigin(0.5, 0.5);
            this.add.text(190, 130, '60:00', { font: '32px Orbitron', fill: '#ffffff' }).setOrigin(0.5, 0.5);

            // Function to add an interactive image with hover effect and click action
            const addInteractiveImage = (x, y, key, hoverKey, onClick) => {
                const image = this.add.image(x, y, key).setOrigin(0).setInteractive();
                image.on('pointerover', () => {
                    image.setTexture(hoverKey);
                });
                image.on('pointerout', () => {
                    image.setTexture(key);
                });
                image.on('pointerdown', onClick);
            };

            // Add interactive images
            this.luminaButton = this.add.image(42.18, 826.07, 'lumina_button').setOrigin(0).setInteractive();
            this.luminaButton.on('pointerdown', () => {
                this.toggleLuminaTalking(true);
            });
            this.luminaButton.setVisible(false); // Make Lumina button invisible initially

            addInteractiveImage(897, 402.93, 'postcard_small', 'postcard_small_hover', () => this.popup.showPopup('postcard'));
            addInteractiveImage(1362, 334.93, 'poem_small', 'poem_small_hover', () => this.popup.showPopup('poem'));
            addInteractiveImage(1519, 782.93, 'lockbox_small', 'lockbox_small_hover', () => this.popup.showPopup('lockbox'));
            addInteractiveImage(837, 529, 'laptop_small', 'laptop_small_hover', () => this.popup.showPopup('laptop'));

            // Create Lumina graphic
            this.lumina = this.add.image(-1, 729.93, 'lumina');
            this.lumina.setOrigin(0);
            this.lumina.setVisible(false);

            // Create dialogue box
            this.addDialogue = new AddDialogue(this, 299, 707.93, 1069.6, 371.7);
            const dialogueData = this.cache.json.get('dialogue');
            this.addDialogue.setDialogue(dialogueData.initialDialogue);

            // Create popup handler
            this.popup = new Popup(this);

            // Initial state
            this.toggleLuminaTalking(true);
        } catch (error) {
            console.error('Error in HomeScene create:', error);
        }
    }

    toggleLuminaTalking() {
        this.luminaTalking = !this.luminaTalking;
    
        if (this.luminaTalking) {
            this.disableInteractions();
            this.lumina.setVisible(true);
            if (this.initialDialogueEnded) {
                const assistanceDialogue = this.cache.json.get('dialogue').assistanceDialogue;
                this.addDialogue.setDialogue(assistanceDialogue);
            } else {
                this.addDialogue.show();
            }
            this.luminaButton.setVisible(false);
        } else {
            this.lumina.setVisible(false);
            this.addDialogue.hide();
            this.luminaButton.setVisible(true);
            this.enableInteractions();
            this.luminaButton.setInteractive(); // Ensure Lumina button is interactive
        }
    }
    disableInteractions() {
        this.children.list.forEach(child => {
            if (child.input && child.texture.key !== 'dialogue_continue') {
                child.disableInteractive();
            }
        });
    }

    enableInteractions() {
        this.children.list.forEach(child => {
            if (child.input && child.texture.key !== 'dialogue_continue') {
                child.setInteractive();
            }
        });
    }

    endInitialDialogue() {
        this.initialDialogueEnded = true;
        this.toggleLuminaTalking(false);
        this.luminaButton.setVisible(true); // Show the Lumina button after initial dialogue ends
    }
}

export default HomeScene;

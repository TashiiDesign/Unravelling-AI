import Button from './Button.js';
import { getCenterX, getCenterY} from './../utils.js';

class DialogueManagement {
    constructor(scene, x, y) {
        this.scene = scene;
        this.dialogueBox = this.scene.add.image(x, y, 'dialogue_box').setOrigin(0);
        this.dialogueText = this.scene.add.text(x + 20, y + 20, '', {
            font: '18px Orbitron',
            fill: '#ffffff',
            wordWrap: { width: 800 }
        }).setOrigin(0);

        this.currentDialogue = null;
        this.currentLine = 0;

        this.closeButton = new Button(this.scene, x + 600, y, 'close_button', 'close_button_hover', () => {
            this.hide();
        });

        this.continueButton = new Button(this.scene, x + 700, y + 400, 'dialogue_continue', 'dialogue_continue_hover', () => {
            this.showNextDialogue();
        });

        console.log(`Creating DialogueManagement at (${x}, ${y})`); // Add this line
    }

    setDialogue(dialogue) {
        this.dialogue = dialogue;
        this.currentIndex = 0;
        this.show();
    }

    show() {
        this.dialogueBox.setVisible(true);
        this.dialogueText.setVisible(true);
        this.closeButton.show();
        this.continueButton.show();
        this.isVisible = true;
        this.showNextDialogue();
    }

    hide() {
        this.dialogueBox.setVisible(false);
        this.dialogueText.setVisible(false);
        this.closeButton.hide();
        this.continueButton.hide();
        this.isVisible = false;

        this.scene.scene.stop('DialogueScene');
    }

    showNextDialogue() {
        if (this.currentIndex < this.dialogue.length) {
            this.dialogueText.setText('');
            this.typewriteText(this.dialogue[this.currentIndex]);
            this.currentIndex++;
        } else {
            this.hide();
            if (this.scene.endInitialDialogue) {
                this.scene.endInitialDialogue(); // Call endInitialDialogue if defined in the scene
            }
        }
    }

    typewriteText(text) {
        const length = text.length;
        let i = 0;
        this.scene.time.addEvent({
            callback: () => {
                this.dialogueText.setText(text.substr(0, i));
                i++;
            },
            repeat: length - 1,
            delay: 20
        });
    }

    endDialogue() {
        this.dialogueBox.setVisible(false);
        this.dialogueText.setVisible(false);
    }
}

export default DialogueManagement;

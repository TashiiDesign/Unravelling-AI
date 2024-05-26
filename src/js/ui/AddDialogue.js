class AddDialogue {
    constructor(scene, x, y, width, height) {
        this.scene = scene;
        this.dialogueBox = this.scene.add.image(x, y, 'dialogue_box').setOrigin(0);
        this.dialogueBox.displayWidth = width;
        this.dialogueBox.displayHeight = height;

        this.text = this.scene.add.text(382 + 20, 824 + 20, '', { font: '18px Orbitron', fill: '#ffffff', wordWrap: { width: width - 40 } }).setOrigin(0, 0);

        this.closeButton = this.scene.add.image(x + width - 20, y + 20, 'close_button').setInteractive().setOrigin(0.5);
        this.closeButton.on('pointerover', () => {
            this.closeButton.setTexture('close_button_hover');
        });
        this.closeButton.on('pointerout', () => {
            this.closeButton.setTexture('close_button');
        });
        this.closeButton.on('pointerdown', () => {
            this.hide();
        });

        this.continueButton = this.scene.add.image(1270, 980, 'dialogue_continue').setInteractive().setOrigin(0.5);
        this.continueButton.on('pointerover', () => {
            this.continueButton.setTexture('dialogue_continue_hover');
        });
        this.continueButton.on('pointerout', () => {
            this.continueButton.setTexture('dialogue_continue');
        });
        this.continueButton.on('pointerdown', () => {
            this.showNextDialogue();
        });

        this.dialogue = [];
        this.currentIndex = 0;
        this.isVisible = false;
    }

    setDialogue(dialogue) {
        this.dialogue = dialogue;
        this.currentIndex = 0;
        this.show();
    }

    show() {
        this.dialogueBox.setVisible(true);
        this.text.setVisible(true);
        this.closeButton.setVisible(true);
        this.continueButton.setVisible(true);
        this.isVisible = true;
        this.showNextDialogue();
    }

    hide() {
        this.dialogueBox.setVisible(false);
        this.text.setVisible(false);
        this.closeButton.setVisible(false);
        this.continueButton.setVisible(false);
        this.isVisible = false;

        // Hide Lumina graphic and show Lumina button after dialogue ends
        if (this.scene.lumina) {
            this.scene.lumina.setVisible(false);
        }
        if (this.scene.luminaButton) {
            this.scene.luminaButton.setVisible(true);
        }
    }

    showNextDialogue() {
        if (this.currentIndex < this.dialogue.length) {
            this.text.setText('');
            this.typewriteText(this.dialogue[this.currentIndex]);
            this.currentIndex++;
        } else {
            this.hide();
            if (!this.scene.initialDialogueEnded) {
                this.scene.endInitialDialogue(); // End initial dialogue
            }
        }
    }

    typewriteText(text) {
        const length = text.length;
        let i = 0;
        this.scene.time.addEvent({
            callback: () => {
                this.text.setText(text.substr(0, i));
                i++;
            },
            repeat: length - 1,
            delay: 50
        });
    }
}

export default AddDialogue;

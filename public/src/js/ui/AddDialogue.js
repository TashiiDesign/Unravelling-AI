class AddDialogue {
    constructor(scene, x, y, width, height) {
        this.scene = scene;
        this.dialogueBox = this.scene.add.image(x, y, 'dialogue_box').setOrigin(0);
        this.dialogueBox.displayWidth = width;
        this.dialogueBox.displayHeight = height;

        this.text = this.scene.add.text(382 + 20, 824 + 20, '', { font: '18px Orbitron', fill: '#ffffff', wordWrap: { width: width - 40 } }).setOrigin(0, 0);



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

}

export default AddDialogue;

class Popup {
    constructor(scene) {
        this.scene = scene;

        // Create background for popup
        this.fadeBackground = this.scene.add.image(0, 0, 'home_scene_fade_popup').setOrigin(0).setVisible(false);

        // Create popup graphic
        this.popupGraphic = this.scene.add.image(0, 0, '').setOrigin(0).setVisible(false);

        // Create close button
        this.closeButton = this.scene.add.image(this.scene.game.config.width - 50, 50, 'close_button').setInteractive().setOrigin(0.5);
        this.closeButton.on('pointerover', () => {
            this.closeButton.setTexture('close_button_hover');
        });
        this.closeButton.on('pointerout', () => {
            this.closeButton.setTexture('close_button');
        });
        this.closeButton.on('pointerdown', () => {
            this.hidePopup();
        });
        this.closeButton.setVisible(false);
    }

    showPopup(graphicKey) {
        this.fadeBackground.setVisible(true);
        this.popupGraphic.setTexture(graphicKey).setVisible(true);
        this.closeButton.setVisible(true);

        // Hide all interactive elements
        this.scene.children.list.forEach(child => {
            if (child.input && child !== this.closeButton) {
                child.disableInteractive();
                child.setVisible(false);
            }
        });
    }

    hidePopup() {
        this.fadeBackground.setVisible(false);
        this.popupGraphic.setVisible(false);
        this.closeButton.setVisible(false);

        // Show all interactive elements
        this.scene.children.list.forEach(child => {
            if (child.input && child !== this.closeButton) {
                child.setInteractive();
                child.setVisible(true);
            }
        });
    }
}

export default Popup;

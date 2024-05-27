import Button from './Button.js';

class Popup {
    constructor(scene) {
        this.scene = scene;

        // Create background for popup
        this.fadeBackground = this.scene.add.image(0, 0, 'home_scene_fade_popup').setOrigin(0).setVisible(false);

        // Create popup graphic
        this.popupGraphic = this.scene.add.image(0, 0, '').setOrigin(0).setVisible(false);

        // Create close button
        this.closeButton = new Button(this.scene, this.scene.game.config.width - 50, 50, 'close_button', 'close_button_hover', () => this.hidePopup());
    }

    showPopup(graphicKey) {
        this.fadeBackground.setVisible(true);
        this.popupGraphic.setTexture(graphicKey).setVisible(true);
        this.closeButton.show();

        // Hide all interactive elements
        this.scene.children.list.forEach(child => {
            if (child.input && child !== this.closeButton.button) {
                child.disableInteractive();
                child.setVisible(false);
            }
        });
    }

    hidePopup() {
        this.fadeBackground.setVisible(false);
        this.popupGraphic.setVisible(false);
        this.closeButton.hide();

        // Show all interactive elements
        this.scene.children.list.forEach(child => {
            if (child.input && child !== this.closeButton.button) {
                child.setInteractive();
                child.setVisible(true);
            }
        });
    }
}

export default Popup;
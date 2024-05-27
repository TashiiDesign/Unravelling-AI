class Button {
    constructor(scene, x, y, texture, hoverTexture, clickCallback) 

    
    {
        
        this.button = scene.add.image(x, y, texture).setInteractive().setOrigin(0.5);
        this.hoverTexture = hoverTexture;
        this.normalTexture = texture;
        this.button.on('pointerover', () => {
            this.button.setTexture(this.hoverTexture);
        });
        this.button.on('pointerout', () => {
            this.button.setTexture(this.normalTexture);
        });
        this.button.on('pointerdown', clickCallback);
        this.button.setVisible(false);
    }

    show() {
        this.button.setVisible(true);
    }

    hide() {
        this.button.setVisible(false);
    }
}

export default Button;
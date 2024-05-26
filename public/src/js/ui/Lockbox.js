import Popup from './Popup.js'

class Lockbox extends Popup {
    constructor(scene) {
        super(scene);
        this.clickCounter = 0;
        this.correctCode = [1, 2, 3, 4]; // Replace with your correct code
        this.codeFound = false;

        
    }

    showPopup() {
        this.fadeBackground.setVisible(true);
        this.lockbox = this.popupGraphic.setTexture('lockbox').setVisible(true);
        this.closeButton.setVisible(true);
        // Display numbers

        // Hide all interactive elements
        this.scene.children.list.forEach(child => {
            if (child.input && child !== this.closeButton) {
                child.disableInteractive();
            }
        });

        // Make the lockbox graphic fullscreen
        this.lockbox.setOrigin(0.5);
        this.lockbox.setDisplaySize(1920, 1080).
  

        // Hide all interactive elements
        this.scene.children.list.forEach(child => {
            if (child.input && child !== this.closeButton) {
                child.disableInteractive();
            }
        });
        
    }




    

    // handleClick(number) {
    //     this.clickCounter++;
    //     if (this.clickCounter === this.correctCode.length && number === this.correctCode[this.clickCounter - 1]) {
    //         this.codeFound = true;
    //         console.log('Correct code found!');
    //     }
    // }
}
export default Lockbox
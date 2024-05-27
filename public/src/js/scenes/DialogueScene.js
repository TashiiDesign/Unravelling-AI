import DialogueManagement from './../ui/DialogueManagement.js';
import { getCenterX, getCenterY } from './../utils.js';

class DialogueScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DialogueScene' });
        this.dialogueBox = null;
    }

    preload() {
        
        this.dialogueBox = this.load.image('dialogue_box', 'src/assets/graphics/ui/dialogue_box.png'); // Correct path
       
        this.load.json('dialogue', 'src/assets/datadialogue.json');
    }
    
    create() {
        this.dialogueManagement = new DialogueManagement(this, this.x, this.y);
        let dialogueData = this.cache.json.get('dialogue');
        this.dialogueData = dialogueData;

        // Create a new DialogueManagement instance

        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
       
        // this.dialogueBox = this.add.image(1000, 2333, 'dialogue_box')

       this.dialogueBox =  new DialogueManagement(this, centerX, centerY);

        // Get the dialogues for Lumina in the Home scene
        let luminaDialogues = this.getDialogue('Home', 'Lumina', dialogueData);
        // Start the dialogue
        this.dialogueBox.setDialogue(luminaDialogues);
        // Show the dialogue box
        this.dialogueBox.show();
  
        this.dialogueBox.isVisible = true;
        console.log(this.dialogueBox.currentDialogue)
    }

    update() {
      
    }

    getDialogue(sceneName, characterName) {
        if (!this.dialogueData || typeof this.dialogueData !== 'object') {
            console.error('dialogueData is not an object');
            return {};
        }
        const sceneDialogues = this.dialogueData[sceneName];
        if (!sceneDialogues || typeof sceneDialogues !== 'object') {
            console.error(`No dialogues found for scene "${sceneName}"`);
            return {};
        }
        const characterDialogues = sceneDialogues[characterName];
        if (!characterDialogues || typeof characterDialogues !== 'object') {
            console.error(`No dialogues found for character "${characterName}" in scene "${sceneName}"`);
            return {};
        }
        console.log(this.dialogueBox.currentDialogue, this.dialogueData)
        return characterDialogues;
    }
}

export default DialogueScene;
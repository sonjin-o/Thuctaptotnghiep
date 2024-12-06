import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {

    @property({
        type: Label,
        tooltip: 'Current Score'
    })
    public scoreLabel: Label; 
 
    @property({
        type: Label,
        tooltip: 'High Score'
    })
    public highScore: Label; 
 
    @property({
        type: Label,
        tooltip: 'Try Again?'
    })
    public resultEnd: Label; 

    //variables needed for the scores
    maxScore: number = 0; //saved high score
    currentScore: number; // current score while playing

    //change current score to new score or back to zero then display the new score
    updateScore(num:number){

        //update the score to the new number on the screen
        this.currentScore = num;
 
        //display new score
        this.scoreLabel.string = ('' + this.currentScore);

    }

    
    //resets the score back to 0 and hides game over information
    resetScore(){
    
        //reset score to 0
        this.updateScore(0);
        
        //hide high score and try again request
        this.hideResult();

        //reset current score label
        this.scoreLabel.string = ('' + this.currentScore);

    }

    //add a point to the score
    addScore(){

        //add a point to the score
        this.updateScore(this.currentScore + 1);
    
    }

    //show the score results when the game ends.
    showResult(){
    
        //check if it's the high score
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        
        //activate high score label
        this.highScore.string = 'High Score is:' + this.maxScore;
        this.highScore.node.active = true;

        //activate try again label
        this.resultEnd.node.active = true;
        
    }

    //hide results and request for a new game when the new game starts
    hideResult(){

        //hide the high score and try again label.
        this.highScore.node.active = false;
        this.resultEnd.node.active = false;

    }

}



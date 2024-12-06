import { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;

//make a random number generator for the gap
const random = (min,max) => {
    return Math.random() * (max - min) + min
}

@ccclass('Pipes')
export class Pipes extends Component {
 
    @property({
        type: Node,
        tooltip: 'Top Pipe'
     })
     public topPipe: Node;
    
     @property({
        type: Node,
        tooltip: 'Bottom Pipe'
     })
     public bottomPipe: Node;

    //temporary Locations
    public tempStartLocationUp:Vec3 = new Vec3(0,0,0);  //Temporary location of the up pipe
    public tempStartLocationDown:Vec3 = new Vec3(0,0,0); //Temporary location of the bottom pipe
    public scene = screen.windowSize; //get the size of the screen in case we decide to change the content size

    //get the pipe speeds
    public game; //get the pipe speed from GameCtrl
    public pipeSpeed:number; //use as a final speed number
    public tempSpeed:number; //use as the moving pipe speed

    //scoring mechanism
    isPass: boolean; //Did the pipe pass the bird?

    //what to do when the pipes load
    onLoad (){
        
        //find GameCtrl so we can use the methods
        this.game = find("GameCtrl").getComponent("GameCtrl")

        //add pipespeed to temporary method
        this.pipeSpeed = this.game.pipeSpeed;
        
        //set the original position
        this.initPos();
        
        //set the scoring mechanism to stop activating
        this.isPass = false; 

    }

    //initial positions of the grounds
    initPos() {

        //start with the initial position of x for both pipes
        this.tempStartLocationUp.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);
        this.tempStartLocationDown.x = (this.bottomPipe.getComponent(UITransform).width + this.scene.width);

        //random variables for the gaps
        let gap = random(90,100);  //passable area randomized
        let topHeight = random(0,450);   //The height of the top pipe

        //set the top pipe initial position of y 
        this.tempStartLocationUp.y = topHeight;

        //set the bottom pipe initial position of y
        this.tempStartLocationDown.y = (topHeight - (gap * 10));
        
        //set temp locations to real ones
        this.topPipe.setPosition(this.tempStartLocationUp.x, this.tempStartLocationUp.y);
        this.bottomPipe.setPosition(this.tempStartLocationDown.x, this.tempStartLocationDown.y);
    
    }

    //move the pipes as we update the game
    update(deltaTime: number){

        //get the pipe speed
        this.tempSpeed = this.pipeSpeed * deltaTime;

        //make temporary pipe locations
        this.tempStartLocationDown = this.bottomPipe.position; 
        this.tempStartLocationUp = this.topPipe.position;
        
        //move temporary pipe locations
        this.tempStartLocationDown.x -= this.tempSpeed;
        this.tempStartLocationUp.x -= this.tempSpeed;
        
        //place new positions of the pipes from temporary pipe locations
        this.bottomPipe.setPosition(this.tempStartLocationDown);
        this.topPipe.setPosition(this.tempStartLocationUp);
    
        //find out if bird past a pipe, add to the score
        if (this.isPass == false && this.topPipe.position.x <= 0)
        {
            
            //make sure it is only counted once
            this.isPass = true; 
            
            //add a point to the score
            this.game.passPipe();

        };

        //if passed the screen, reset pipes to new location
        if (this.topPipe.position.x < (0 - this.scene.width)){

            //create a new pipe
            this.game.createPipe();

            //delete this node for memory saving
            this.destroy();
            
        };

    }

}



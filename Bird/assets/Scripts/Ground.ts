import { _decorator, Component, Node, Vec3, UITransform, director, Canvas} from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';

@ccclass('Ground')
export class Ground extends Component {
    
    @property({
        type: Node,
        tooltip: 'First ground'
    })
    public ground1: Node;

    @property({
        type: Node,
        tooltip: 'Second ground'
    })
    public ground2: Node;

    @property({
        type: Node,
        tooltip: 'Third ground'
    })
    public ground3: Node;

    //Create ground width variables
    public groundWidth1:number;
    public groundWidth2:number;
    public groundWidth3:number;

    //make temporary starting locations
    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;
    public tempStartLocation3 = new Vec3;
    

    //get the gamespeeds
    public gameCtrlSpeed = new GameCtrl;
    public gameSpeed: number;    

    //all the things we want to happen when we start the script
    onLoad(){
        
        this.startUp()

    }

     //preparing the ground locations
     startUp(){

        //get ground width
        this.groundWidth1 = this.ground1.getComponent(UITransform).width; 
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;

        //set temporary starting locations of ground
        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = this.groundWidth1;
        this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

        //update position to final starting locations
        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);

    }

    //everytime the game updates, move the ground
    update(deltaTime: number) {

        //get speed of ground and background
        this.gameSpeed = this.gameCtrlSpeed.speed;

        //place real location data into temp locations
        this.tempStartLocation1 = this.ground1.position;
        this.tempStartLocation2 = this.ground2.position;
        this.tempStartLocation3 = this.ground3.position;
        
        //get speed and subtract location on x axis
        this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
        this.tempStartLocation3.x -= this.gameSpeed * deltaTime;
        
    
        //get the canvas size prepared
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);

        //check if ground1 went out of bounds. If so, return to the end of the line.
        if (this.tempStartLocation1.x <= (0 - this.groundWidth1)) {
            this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
        }

        //same with ground2
        if (this.tempStartLocation2.x <= (0 - this.groundWidth2)) {
            this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
        }

        //same with ground3
        if (this.tempStartLocation3.x <= (0 - this.groundWidth3)) {
            this.tempStartLocation3.x = canvas.getComponent(UITransform).width;
        }

        //place new locations back into ground nodes     
        this.ground1.setPosition(this.tempStartLocation1);
        this.ground2.setPosition(this.tempStartLocation2);
        this.ground3.setPosition(this.tempStartLocation3);

    }

}



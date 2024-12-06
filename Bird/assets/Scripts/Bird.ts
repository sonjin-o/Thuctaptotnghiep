import { _decorator, Component, Node, CCFloat, Vec3, Animation, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property({
        type: CCFloat,
        tooltip: 'how high does he fly?'
    })
    public jumpHeight: number = 1.3;

    @property({
        type: CCFloat,
        tooltip: 'how long does he fly?'
    })
    public jumpDuration: number = 1.5;

    
    public birdAnimation: Animation;

    
    public birdLocation: Vec3;

    
    public hitSomething:boolean;

    
    onLoad(){

        
        this.resetBird();

        
        this.birdAnimation = this.getComponent(Animation);
        
    }

    
    resetBird(){

        
        this.birdLocation = new Vec3(0,0,0);

        
        this.node.setPosition(this.birdLocation);

        
        this.hitSomething = false;

    }

    
    fly(){

        
        this.birdAnimation.stop();

        
        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0), {easing: "smooth",
                onUpdate: (target:Vec3, ratio:number) => {
                    this.node.position = target;
                }
            })
            .start();

        
        this.birdAnimation.play();

    }




}

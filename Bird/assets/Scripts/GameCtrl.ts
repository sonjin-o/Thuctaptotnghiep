import { _decorator, Component, Node, CCInteger, Input, input, EventKeyboard, KeyCode, director, Contact2DType, Collider2D, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { BirdAudio } from './BirdAudio';

@ccclass("GameCtrl")
export class GameCtrl extends Component {
  @property({
    type: Component,
    tooltip: "Add ground prefab owner here",
  })
  public ground: Ground;

  @property({
    type: CCInteger,
    tooltip: "Change the speed of ground",
  })
  public speed: number = 200;

  @property({
    type: CCInteger,
    tooltip: "Change the speed of pipes",
  })
  public pipeSpeed: number = 200;

  @property({
    type: Results,
    tooltip: "Add results here",
  })
  public result: Results;

  @property({
    type: Bird,
    tooltip: "Add Bird node",
  })
  public bird: Bird;

  @property({
    type: PipePool,
    tooltip: "Add canvas here",
  })
  public pipeQueue: PipePool;

  @property({
    type: BirdAudio,
    tooltip: "add audio controller",
  })
  public clip: BirdAudio;

  
  public isOver: boolean;

  
  onLoad() {
    
    
    this.initListener();

    
    this.result.resetScore();

    
    this.isOver = true;

    
    director.pause();

  }

  
  initListener() {
    
    
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    
    this.node.on(Node.EventType.TOUCH_START, () => {
      
      
      if (this.isOver == true) {
        
        
        this.resetGame();
        this.bird.resetBird();
        this.startGame();
    
      }

      
      if (this.isOver == false) {
        
        
        this.bird.fly();

        
        this.clip.onAudioQueue(0);
      }

    })

  }

  
  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        
        this.gameOver();
        break;
      case KeyCode.KEY_P:
        
        this.result.addScore();
        break;
      case KeyCode.KEY_Q:
        
        this.resetGame();
        this.bird.resetBird();
    }
  }

  
  gameOver() {
    
    
    this.result.showResult();

    
    this.isOver = true;

    
    this.clip.onAudioQueue(3);
    
    
    director.pause();
  
  }

  
  resetGame() {
    
    
    this.result.resetScore();

    
    this.pipeQueue.reset();

    
    this.isOver = false;

    
    this.startGame();

  }

  
  startGame() {
    
    
    this.result.hideResult();

    
    director.resume();

  }

  
  passPipe() {
    
    
    this.result.addScore();

    
    this.clip.onAudioQueue(1);
  
  }

  
  createPipe() {
    
    
    this.pipeQueue.addPool();

  }

  
  contactGroundPipe() {
    
    
    let collider = this.bird.getComponent(Collider2D);

    
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

  }

  
  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

    
    this.bird.hitSomething = true;

    
    this.clip.onAudioQueue(2);

  }

  
  birdStruck() {
  
    
    this.contactGroundPipe()

    
    if (this.bird.hitSomething == true)
    {
        this.gameOver();
    }
      
  }

  //every time the game updates, do this
  update(){

    //if the game is still going, check if the bird hit something
    if (this.isOver == false){
        this.birdStruck();
    }
    
  }

}



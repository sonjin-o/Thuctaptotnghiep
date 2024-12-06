import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;

import { Pipes } from './Pipes';

@ccclass('PipePool')
export class PipePool extends Component {
    
    @property({
        type: Prefab,
        tooltip: 'The prefab of pipes'

    })
    public prefabPipes = null;
    
    @property({
        type: Node,
        tooltip: 'Where the new pipes go'
    })
    public pipePoolHome;

    //create initial properties
    public pool = new NodePool;
    public createPipe:Node = null;  

    initPool(){

        //build the amount of nodes needed at a time
        let initCount = 3;

        //fill up the node pool
        for (let i = 0; i < initCount; i++) {
            // create the new node
            let createPipe = instantiate(this.prefabPipes); //instantiate means make a copy of the orginal

            // put first one on the screen. So make it a child of the canvas.
            if (i == 0) {
                this.pipePoolHome.addChild(createPipe);
            } else {
                //put others into the nodePool
                this.pool.put(createPipe);
            }
        }

    }

    addPool() {
   
        //if the pool is not full add a new one, else get the first one in the pool
        if (this.pool.size() > 0) {
            //get from the pool
            this.createPipe = this.pool.get();
        } else {
            //build a new one
            this.createPipe = instantiate(this.prefabPipes);
        }

        //add pipe to game as a node
        this.pipePoolHome.addChild(this.createPipe);

      }

    reset() {
        
        //clear pool and reinitialize
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();

    }


}



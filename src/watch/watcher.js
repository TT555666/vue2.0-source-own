import {popTarget,pushTarget} from '../dep/index'
import {queueWatcher} from '../nextticket/scheduler'
let id  = 0

class Watcher{
    constructor(vm,exprOrFn,cb,options){
        this.vm = vm
        this.exprOrFn = exprOrFn
        this.deps = [];
        this.depsId = new Set();
        if(typeof exprOrFn == 'function'){
            this.getter = exprOrFn
        }
        this.cb = cb
        this.options = options
        this.id = id++
        this.get()
    }
    get(){
        pushTarget(this);
        this.getter()
        popTarget();
    }
    addDep(dep){
        let id = dep.id;
        if(!this.depsId.has(id)){
            this.depsId.add(id);
            this.deps.push(dep);
            dep.addSub(this);
        }
    }
    update(){
        this.get();
        // queueWatcher(this);
    }
    run(){
        console.log('run',this)
    }
}

export default Watcher
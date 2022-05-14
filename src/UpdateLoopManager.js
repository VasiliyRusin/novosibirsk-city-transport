import { Singletone } from "@/utils";

export default class UpdateLoopManager extends Singletone {
  constructor () {
    super();
    
    if (this.loops == null) {
      this.loops = {};
    }
  }
  
  create (key, func, ms) {
    if (this.loops[key] == null) {
      this.loops[key] = setInterval(func, ms);
    }
  }
  
  destroy (key) {
    clearInterval(this.loops[key]);
  }
  
  destroyAll () {
    for (const loop of this.loops) {
      clearInterval(loop);
    }
  }
}

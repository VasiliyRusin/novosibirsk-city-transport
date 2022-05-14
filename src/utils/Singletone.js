export class Singletone {
  constructor () {
    if (Singletone._instance) {
      return Singletone._instance;
    }
    Singletone._instance = this;
  }
}

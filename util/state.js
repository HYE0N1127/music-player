import { Observable } from "./observable.js";

// Input과 Output이 존재하지 않기에 libs가 맞음

export class State extends Observable {
  #value;

  constructor(initial) {
    super();
    this.#value = initial;
  }

  get value() {
    return this.#value;
  }

  set value(update) {
    this.#value = update;
    this.notify();
  }
}

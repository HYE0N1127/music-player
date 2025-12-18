import { Observable } from "./observable.js";

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

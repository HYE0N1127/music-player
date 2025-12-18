export class Observable {
  #listeners = new Set();

  notify() {
    this.#listeners.forEach((listener) => listener());
  }

  subscribe(listener) {
    this.#listeners.add(listener);
  }

  unsubscribe(listener) {
    this.#listeners.delete(listener);
  }
}

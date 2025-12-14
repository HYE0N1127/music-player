// Input과 Output이 존재하지 않기에 libs가 맞음

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

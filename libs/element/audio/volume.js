export class Volume {
  #element;

  constructor(audioElement) {
    this.#element = audioElement;
  }

  set volume(value) {
    this.#element.volume = value;
  }

  get volume() {
    return this.#element.volume;
  }
}

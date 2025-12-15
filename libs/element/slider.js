export class Slider {
  #slider;

  constructor(slider) {
    this.#slider = slider;
  }

  subscribeInput(callback) {
    this.#slider.oninput = (event) => {
      callback(event);
    };
  }

  subscribeClick(callback) {
    this.#slider.onclick = (event) => {
      callback(event);
    };
  }
}

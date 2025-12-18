export class Timer {
  #element;

  constructor(audioElement) {
    this.#element = audioElement;
  }

  subscribeCurrentTime(callback) {
    this.#element.ontimeupdate = () => {
      const currentTime = this.#element.currentTime;
      callback(currentTime);
    };
  }

  subscribeDurationTime(callback) {
    this.#element.ondurationchange = (event) => {
      const duration = this.#element.duration;
      callback(duration);
    };
  }
}

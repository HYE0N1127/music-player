export class Timeline {
  #element;
  #timeListener;
  #durationListener;

  #isJumping;
  #time;
  #duration;

  constructor(audioElement) {
    this.#element = audioElement;
    this.#timeListener = new Set();
    this.#durationListener = new Set();
  }

  get time() {
    return this.#time;
  }

  set time(value) {
    this.#time = value;
    this.#timeListener.forEach((listener) => listener(this.#time));
  }

  set duration(value) {
    this.#duration = value;
    this.#durationListener.forEach((listener) => listener(this.#duration));
  }

  startJump() {
    this.#isJumping = true;
  }

  jumpTo(time) {
    this.time = time;
    this.#isJumping = false;
  }

  subscribeCurrentTime(callback) {
    this.#timeListener.add(callback);

    this.#element.ontimeupdate = (event) => {
      if (this.#isJumping) {
        return;
      }

      this.time = this.#element.currentTime;
    };
  }

  subscribeDurationTime(callback) {
    this.#durationListener.add(callback);

    this.#element.ondurationchange = (event) => {
      this.duration = this.#element.duration;
    };
  }
}

import { playlistStore } from "../../../store/playlist-store.js";

export class Player {
  #element;
  #isPlaying = true;

  constructor(audioElement) {
    this.#element = audioElement;
  }

  get isPlaying() {
    return this.#isPlaying;
  }

  subscribeIsPlaying(callback) {
    this.#element.onplaying = () => {
      this.#isPlaying = true;
      callback(this.#isPlaying);
    };

    this.#element.onpause = () => {
      this.#isPlaying = false;
      callback(this.#isPlaying);
    };

    this.#element.onended = () => {
      this.#isPlaying = false;
      callback(this.#isPlaying);
    };
  }

  play() {
    this.#element
      .play()
      .then((this.#isPlaying = true))
      .catch((error) => {
        this.#isPlaying = false;
        console.error(`error at play() - ${error}`);
      });
  }

  pause() {
    this.#isPlaying = false;
    this.#element.pause();
  }

  playPrevious() {
    playlistStore.playPrevious();
  }

  playNext() {
    playlistStore.playNext();
  }
}

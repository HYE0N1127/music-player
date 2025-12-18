import { playlistStore } from "../../../store/playlist-store.js";

export class Player {
  #element;
  #isPlaying = true;
  #isPlayingListener;

  constructor(audioElement) {
    this.#element = audioElement;
    this.#isPlayingListener = new Set();
  }

  set isPlaying(value) {
    this.#isPlaying = value;
    this.#isPlayingListener.forEach((listener) => listener(this.#isPlaying));
  }

  get isPlaying() {
    return this.#isPlaying;
  }

  subscribeIsPlaying(callback) {
    this.#isPlayingListener.add(callback);

    this.#element.onplaying = () => {
      this.isPlaying = true;
    };

    this.#element.onpause = () => {
      this.isPlaying = false;
    };

    this.#element.onended = () => {
      this.isPlaying = false;
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

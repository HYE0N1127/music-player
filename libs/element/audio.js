import { playlistStore } from "../../store/playlist-store.js";
import { Volume } from "./audio/volume.js";
import { Player } from "./audio/player.js";
import { Timer } from "./audio/timer.js";

export class Audio {
  #element;

  #player;
  #volume;
  #timer;

  constructor(audioElement) {
    this.#element = audioElement;

    this.#player = new Player(this.#element);
    this.#volume = new Volume(this.#element);
    this.#timer = new Timer(this.#element);
  }

  get volume() {
    return this.#volume;
  }

  get player() {
    return this.#player;
  }

  get timer() {
    return this.#timer;
  }

  resume() {
    this.#element.onended = () => {
      playlistStore.playNext();
    };
  }
}

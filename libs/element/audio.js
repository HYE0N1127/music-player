import { playlistStore } from "../../store/playlist-store.js";
import { Volume } from "./audio/volume.js";
import { Player } from "./audio/player.js";
import { Timeline } from "./audio/timeline.js";

export class Audio {
  #element;

  #player;
  #volume;
  #timeline;

  constructor(audioElement) {
    this.#element = audioElement;

    this.#player = new Player(this.#element);
    this.#volume = new Volume(this.#element);
    this.#timeline = new Timeline(this.#element);
  }

  get volume() {
    return this.#volume;
  }

  get player() {
    return this.#player;
  }

  get timeline() {
    return this.#timeline;
  }

  resume() {
    this.#element.onended = () => {
      playlistStore.playNext();
    };
    this.#element.onloadedmetadata = () => {
      this.player.play();
    };
  }
}

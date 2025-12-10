import { MusicRepository } from "../repository/music-repository.js";
import { State } from "../util/state.js";

class MusicStore {
  #repository;
  #state = new State({
    musics: [],
  });

  constructor() {
    this.#repository = new MusicRepository();
  }

  get state() {
    return this.#state;
  }

  fetch() {
    const musics = this.#repository.getMusicList();
    const state = this.#state.value;

    this.#state.value = {
      ...state,
      musics,
    };
  }

  getMusics() {
    return this.#state.value.musics;
  }
}

export const musicStore = new MusicStore();

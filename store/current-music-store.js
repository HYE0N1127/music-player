import { PlaylistRepository } from "../repository/playlist-repository.js";
import { State } from "../util/state.js";

class CurrentMusicStore {
  #repository;
  #state = new State({
    currentMusic: undefined,
  });

  constructor() {
    this.#repository = new PlaylistRepository();
  }

  get state() {
    return this.#state;
  }

  fetch() {
    const cached = this.#repository.getCurrentMusic();

    this.#state.value = {
      currentMusic: cached,
    };
  }

  playMusic(music) {
    this.#state.value = {
      currentMusic: music,
    };
    this.#repository.setCurrentMusic(music);
  }

  clear() {
    this.#state.value = {
      currentMusic: undefined,
    };
    this.#repository.setCurrentMusic(undefined);
  }
}

export const currentMusicStore = new CurrentMusicStore();

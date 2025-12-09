import { MusicRepository } from "../repository/music-repository.js";
import { State } from "../util/state.js";

class MusicStore {
  #repository;
  #state = new State({
    currentMusic: undefined,
    playlist: [],
  });

  constructor() {
    this.#repository = new MusicRepository();
  }

  addToPlaylist(music) {
    const state = this.#state.value;

    const update = [...state.playlist, music];

    this.#state.value = {
      ...state,
      playlist: update,
    };

    this.#repository.setPlaylist(state.playlist);
  }

  removeFromPlaylist(id) {
    const state = this.#state.value;
    const prev = this.#state.value.playlist;
    const update = prev.filter((music) => music.id !== id);

    this.#state.value = {
      ...state,
      playlist: update,
    };

    this.#repository.setPlaylist(state.playlist);
  }

  clearPlaylist() {
    this.#state.value = {
      currentMusic: undefined,
      playlist: [],
    };

    this.#repository.clearPlaylist();
    this.#repository.clearCurrentMusic();
  }

  isPlaying(id) {
    return id === currentMusic.id;
  }

  fetch() {
    const currentMusic = this.#repository.getCurrentMusic();
    const currentPlaylist = this.#repository.getPlaylist();

    this.#state.value = {
      currentMusic: currentMusic,
      playlist: currentPlaylist,
    };
  }

  getPlaylist() {
    return this.#state.value.playlist;
  }

  getCurrentMusic() {
    return this.#state.value.currentMusic;
  }
}

export const musicStore = new MusicStore();

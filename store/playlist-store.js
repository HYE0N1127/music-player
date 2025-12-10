import { PlaylistRepository } from "../repository/playlist-repository.js";
import { State } from "../util/state.js";

class PlaylistStore {
  #repository;
  #state = new State({
    currentMusic: undefined,
    playlist: [],
  });

  constructor() {
    this.#repository = new PlaylistRepository();
  }

  get state() {
    return this.#state;
  }

  addToPlaylist(music) {
    const state = this.#state.value;

    const update = [...state.playlist, music];

    this.#state.value = {
      ...state,
      playlist: update,
    };

    this.#repository.setPlaylist(update);
  }

  removeFromPlaylist(id) {
    const state = this.#state.value;
    const prev = this.#state.value.playlist;
    const update = prev.filter((music) => music.id !== id);

    this.#state.value = {
      ...state,
      playlist: update,
    };

    this.#repository.setPlaylist(update);
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

export const playlistStore = new PlaylistStore();

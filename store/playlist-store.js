import { PlaylistRepository } from "../repository/playlist-repository.js";
import { State } from "../util/state.js";

class PlaylistStore {
  #repository;
  #state = new State({
    playlist: [],
  });

  constructor() {
    this.#repository = new PlaylistRepository();
  }

  get state() {
    return this.#state;
  }

  fetch() {
    const cached = this.#repository.getPlaylist() ?? [];
    this.#state.value = {
      playlist: cached,
    };
  }

  addToPlaylist(music) {
    const { playlist } = this.#state.value;
    const updatedPlaylist = [...playlist, music];

    this.#state.value = { playlist: updatedPlaylist };
    this.#repository.setPlaylist(updatedPlaylist);
  }

  removeFromPlaylist(id) {
    const { playlist } = this.#state.value;
    const updated = playlist.filter((music) => music.id !== id);

    this.#state.value = { playlist: updated };
    this.#repository.setPlaylist(updated);
  }

  getPrevious(music) {
    if (!music) {
      return undefined;
    }

    const { playlist } = this.#state.value;

    if (playlist.length === 0) {
      return undefined;
    }

    const currentIndex = playlist.findIndex((item) => item.id === music.id);

    if (currentIndex <= 0) {
      return undefined;
    }

    const previousIndex = currentIndex - 1;

    return playlist[previousIndex];
  }

  getNext(music) {
    if (!music) {
      return undefined;
    }

    const { playlist } = this.#state.value;

    if (playlist.length === 0) {
      return undefined;
    }

    const currentIndex = playlist.findIndex((item) => item.id === music.id);

    if (currentIndex === -1) {
      return undefined;
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex >= playlist.length) {
      return undefined;
    }

    return playlist[nextIndex];
  }

  isExist(music) {
    if (!music) {
      return;
    }

    const { playlist } = this.#state.value;

    if (playlist.length === 0) {
      return false;
    }

    return playlist.some((item) => item.id === music.id);
  }
}

export const playlistStore = new PlaylistStore();

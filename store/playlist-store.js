// store/playlist-store.js
import { PlaylistRepository } from "../repository/playlist-repository.js";
import { State } from "../util/state.js";

class PlaylistStore {
  #repository;

  #playlistState = new State([]);
  #currentMusicState = new State(undefined);

  constructor() {
    this.#repository = new PlaylistRepository();
  }

  get playlistState() {
    return this.#playlistState;
  }

  get currentMusicState() {
    return this.#currentMusicState;
  }

  fetch() {
    const currentMusic = this.#repository.getCurrentMusic();
    const currentPlaylist = this.#repository.getPlaylist();

    this.#currentMusicState.value = currentMusic;
    this.#playlistState.value = currentPlaylist;
  }

  addToPlaylist(music) {
    const current = this.#playlistState.value;
    const update = [...current, music];

    this.#playlistState.value = update;
    this.#repository.setPlaylist(update);
  }

  removeFromPlaylist(id) {
    const currentMusic = this.#currentMusicState.value;

    const currentList = this.#playlistState.value;
    const update = currentList.filter((music) => music.id !== id);

    if (id === currentMusic.id) {
      this.playNext();
    }

    this.#playlistState.value = update;
    this.#repository.setPlaylist(update);
  }

  playMusic(music) {
    this.#currentMusicState.value = music;
    this.#repository.setCurrentMusic(music);
  }

  playPrevious() {
    const playlist = this.#playlistState.value;
    const current = this.#currentMusicState.value;

    if (!current || playlist.length === 0) return;

    const currentIndex = playlist.findIndex((music) => music.id === current.id);

    if (currentIndex === 0) {
      return;
    }

    const previousIndex = currentIndex - 1;
    const nextMusic = playlist[previousIndex];

    this.#currentMusicState.value = nextMusic;
    this.#repository.setCurrentMusic(nextMusic);
  }

  playNext() {
    const playlist = this.#playlistState.value;
    const current = this.#currentMusicState.value;

    if (!current || playlist.length === 0) return;

    const currentIndex = playlist.findIndex((music) => music.id === current.id);

    if (currentIndex + 1 === playlist.length) {
      return;
    }

    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextMusic = playlist[nextIndex];

    this.#currentMusicState.value = nextMusic;
    this.#repository.setCurrentMusic(nextMusic);
  }
}

export const playlistStore = new PlaylistStore();

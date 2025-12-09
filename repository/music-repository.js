import {
  STORAGE_CURRENT_MUSIC_KEY,
  STORAGE_PLAYLIST_KEY,
} from "../constants/key.js";
import { Storage } from "../libs/storage/local-storage.js";

export class MusicRepository {
  #localStorage;

  constructor() {
    this.#localStorage = new Storage();
  }

  setPlaylist(list) {
    this.#localStorage.set(STORAGE_PLAYLIST_KEY, list);
  }

  clearPlaylist() {
    this.#localStorage.clearItem(STORAGE_PLAYLIST_KEY);
  }

  getPlaylist() {
    return this.#localStorage.get(STORAGE_PLAYLIST_KEY);
  }

  getCurrentMusic() {
    return this.#localStorage.get(STORAGE_CURRENT_MUSIC_KEY) ?? [];
  }

  setCurrentMusic(music) {
    this.#localStorage.set(STORAGE_CURRENT_MUSIC_KEY, music);
  }

  clearCurrentMusic() {
    this.#localStorage.clearItem(STORAGE_CURRENT_MUSIC_KEY);
  }
}

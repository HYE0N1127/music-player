import { PlaylistRepository } from "../repository/playlist-repository.js";
import { State } from "../util/state.js";

class PlaylistStore {
  #repository;
  #playlistState;
  #currentMusicState;

  constructor() {
    this.#repository = new PlaylistRepository();
    this.#currentMusicState = new State(undefined);
    this.#playlistState = new State([]);
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

    this.#currentMusicState.value = currentMusic ?? undefined;
    this.#playlistState.value = currentPlaylist ?? [];
  }

  addToPlaylist(music) {
    const currentMusic = this.#currentMusicState.value;
    const current = this.#playlistState.value;
    const update = [...current, music];

    this.#playlistState.value = update;
    this.#repository.setPlaylist(update);

    if (currentMusic == null) {
      this.playMusic(music);
    }
  }

  removeFromPlaylist(id) {
    const currentMusic = this.#currentMusicState.value;

    const currentList = this.#playlistState.value;
    const update = currentList.filter((music) => music.id !== id);

    if (currentMusic && id === currentMusic.id) {
      const playlistAfterRemoval = update;

      if (playlistAfterRemoval.length > 0) {
        this.playNext();
        const isStillPlayingDeletedSong =
          this.#currentMusicState.value &&
          this.#currentMusicState.value.id === id;

        if (isStillPlayingDeletedSong) {
          this.playPrevious();
        }
      } else {
        this.#currentMusicState.value = undefined;
      }
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

  isExist(music) {
    if (!music) {
      return;
    }

    const playlist = this.#playlistState.value;

    if (playlist.length === 0) {
      return false;
    }

    return playlist.some((item) => item.id === music.id);
  }
}

export const playlistStore = new PlaylistStore();

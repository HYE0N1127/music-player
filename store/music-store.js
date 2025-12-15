import { MusicRepository } from "../repository/music-repository.js";
import { State } from "../util/state.js";

const PAGE_SIZE = 5;

class MusicStore {
  #repository;
  #state = new State({
    totalPage: 0,
    currentPage: 0,
    music: [],
  });

  constructor() {
    this.#repository = new MusicRepository();
  }

  get state() {
    return this.#state;
  }

  fetch() {
    const { totalPage, currentPage, music } = this.#state.value;

    if (totalPage !== 0 && currentPage >= totalPage) {
      return;
    }

    const nextPage = currentPage + 1;
    const update = this.#repository.getMusicList(nextPage, PAGE_SIZE);

    this.#state.value = {
      music: [...music, ...update.musics],
      currentPage: nextPage,
      totalPage: update.totalPage,
    };
  }

  getMusics() {
    return this.#state.value.musics;
  }
}

export const musicStore = new MusicStore();

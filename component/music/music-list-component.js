import { RepaintableComponent } from "../component.js";
import { musicStore } from "../../store/music-store.js";
import { playlistStore } from "../../store/playlist-store.js";

export class MusicListComponent extends RepaintableComponent {
  #renderer;
  #type;

  constructor(renderer, type) {
    super(`
      <ul class="music-list" data-type="${type}">
      </ul>
    `);

    this.#renderer = renderer;
    this.#type = type;

    switch (this.#type) {
      case "main":
        musicStore.state.subscribe(() => {
          this.rendering();
        });
        musicStore.fetch();
        break;
      case "player":
        playlistStore.playlistState.subscribe(() => {
          this.rendering();
        });
        playlistStore.fetch();
        break;
    }

    this.rendering();
  }

  rendering() {
    switch (this.#type) {
      case "main": {
        const list = musicStore.state.value.musics;
        const elements = list.map((music) => new this.#renderer(music).element);
        this.update(elements);
        break;
      }
      case "player": {
        const list = playlistStore.playlistState.value;
        const elements = list.map((music) => new this.#renderer(music).element);
        this.update(elements);
        break;
      }
    }
  }
}

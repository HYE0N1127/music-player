import { RepaintableComponent } from "../component.js";
import { musicStore } from "../../store/music-store.js";

export class MusicListComponent extends RepaintableComponent {
  #renderer;
  #store;

  constructor(renderer) {
    super(`
        <ul class="music-list">
        </ul>
    `);

    this.#store = musicStore;
    this.#renderer = renderer;

    this.#store.state.subscribe(() => this.rendering());
    this.#store.fetch();

    this.rendering();
  }

  rendering() {
    const list = this.#store.state.value.musics;
    const elements = list.map((music) => new this.#renderer(music).element);
    this.update(elements);
  }
}

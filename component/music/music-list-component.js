import { Component, RepaintableComponent } from "../component.js";
import { musicStore } from "../../store/music-store.js";

export class MusicListComponent extends RepaintableComponent {
  #renderer;

  constructor(renderer) {
    super(`
      <div class="music-list"></div>
    `);

    this.#renderer = renderer;

    musicStore.state.subscribe(() => {
      this.rendering();
    });

    musicStore.fetch();
  }

  rendering() {
    const { music } = musicStore.state.value;
    const elements = music.map((item) => new this.#renderer(item).element);

    this.update(elements);
  }
}

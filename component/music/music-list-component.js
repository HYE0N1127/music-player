import { LazyScrollingComponent } from "../component.js";
import { musicStore } from "../../store/music-store.js";

export class MusicListComponent extends LazyScrollingComponent {
  #renderer;

  constructor(renderer) {
    super(
      `
      <ul class="music-list">
      </ul>
    `,
      musicStore.fetch.bind(musicStore)
    );

    this.#renderer = renderer;

    musicStore.state.subscribe(() => {
      this.rendering();
    });

    musicStore.fetch();
  }

  rendering() {
    const list = musicStore.state.value.music;
    const elements = list.map((music) => new this.#renderer(music).element);
    this.update(elements);
  }
}

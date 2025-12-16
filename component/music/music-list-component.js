import { InfiniteScrollComponent } from "../component.js";
import { musicStore } from "../../store/music-store.js";

export class MusicListComponent extends InfiniteScrollComponent {
  #renderer;

  constructor(renderer) {
    super(musicStore.fetch.bind(musicStore));

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

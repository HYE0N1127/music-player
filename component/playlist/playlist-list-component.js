import { RepaintableComponent } from "../component.js";
import { playlistStore } from "../../store/playlist-store.js";

export class PlaylistListComponent extends RepaintableComponent {
  #renderer;

  constructor(renderer) {
    super(
      `
      <ul class="music-list" data-type="player">
      </ul>
    `
    );

    this.#renderer = renderer;
    playlistStore.playlistState.subscribe(() => {
      this.rendering();
    });

    playlistStore.fetch();

    this.rendering();
  }

  rendering() {
    const list = playlistStore.playlistState.value;
    const elements = list.map((music) => new this.#renderer(music).element);
    this.update(elements);
  }
}

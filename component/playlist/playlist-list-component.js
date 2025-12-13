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
    playlistStore.state.subscribe(() => {
      this.rendering();
    });

    playlistStore.fetch();

    this.rendering();
  }

  rendering() {
    const { playlist } = playlistStore.state.value;
    const elements = playlist.map((music) => new this.#renderer(music).element);
    this.update(elements);
  }
}

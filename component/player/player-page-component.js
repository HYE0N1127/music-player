import { Component } from "../component.js";
import { PlaylistItemComponent } from "../playlist/playlist-item-component.js";
import { PlaylistListComponent } from "../playlist/playlist-list-component.js";
import { PlayerInfoComponent } from "./player-info-component.js";

export class PlayerPageComponent extends Component {
  constructor() {
    super(`
      <div class="playlist invisible">
      </div>
    `);

    this.rendering();
  }

  rendering() {
    const info = new PlayerInfoComponent();
    info.attachTo(this.element);

    const listComponent = new PlaylistListComponent(PlaylistItemComponent);
    listComponent.attachTo(this.element);
  }
}

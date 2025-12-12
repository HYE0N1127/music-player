import { Component } from "../component.js";
import { MusicItemComponent } from "../music/music-item-component.js";
import { MusicListComponent } from "../music/music-list-component.js";
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

    const listComponent = new MusicListComponent(MusicItemComponent, "player");
    listComponent.attachTo(this.element);
  }
}

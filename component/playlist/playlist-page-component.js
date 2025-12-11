import { Component } from "../component.js";
import { PlaylistControllerComponent } from "./playlist-controller-component.js";

export class PlaylistPageComponent extends Component {
  constructor() {
    super(`
      <div class="playlist">
      </div>
    `);

    this.rendering();
  }

  rendering() {
    const controller = new PlaylistControllerComponent();
    controller.attachTo(this.element);
  }
}

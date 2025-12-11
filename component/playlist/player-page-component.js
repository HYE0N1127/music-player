import { Component } from "../component.js";
import { PlayerControllerComponent } from "./player-controller-component.js";

export class PlayerPageComponent extends Component {
  constructor() {
    super(`
      <div class="playlist">
      </div>
    `);

    this.rendering();
  }

  rendering() {
    const controller = new PlayerControllerComponent();
    controller.attachTo(this.element);
  }
}

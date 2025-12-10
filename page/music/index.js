import { MusicItemComponent } from "../../component/music/music-item-component.js";
import { MusicListComponent } from "../../component/music/music-list-component.js";

class Main {
  #root;
  constructor(root) {
    this.#root = root;

    this.rendering();
  }

  rendering() {
    const listComponent = new MusicListComponent(MusicItemComponent);

    console.log(this.#root);
    listComponent.attachTo(this.#root);
  }
}

export const main = new Main(document.getElementById("main-root"));

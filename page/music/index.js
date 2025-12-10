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

    // root 엘리먼트에 컴포넌트 연결 (attachTo 메서드가 존재한다고 가정)
    console.log(this.#root);
    listComponent.attachTo(this.#root);
  }
}

export const main = new Main(document.getElementById("main-root"));

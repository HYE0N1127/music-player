import { MusicItemComponent } from "../../component/music/music-item-component.js";
import { MusicListComponent } from "../../component/music/music-list-component.js";
import { ControllerComponent } from "../../component/controller/controller-component.js";
import { PlayerPageComponent } from "../../component/player/player-page-component.js";
import { playlistStore } from "../../store/playlist-store.js";
import { IntersectionComponent } from "../../component/component.js";
import { musicStore } from "../../store/music-store.js";

class Main {
  constructor() {
    this.rendering();
  }

  rendering() {
    const root = document.getElementById("root");
    const mainContentRoot = document.getElementById("main-root");

    const listComponent = new MusicListComponent(MusicItemComponent);
    const intersection = new IntersectionComponent(() => {
      musicStore.fetch();
    });

    listComponent.attachTo(mainContentRoot);
    listComponent.addChildren([intersection]);

    const controllerComponent = new ControllerComponent();
    controllerComponent.attachTo(root);

    const playlistPageComponent = new PlayerPageComponent();
    playlistPageComponent.attachTo(root);

    controllerComponent.element.addEventListener("toggle-playlist", () => {
      if (playlistPageComponent.element) {
        playlistPageComponent.element.classList.toggle("invisible");
      } else {
        console.error("요소 찾기 실패");
      }
    });

    playlistStore.fetch();
  }
}

export const main = new Main();

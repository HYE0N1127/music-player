import { MusicItemComponent } from "../../component/music/music-item-component.js";
import { MusicListComponent } from "../../component/music/music-list-component.js";
import { ControllerComponent } from "../../component/controller/controller-component.js";
import { PlayerPageComponent } from "../../component/player/player-page-component.js";
import { playlistStore } from "../../store/playlist-store.js";

class Main {
  constructor() {
    this.rendering();
  }

  rendering() {
    const root = document.getElementById("root");
    const mainContentRoot = document.getElementById("main-root");
    const listComponent = new MusicListComponent(MusicItemComponent, "main");

    listComponent.attachTo(mainContentRoot);

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

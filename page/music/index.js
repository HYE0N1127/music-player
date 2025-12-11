import { MusicItemComponent } from "../../component/music/music-item-component.js";
import { MusicListComponent } from "../../component/music/music-list-component.js";
import { PlaylistPageComponent } from "../../component/playlist/playlist-page-component.js";

class Main {
  constructor() {
    this.rendering();
  }

  rendering() {
    const root = document.querySelector(".root");
    const mainContentRoot = document.getElementById("main-root");
    const listComponent = new MusicListComponent(MusicItemComponent);

    listComponent.attachTo(mainContentRoot);

    const playlistPageComponent = new PlaylistPageComponent();
    playlistPageComponent.attachTo(root);
  }
}

export const main = new Main();

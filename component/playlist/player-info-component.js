import { playlistStore } from "../../store/playlist-store.js";
import { Component } from "../component.js";

export class PlayerInfoComponent extends Component {
  constructor() {
    super(`
      <div class="playlist__current">
        <div class="thumbnail" data-type="player"></div>
        <div class="playlist__current-info">
          <span class="playlist__current-title"
            >돌아오지마 (Feat. 용준형 of 비스트)</span
          >
          <span class="playlist__current-artist">Heize</span>
        </div>
      </div>
    `);

    playlistStore.currentMusicState.subscribe(() => this.rendering());
  }

  rendering() {
    const music = playlistStore.currentMusicState.value;

    if (music != null) {
      const thumbnailElement = this.element.querySelector(".thumbnail");
      const titleElement = this.element.querySelector(
        ".playlist__current-title"
      );
      const artistElement = this.element.querySelector(
        ".playlist__current-artist"
      );

      const imageElement = document.createElement("img");
      imageElement.src = `../../${music.cover}`;
      imageElement.classList.add("thumbnail__image");

      const isExist = thumbnailElement.querySelector("img");
      if (isExist) {
        isExist.remove();
      }

      thumbnailElement.appendChild(imageElement);
      titleElement.textContent = music.title;
      artistElement.textContent = music.artist;
    }
  }
}

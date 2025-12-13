import { playlistStore } from "../../store/playlist-store.js";
import { Component } from "../component.js";

export class PlayerInfoComponent extends Component {
  constructor() {
    super(`
      <div class="playlist__current">
        <div class="thumbnail" data-type="player"></div>
        <div class="playlist__current-info">
          <span class="playlist__current-title"
            >노래를 선택해주세요.</span
          >
          <span class="playlist__current-artist"></span>
        </div>
      </div>
    `);

    playlistStore.currentMusicState.subscribe(() => this.rendering());
  }

  rendering() {
    const music = playlistStore.currentMusicState.value;
    const thumbnailElement = this.element.querySelector(".thumbnail");
    const titleElement = this.element.querySelector(".playlist__current-title");
    const artistElement = this.element.querySelector(
      ".playlist__current-artist"
    );

    const imageElement = document.createElement("img");

    if (music != null) {
      imageElement.src = `../../${music.cover}`;
      imageElement.classList.add("thumbnail__image");

      const isExist = thumbnailElement.querySelector("img");
      if (isExist) {
        isExist.remove();
      }

      thumbnailElement.appendChild(imageElement);
      titleElement.textContent = music.title;
      artistElement.textContent = music.artist;
    } else {
      titleElement.textContent = "노래를 선택해주세요.";
      artistElement.textContent = "";

      const isExist = thumbnailElement.querySelector("img");
      if (isExist) {
        isExist.remove();
      }
    }
  }
}

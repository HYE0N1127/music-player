import { currentMusicStore } from "../../store/current-music-store.js";
import { playlistStore } from "../../store/playlist-store.js";
import { Component } from "../component.js";

export class MusicItemComponent extends Component {
  constructor(music) {
    super(`
      <li class="music" data-id="${music.id}">
        <div class="thumbnail"></div>
        <div class="music__info">
          <span class="music__title"></span>
          <span class="music__artist"></span>
        </div>
      </li> 
    `);

    this.rendering(music);
  }

  rendering(music) {
    const thumbnailContainerElement = this.element.querySelector(".thumbnail");
    const titleElement = this.element.querySelector(".music__title");
    const artistElement = this.element.querySelector(".music__artist");

    const imageElement = document.createElement("img");
    imageElement.src = `../../${music.cover}`;
    imageElement.classList.add("thumbnail__image");

    const isExistThumbnail = thumbnailContainerElement.querySelector("img");
    if (isExistThumbnail) {
      isExistThumbnail.remove();
    }

    thumbnailContainerElement.appendChild(imageElement);
    titleElement.textContent = music.title;
    artistElement.textContent = music.artist;

    this.element.addEventListener("click", () => {
      this.#changePlaylist(music);
    });
  }

  #changePlaylist(music) {
    if (playlistStore.isExist(music)) {
      playlistStore.removeFromPlaylist(music.id);
    } else {
      playlistStore.addToPlaylist(music);

      const { currentMusic } = currentMusicStore.state.value;
      if (currentMusic == null) {
        currentMusicStore.playMusic(music);
      }
    }
  }
}

import { playlistStore } from "../../store/playlist-store.js";
import { Component } from "../component.js";

export class PlayerControllerComponent extends Component {
  constructor() {
    super(`
      <div class="controller">
        <audio id="controller__audio"></audio>
        <div class="controller__control">
          <button class="controller__button" id="controller__backward-button">
            <i class="fa-solid fa-backward-step"></i>
          </button>
          <button class="controller__button" id="controller__control-button">
            <i class="fa-solid fa-play"></i></i>
          </button>
          <button class="controller__button" id="controller__forward-button">
            <i class="fa-solid fa-forward-step"></i>
          </button>
        </div>
        <div class="controller__info">
          <div class="thumbnail"></div>
          <div class="controller__music-info">
            <span class="controller__music-title"></span>
            <span class="controller__artist"></span>
          </div>
        </div>
        <div class="controller__options">
          <div class="controller__volume">
            <i class="fa-solid fa-volume-low"></i>
            <input
              class="controller__volume-slider"
              type="range"
              min="0"
              max="100"
              value="50"
              onclick="event.stopPropagation()"
            />
          </div>
          <button class="controller__button">
            <i class="fa-solid fa-caret-up"></i>
          </button>
        </div>
      </div>
    `);

    playlistStore.currentMusicState.subscribe(this.rendering());

    this.rendering();
  }

  rendering() {
    // FIXME: 노래를 store에서 받아오는 방식으로 변경할 것
    // const music = playlistStore.currentMusicState.value;
    const music = {
      id: 1,
      title: "돌아오지마 (Feat. 용준형 of 비스트)",
      artist: "Heize",
      source: "asset/music/dont-come-back.mp3",
      cover: "asset/cover/dont-come-back-thumbnail.jpg",
    };

    // control buttons
    const backwardButton = this.element.querySelector(
      "#controller__backward-button"
    );
    const forwardButton = this.element.querySelector(
      "#controller__forward-button"
    );
    const controlButton = this.element.querySelector(
      "#controller__control-button"
    );

    const thumbnailElement = this.element.querySelector(".thumbnail");
    const titleElement = this.element.querySelector(".controller__music-title");
    const artistElement = this.element.querySelector(".controller__artist");
    const audioElement = this.element.querySelector("#controller__audio");
    const volumeSlider = this.element.querySelector(
      ".controller__volume-slider"
    );

    if (music) {
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

      audioElement.src = `../../${music.source}`;

      controlButton.onclick = () => {
        this.#togglePlayPause(audioElement, controlButton);
      };
      forwardButton.onclick = () => playlistStore.playNext();
      backwardButton.onclick = () => playlistStore.playPrevious();

      volumeSlider.addEventListener("input", (event) => {
        const newVolume = parseFloat(event.target.value);
        audioElement.volume = newVolume / 100;
      });

      audioElement.addEventListener("ended", () => {
        playlistStore.playNext();
      });
    }
  }

  #togglePlayPause(element, button) {
    const pauseIcon = '<i class="fa-solid fa-pause"></i>';
    const playIcon = '<i class="fa-solid fa-play"></i>';

    if (element.paused) {
      element.play();
      button.innerHTML = pauseIcon;
    } else {
      element.pause();
      button.innerHTML = playIcon;
    }
  }
}

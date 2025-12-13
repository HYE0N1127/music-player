import { currentMusicStore } from "../../store/current-music-store.js";
import { playlistStore } from "../../store/playlist-store.js";
import { Component } from "../component.js";

export class ControllerComponent extends Component {
  constructor() {
    super(`
      <div class="controller">
        <audio id="controller__audio"></audio>
          <input 
          type="range" 
          class="controller__time-slider"
          min="0" 
          max="100" 
          value="0"
        />

        <div class="controller__control">
          <div class="controller__play">
            <button class="controller__button" id="controller__backward-button">
              <i class="fa-solid fa-backward-step"></i>
            </button>
            <button class="controller__button" id="controller__control-button">
              <i class="fa-solid fa-pause"></i>
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
      </div>
    `);

    currentMusicStore.state.subscribe(() => this.rendering());
    currentMusicStore.fetch();
  }

  rendering() {
    const { currentMusic } = currentMusicStore.state.value;

    const audioTimeSlider = this.element.querySelector(
      ".controller__time-slider"
    );

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

    this.element.onclick = () => {
      const customEvent = new CustomEvent("toggle-playlist", {
        bubbles: false,
        composed: true,
      });

      this.element.dispatchEvent(customEvent);
    };

    if (currentMusic != null) {
      const imageElement = document.createElement("img");
      imageElement.src = `../../${currentMusic.cover}`;
      imageElement.classList.add("thumbnail__image");

      const isExist = thumbnailElement.querySelector("img");
      if (isExist) {
        isExist.remove();
      }

      thumbnailElement.appendChild(imageElement);

      titleElement.textContent = currentMusic.title;
      artistElement.textContent = currentMusic.artist;

      audioElement.src = `../../${currentMusic.source}`;

      if (!audioElement.hasLoadedMetadataListener) {
        audioElement.addEventListener("loadedmetadata", () => {
          const duration = audioElement.duration;
          audioTimeSlider.max = duration;
          this.#updateSliderProgress(audioTimeSlider);

          this.#togglePlayPause(audioElement, controlButton);
        });
        audioElement.hasLoadedMetadataListener = true;
      }

      if (!audioElement.hasTimeUpdateListener) {
        audioElement.addEventListener("timeupdate", () => {
          audioTimeSlider.value = audioElement.currentTime;
          this.#updateSliderProgress(audioTimeSlider);
        });
        audioElement.hasTimeUpdateListener = true;
      }

      if (!audioTimeSlider.hasClickListener) {
        audioTimeSlider.addEventListener("click", (event) => {
          event.stopPropagation();
          this.#handleProgressClick(event, audioElement, audioTimeSlider);
        });
        audioTimeSlider.hasClickListener = true;
      }

      audioTimeSlider.addEventListener("input", (event) => {
        event.stopPropagation();
        const newValue = parseFloat(event.target.value);
        audioElement.currentTime = newValue;
        this.#updateSliderProgress(audioTimeSlider);
      });

      controlButton.onclick = (event) => {
        event.stopPropagation();
        this.#togglePlayPause(audioElement, controlButton);
      };
      forwardButton.onclick = (event) => {
        event.stopPropagation();
        this.#playNext(currentMusic);
      };
      backwardButton.onclick = (event) => {
        event.stopPropagation();
        this.#playPrevious(currentMusic);
      };

      volumeSlider.addEventListener("input", (event) => {
        const newVolume = parseFloat(event.target.value);
        audioElement.volume = newVolume / 100;
      });

      audioElement.addEventListener("ended", () => {
        this.#togglePlayPause(audioElement, controlButton);
        this.#playNext(currentMusic);
      });
    } else {
      if (audioElement) {
        audioElement.pause();
        audioElement.removeAttribute("src");
      }

      if (audioTimeSlider) {
        audioTimeSlider.value = 0;
        audioTimeSlider.max = 0;
        this.#updateSliderProgress(audioTimeSlider);
      }

      titleElement.textContent = "";
      artistElement.textContent = "";
      controlButton.innerHTML = '<i class="fa-solid fa-play"></i>';

      const isExist = thumbnailElement.querySelector("img");
      if (isExist) {
        isExist.remove();
      }
    }
  }

  #playNext(current) {
    const next = playlistStore.getNext(current);

    if (next == null) {
      return;
    }

    currentMusicStore.playMusic(next);
  }

  #playPrevious(current) {
    const previous = playlistStore.getPrevious(current);

    if (previous == null) {
      return;
    }

    currentMusicStore.playMusic(previous);
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

  #updateSliderProgress(slider) {
    const max = slider.max > 0 ? slider.max : 1;
    const percentage = (slider.value / max) * 100;

    slider.style.background = `linear-gradient(to right, 
          var(--progress-color) 0%, 
          var(--progress-color) ${percentage}%, 
          rgba(255, 255, 255, 0.3) ${percentage}%, 
          rgba(255, 255, 255, 0.3) 100%)`;
  }

  #handleProgressClick(event, audio, slider) {
    const rect = slider.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const duration = audio.duration;

    if (isNaN(duration) || duration <= 0) {
      return;
    }

    const newTime = duration * percentage;

    audio.currentTime = newTime;
    slider.value = newTime;

    this.#updateSliderProgress(slider);
  }
}

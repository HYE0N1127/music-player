import { Audio } from "../../libs/element/audio.js";
import { Slider } from "../../libs/element/slider.js";
import { playlistStore } from "../../store/playlist-store.js";
import { formatTime } from "../../util/time.js";
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

        <div class="controller__left">
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


            <div class="controller__playtime">
              <span class="controller__time" id="controller__current-time">0:00</span>
              <span class="controller__time">/</span>
              <span class="controller__time" id="controller__duration-time">0:00</span>
            </div>
          </div>
          <div class="controller__center">
            <div class="thumbnail"></div>
            <div class="controller__music-info">
              <span class="controller__music-title"></span>
              <span class="controller__artist"></span>
            </div>
          </div>
          <div class="controller__right">
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

    playlistStore.currentMusicState.subscribe(() => this.rendering());
    playlistStore.fetch();
  }

  rendering() {
    const currentMusic = playlistStore.currentMusicState.value;

    const timelineSliderElement = this.element.querySelector(
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

    const currentTimerElement = this.element.querySelector(
      "#controller__current-time"
    );
    const durationTimerElement = this.element.querySelector(
      "#controller__duration-time"
    );

    const thumbnailElement = this.element.querySelector(".thumbnail");
    const titleElement = this.element.querySelector(".controller__music-title");
    const artistElement = this.element.querySelector(".controller__artist");
    const audioElement = this.element.querySelector("#controller__audio");
    const volumeSliderElement = this.element.querySelector(
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
      this.#setThumbnail("append", thumbnailElement, currentMusic.cover);
      titleElement.textContent = currentMusic.title;
      artistElement.textContent = currentMusic.artist;

      audioElement.src = `../../${currentMusic.source}`;

      const audio = new Audio(audioElement);
      const volumeSlider = new Slider(volumeSliderElement);
      const timeline = new Slider(timelineSliderElement);

      audio.timer.subscribeCurrentTime((currentTime) => {
        currentTimerElement.textContent = formatTime(currentTime);

        timelineSliderElement.value = audioElement.currentTime;
        this.#updateSliderProgress(timelineSliderElement);
      });

      audio.timer.subscribeDurationTime((duration) => {
        audio.player.play();
        durationTimerElement.textContent = formatTime(duration);

        timelineSliderElement.max = duration;
        this.#updateSliderProgress(timelineSliderElement);
      });

      audio.player.subscribeIsPlaying((isPlaying) => {
        const pauseIcon = '<i class="fa-solid fa-pause"></i>';
        const playIcon = '<i class="fa-solid fa-play"></i>';

        if (isPlaying) {
          controlButton.innerHTML = pauseIcon;
        } else {
          controlButton.innerHTML = playIcon;
        }
      });

      volumeSlider.subscribeInput((event) => {
        const update = parseFloat(event.target.value) / 100;
        audio.volume.volume = update;
      });

      timeline.subscribeClick((event) => {
        this.#handleProgressClick(event, audioElement, timelineSliderElement);
      });

      controlButton.onclick = (event) => {
        event.stopPropagation();
        if (audio.player.isPlaying) {
          audio.player.pause();
        } else {
          audio.player.play();
        }
      };

      forwardButton.onclick = (event) => {
        event.stopPropagation();
        audio.player.playNext();
      };

      backwardButton.onclick = (event) => {
        event.stopPropagation();
        audio.player.playPrevious();
      };

      audio.resume();
    } else {
      if (audioElement) {
        audioElement.pause();
        audioElement.removeAttribute("src");
      }

      if (timelineSliderElement) {
        timelineSliderElement.value = 0;
        timelineSliderElement.max = 0;
        this.#updateSliderProgress(timelineSliderElement);
      }

      titleElement.textContent = "";
      artistElement.textContent = "";
      controlButton.innerHTML = '<i class="fa-solid fa-play"></i>';

      this.#setThumbnail("remove", thumbnailElement, null);
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

  #setThumbnail(type, element, src) {
    switch (type) {
      case "remove": {
        const isExist = element.querySelector("img");
        if (isExist) {
          isExist.remove();
        }
        break;
      }

      case "append": {
        const imageElement = document.createElement("img");
        imageElement.src = `../../${src}`;
        imageElement.classList.add("thumbnail__image");

        const isExist = element.querySelector("img");
        if (isExist) {
          isExist.remove();
        }

        element.appendChild(imageElement);
        break;
      }
    }
  }
}

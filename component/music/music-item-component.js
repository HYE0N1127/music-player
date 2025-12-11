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

    const isExist = thumbnailContainerElement.querySelector("img");
    if (isExist) {
      isExist.remove();
    }

    thumbnailContainerElement.appendChild(imageElement);
    titleElement.textContent = music.title;
    artistElement.textContent = music.artist;

    /**
     * TODO: Click 시 플레이리스트에 담기고 currentMusic이 비어있다면 currentMusic에 할당되게 할 것.
     * 타입을 playlist와 main으로 나눠받아 아이템 클릭 이벤트 바꾸기
     * 타입이 playlist라면 클릭 시 재생목록에서 삭제, main이면 재생목록에 저장하는 코드 만들기
     */
  }
}

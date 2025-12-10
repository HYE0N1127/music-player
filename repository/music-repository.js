const musics = [
  {
    id: 1,
    title: "돌아오지마 (Feat. 용준형 of 비스트)",
    artist: "Heize",
    playtime: 217,
    source: "asset/music/dont-come-back.mp3",
    cover: "asset/cover/dont-come-back-thumbnail.jpg",
  },
  {
    id: 2,
    title: "I",
    artist: "TAEYEON",
    playtime: 163,
    source: "asset/music/i.mp3",
    cover: "asset/cover/i-thumbnail.jpg",
  },
  {
    id: 3,
    title: "EASY (Feat. Sik-K(식케이))",
    artist: "휘인(마마무)",
    playtime: 188,
    source: "asset/music/easy.mp3",
    cover: "asset/cover/easy-thumbnail.jpg",
  },
  {
    id: 4,
    title: "먹구름",
    artist: "윤하 (YOUNHA)",
    playtime: 247,
    source: "asset/music/dark-cloud.mp3",
    cover: "asset/cover/dark-cloud-thumbnail.jpg",
  },
];

export class MusicRepository {
  getMusicList() {
    return musics;
  }
}

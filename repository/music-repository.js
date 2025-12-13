const musics = [
  {
    id: 1,
    title: "돌아오지마 (Feat. 용준형)",
    artist: "헤이즈 (Heize)",
    source: "asset/music/dont-come-back.mp3",
    cover: "asset/cover/dont-come-back-thumbnail.jpg",
  },
  {
    id: 2,
    title: "I",
    artist: "태연 (TAEYEON)",
    source: "asset/music/i.mp3",
    cover: "asset/cover/i-thumbnail.jpg",
  },
  {
    id: 3,
    title: "EASY (Feat. Sik-K)",
    artist: "휘인 (Whee In)",
    source: "asset/music/easy.mp3",
    cover: "asset/cover/easy-thumbnail.jpg",
  },
  {
    id: 4,
    title: "먹구름",
    artist: "윤하 (YOUNHA)",
    source: "asset/music/dark-cloud.mp3",
    cover: "asset/cover/dark-cloud-thumbnail.jpg",
  },
  {
    id: 5,
    title: "Be a Flower",
    artist: "Ryokuoushoku Shakai",
    source: "asset/music/be-a-flower.mp3",
    cover: "asset/cover/be-a-flower-thumbnail.jpg",
  },
  {
    id: 6,
    title: "Blood flow",
    artist: "yama",
    source: "asset/music/blood-flow.mp3",
    cover: "asset/cover/blood-flow-thumbnail.jpg",
  },
  {
    id: 7,
    title: "Crossing Field",
    artist: "LiSA",
    source: "asset/music/Crossing-Field.mp3",
    cover: "asset/cover/crossing-field-thumbnail.jpg",
  },
  {
    id: 8,
    title: "Harujion",
    artist: "YOASOBI",
    source: "asset/music/harujion.mp3",
    cover: "asset/cover/the-book-thumbnail.jpg",
  },
  {
    id: 9,
    title: "Into the Night",
    artist: "YOASOBI",
    source: "asset/music/into-the-night.mp3",
    cover: "asset/cover/the-book-thumbnail.jpg",
  },
  {
    id: 10,
    title: "Ikokukonen",
    artist: "Omoinotake",
    source: "asset/music/ikuokukonen.mp3",
    cover: "asset/cover/ikuokukonen-thumbnail.jpg",
  },
  {
    id: 11,
    title: "Jane Doe",
    artist: "Yonezu Kenshi",
    source: "asset/music/jane-doe.mp3",
    cover: "asset/cover/jane-doe-thumbnail.jpg",
  },
  {
    id: 12,
    title: "Kaikai Kitan",
    artist: "Eve",
    source: "asset/music/kaikai-kitan.mp3",
    cover: "asset/cover/kaikai-kitan-thumbnail.jpg",
  },
  {
    id: 13,
    title: "Kanden",
    artist: "Yonezu Kenshi",
    source: "asset/music/kanden.mp3",
    cover: "asset/cover/kanden-thumbnail.jpg",
  },
  {
    id: 14,
    title: "Lilac",
    artist: "Mrs. Green Apple",
    source: "asset/music/lilac.mp3",
    cover: "asset/cover/lilac-thumbnail.jpg",
  },
  {
    id: 15,
    title: "Maybe",
    artist: "YOASOBI",
    source: "asset/music/maybe.mp3",
    cover: "asset/cover/the-book-thumbnail.jpg",
  },
  {
    id: 16,
    title: "Monster",
    artist: "YOASOBI",
    source: "asset/music/monster.mp3",
    cover: "asset/cover/monster-thumbnail.jpg",
  },
  {
    id: 17,
    title: "Pretender",
    artist: "Official Hige Dandism",
    source: "asset/music/pretender.mp3",
    cover: "asset/cover/pretender-thumbnail.jpg",
  },
  {
    id: 18,
    title: "Spirits of the Seas",
    artist: "Yonezu Kenshi",
    source: "asset/music/spirits-of-the-seas.mp3",
    cover: "asset/cover/kanden-thumbnail.jpg",
  },
  {
    id: 19,
    title: "The Brave",
    artist: "YOASOBI",
    source: "asset/music/the-brave.mp3",
    cover: "asset/cover/the-brave-thumbnail.jpg",
  },
  {
    id: 20,
    title: "Where Our Blue Is",
    artist: "Tatsuya Kitani",
    source: "asset/music/where-our-blue-is.mp3",
    cover: "asset/cover/where-our-blue-is-thumbnail.jpg",
  },
];

export class MusicRepository {
  getMusicList(page, size) {
    const start = (page - 1) * size;
    const end = start + size;
    const totalPage = musics.length / size;

    const sliced = musics.slice(start, end);
    return {
      musics: sliced,
      totalPage: totalPage,
    };
  }
}

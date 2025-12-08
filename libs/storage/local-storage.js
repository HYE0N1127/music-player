/**
 * @description key: localStorage에 사용될 Key 값, value: Key 값과 매칭될 객체
 * 저장 될 아이템들: 플레이리스트, 현재 재생중인 노래
 */

export class Storage {
  set(key, value) {
    if (typeof value !== "object") {
      throw new Error("Storage can save only object type");
    }

    value = JSON.stringify(value);

    window.localStorage.setItem(key, value);
  }

  get(key) {
    const value = window.localStorage.getItem(key);

    try {
      return JSON.parse(value);
    } catch (error) {
      console.log(`Json parse error: ${error}`);
    }
  }

  clearItem(key) {
    window.localStorage.removeItem(key);
  }
}

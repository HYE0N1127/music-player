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
      console.error(`Json parse error: ${error}`);
    }
  }

  clearItem(key) {
    window.localStorage.removeItem(key);
  }
}

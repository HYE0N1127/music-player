export function addLongPressListener(element, callback, duration = 1000) {
  element.onmousedown = () => {
    const timer = setTimeout(callback, duration);

    element.onmouseup = () => {
      clearTimeout(timer);
    };
  };
}

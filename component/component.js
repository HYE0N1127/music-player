export class Component {
  element;

  constructor(htmlString) {
    const template = document.createElement("template");

    template.innerHTML = htmlString;

    this.element = template.content.firstElementChild;
  }

  attachTo(parent, position = "beforeend") {
    parent.insertAdjacentElement(position, this.element);
  }
}

export class RepaintableComponent extends Component {
  constructor(htmlString) {
    super(htmlString);
  }

  update(next) {
    const prev = Array.from(this.element.children) ?? [];

    next.forEach((element, index) => {
      const current = prev[index];
      const isChange = this.#isChange(current, element);

      if (isChange) {
        if (current) {
          this.element.replaceChild(element, current);
        } else {
          this.element.appendChild(element);
        }
      }
    });

    while (this.element.children.length > next.length) {
      this.element.lastElementChild.remove();
    }
  }

  #isChange(prev, next) {
    if (prev == null) {
      return true;
    }
    const prevId = prev.dataset.id;
    const nextId = next.dataset.id;

    return prevId !== nextId;
  }
}

// FIXME: 만약 PAGE_SIZE가 5라면 크기가 작기에 스크롤이 될 수 없어 무한 스크롤이 처음부터 동작하지 않음.
export class LazyScrollingComponent extends RepaintableComponent {
  #callback;

  constructor(htmlString, callback) {
    super(htmlString);
    this.#callback = callback;
    this.element.addEventListener("scroll", () => {
      this.#reachedBottom();
    });
  }

  #reachedBottom() {
    const { scrollTop, scrollHeight, clientHeight } = this.element;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (this.#callback) {
        this.#callback();
      }
    }
  }
}

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

// TODO: 중간 아이템이 지워진다면 지운 아이템의 뒷부분은 전부 재렌더링이 되는 현상이 있기에 고쳐볼것
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

// TODO: 만약 PAGE_SIZE가 5라면 크기가 작기에 스크롤이 될 수 없어 무한 스크롤이 처음부터 동작하지 않음. IntersectionObserver를 통해서 구현해볼 것
// Repaintable 상속 없이 Component를 상속해서 구현해보기
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

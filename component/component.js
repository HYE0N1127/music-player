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

export class InfiniteScrollComponent extends Component {
  #observer;
  #sentinel;

  constructor(callback) {
    super(`
      <div class="intersection"></div>  
    `);

    this.#sentinel = document.createElement("div");
    this.#sentinel.className = "sentinel";
    this.#sentinel.style.height = "40px";
    this.element.appendChild(this.#sentinel);

    this.#observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(entry.isIntersecting);
            callback();

            if (this.element.scrollHeight <= this.element.clientHeight) {
              callback();
            }
          }
        });
      },
      {
        root: this.element,
        threshold: 0.1,
      }
    );

    this.#observer.observe(this.#sentinel);
  }

  update(items) {
    console.log(this.element.scrollHeight, this.element.clientHeight);
    const previous = this.element.children.length - 1;
    const slice = items.slice(previous);

    slice.forEach((item) => {
      this.element.insertBefore(item, this.#sentinel);
    });
  }
}

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
    const prev = new Map();

    Array.from(this.element.children).forEach((child) => {
      if (child.dataset.id) {
        prev.set(child.dataset.id, child);
      }
    });

    next.forEach((item, index) => {
      const id = item.dataset.id;
      const exist = prev.get(id);

      const nodeAtCurrentIndex = this.element.children[index];

      if (exist) {
        prev.delete(id);

        if (nodeAtCurrentIndex !== exist) {
          this.element.insertBefore(exist, nodeAtCurrentIndex);
        }

        if (item !== exist) {
          this.element.replaceChild(item, exist);
        }
      } else {
        this.element.insertBefore(item, nodeAtCurrentIndex);
      }
    });

    prev.forEach((element) => {
      element.remove();
    });
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
    this.#sentinel.style.height = "1px";
    this.element.appendChild(this.#sentinel);

    this.#observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
    const previous = this.element.children.length - 1;
    const slice = items.slice(previous);

    items.forEach((item) => {
      this.element.insertBefore(item, this.#sentinel);
    });
  }
}

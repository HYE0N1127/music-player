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

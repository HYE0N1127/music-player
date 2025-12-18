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

  addChildren(children, position = "beforeend") {
    children.forEach((child) => child.attachTo(this.element));
  }
}

// TODO Rendering 다시 고쳐볼것
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
          this.element.replaceChild(item, nodeAtCurrentIndex);
        }
      } else {
        this.element.insertBefore(item, exist);
      }
    });

    prev.forEach((element) => {
      element.remove();
    });
  }
}

export class IntersectionComponent extends Component {
  constructor(callback) {
    super(`
      <div class="intersection"></div>  
    `);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      {
        threshold: 0,
      }
    );

    observer.observe(this.element);
  }
}

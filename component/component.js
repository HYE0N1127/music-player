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

      const current = this.element.children[index];

      // 삭제 removeChild, 순서 변경 insertBefore, 추가 appendChild

      if (exist) {
        if (exist !== current) {
          console.log("update");
          this.element.insertBefore(exist, current);
        }
        prev.delete(id);
      } else {
        console.log("append");
        this.element.appendChild(item);
      }
    });

    prev.forEach((item) => {
      item.remove();
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
            console.log("intersection");
            callback();
          }
        });
      },
      {
        root: document.querySelector(".music-list"),
        threshold: 0.1,
      }
    );

    observer.observe(this.element);
  }
}

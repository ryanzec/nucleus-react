export class DomDimensions {
  constructor(domElement) {
    this.domElement = domElement;
    this.dimensions = {};

    this.calculateDimensions();
  }

  getBodyOffsets(nodeClientRect) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
    const clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
    const clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
    const top = nodeClientRect.top + scrollTop - clientTop;
    const left = nodeClientRect.left + scrollLeft - clientLeft;

    return {
      top: Math.round(top),
      left: Math.round(left)
    };
  }

  calculateDimensions() {
    const nodeClientRect = this.domElement.getBoundingClientRect();
    const nodeComputedStyles = window.getComputedStyle(this.domElement);

    this.dimensions = {
      width: parseFloat(nodeClientRect.width),
      height: parseFloat(nodeClientRect.height),
      top: parseFloat(nodeClientRect.top),
      right: parseFloat(nodeClientRect.right),
      bottom: parseFloat(nodeClientRect.bottom),
      left: parseFloat(nodeClientRect.left),
      relativeTop: parseFloat(this.domElement.offsetTop),
      relativeLeft: parseFloat(this.domElement.offsetLeft),
      paddings: {
        top: parseFloat(nodeComputedStyles.paddingTop),
        right: parseFloat(nodeComputedStyles.paddingRight),
        bottom: parseFloat(nodeComputedStyles.paddingBottom),
        left: parseFloat(nodeComputedStyles.paddingLeft)
      },
      margins: {
        top: parseFloat(nodeComputedStyles.marginTop),
        right: parseFloat(nodeComputedStyles.marginRight),
        bottom: parseFloat(nodeComputedStyles.marginBottom),
        left: parseFloat(nodeComputedStyles.marginLeft)
      },
      borders: {
        top: parseFloat(nodeComputedStyles.borderTopWidth),
        right: parseFloat(nodeComputedStyles.borderRightWidth),
        bottom: parseFloat(nodeComputedStyles.borderBottomWidth),
        left: parseFloat(nodeComputedStyles.borderLeftWidth)
      },
      bodyOffset: this.getBodyOffsets(nodeClientRect)
    };
  }

  autoSetHeight() {
    this.domElement.style.height = `${this.domElement.scrollHeight + this.dimensions.borders.top + this.dimensions.borders.bottom}px`;
  }
}

export class DomEventManager {
  constructor() {
    this.managedDomEvents = [];
  }

  add(element, type, func) {
    element.addEventListener(type, func);

    this.managedDomEvents.push({
      element,
      type,
      func
    });
  }

  clear() {
    if (this.managedDomEvents.length > 0) {
      this.managedDomEvents.forEach((event) => {
        event.element.removeEventListener(event.type, event.func);
      });
    }
  }
}

export function getPageHeight() {
  const body = document.body;
  const html = document.documentElement;

  return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

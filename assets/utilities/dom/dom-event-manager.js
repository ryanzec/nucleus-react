export default class DomEventManager {
  constructor() {
    this.managedDomEvents = [];
  }

  add(element, type, func) {
    element.addEventListener(type, func);

    this.managedDomEvents.push({
      element: element,
      type: type,
      func: func
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

class EventCard extends HTMLElement {
    constructor() {
      super(); // always call super() first in the ctor.

      let shadowRoot = this.attachShadow({mode: 'open'});
      const t = document._currentScript.ownerDocument.querySelector('#event-card'); //http://stackoverflow.com/questions/24783504/html-import-own-webcomponent
      const instance = t.content.cloneNode(true);
      shadowRoot.appendChild(instance);
    }
};
customElements.define('event-card', EventCard);

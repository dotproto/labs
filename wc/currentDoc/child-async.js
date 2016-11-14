/* jshint esversion: 6 */
(function() {
  'use strict';

  class ImportedChild extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({mode: 'closed'});

      // Programmatically style the shadow root
      const style = document.createElement('style');
      style.innerText = ':host { display: block; background: LightSalmon; }';
      this._shadowRoot.appendChild(style);

      // Expose the BaseURI for debugging purposes
      const p = document.createElement('p');``
      p.innerHTML = `Child Async BaseURI: ${document.currentScript.baseURI}`;
      this._shadowRoot.appendChild(p);

      const doc = document.currentScript.ownerDocument;
      const template = doc.getElementById('child-async');
      if (template) {
        const instance = template.content.cloneNode(true);
        this._shadowRoot.insertBefore(instance, p);
      } else {
        console.error('Could not find "child-async"');
      }
    }
  }

  window.customElements.define('child-async', ImportedChild);
})();

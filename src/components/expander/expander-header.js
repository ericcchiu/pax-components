customElements.define('mdw-expander-header', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
  }

  connectedCallback() {
    this.parentNode.registerHeader(this);
  }

  registerArrow(arrow) {
    this.arrow = arrow;
  }

  open() {
    if (this.arrow) this.arrow.open();
  }

  close() {
    if (this.arrow) this.arrow.close();
  }

  htmtemplatel() {
    return html`
      <slot></slot>
    `;
  }
});

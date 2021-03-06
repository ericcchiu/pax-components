customElements.define('mdw-expander-container', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  disconnectedCallback() {
    if (this.header) this.header.removeEventListener('click', () => this.toggle);
  }

  registerHeader(header) {
    this.header = header;
    this.header.addEventListener('click', () => this.toggle());
  }

  registerContent(contentElement) {
    this.contentElement = contentElement;
  }

  toggle() {
    // do nothing if there is no content
    if (!this.contentElement) return;
    const open = this.classList.contains('open');
    if (open) {
      this.classList.remove('open');
      this.contentElement.close();
      this.header.close();
    } else {
      this.classList.add('open');
      this.contentElement.open();
      this.header.open();
    }
  }
})

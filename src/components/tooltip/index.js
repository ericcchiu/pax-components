customElements.define('mdw-tooltip', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  template() {
    return html`
      <div class="tooltip">
        <slot></slot>
      </div>
    `;
  }
});

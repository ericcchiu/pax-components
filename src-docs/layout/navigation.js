const { html } = require('@webformula/pax-core');

module.exports = () => html`
  <mdw-drawer class="navigation">
    <div class="header">
      <span class="main-title">PAX</span>
      <span class="main-title">WEB</span>
      <span class="main-title">COMPONENTS</span>
    </div>

    <div class="content">
      <nav>
        <span class="title">Documentation</span>
        <a href="#/">Getting started</a>

        <mdw-divider></mdw-divider>

        <span class="title">Components</span>
        <a href="#/components/buttons">Buttons</a>
        <a href="#/components/checkboxes">Checkboxes</a>
        <a href="#/components/circular-progress">Circular Progress</a>
        <a href="#/components/top-app-bar">Top app bar</a>
        <a href="#/components/drawers">Drawers</a>
      </nav>
    </div>
  </mdw-drawer>
`;

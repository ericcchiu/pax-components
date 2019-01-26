const path = require('path');
const fs = require('fs');

module.exports = class HTMLElementExtended {
  html() { return ''; }
  css() { return ''; }
  externalCSS() { return ''; }

  getCss() {
    if (this.cssFile) {
      if (!this._cssFileContent) this._cssFileContent = fs.readFileSync(path.join(__dirname, '../../',  this.cssFile()));
      return this._cssFileContent;
    }
    return this.css();
  }

  render() {}
  cloneTemplate() {}

  getTemplateElementAsIIFE(name) {
    return `(function(){
      var t=document.createElement('template');
      t.setAttribute('id','${name}');
      t.innerHTML=\`
      <style>
        ${this.getCss()}
      </style>
      <render-block>
        ${this.html()}
      </render-block>
      \`;
      document.body.insertAdjacentElement('beforeend', t);
    }());`;
  }

  getClassAsString(name) {
    let cstr = this.constructor.toString();
    // remove class declaration
    cstr = cstr.slice(cstr.indexOf('{') + 1, cstr.lastIndexOf('}'));
    // convert to camelcase and add a '$'
    const id = `$${name.replace(/\-([a-z])/g, m => m.toUpperCase()).replace(/-/,'')}`;

    // modify / add constructor
    const cpos = cstr.indexOf('constructor');
    if (cpos > -1) {
      const preConstructor = cstr.slice(0, cpos);
      let constructor = cstr.slice(cpos);
      const closingBracketIndex = constructor.search(/}[\n\r\s]+/g);
      const postConstructor = constructor.slice(closingBracketIndex + 1);

      constructor = constructor.slice(0, closingBracketIndex);
      constructor += `  this.setAttribute('id', '${id}');
  }`;
      cstr = preConstructor + constructor + postConstructor;
    } else {
      cstr = `constructor() {
        super();
        this.setAttribute('id', '${id}');
      }

      ${cstr}`;
    }

    return `
customElements.define("${name}", class extends HTMLElement {
  ${cstr}

  render() {
    const renderBlock = document.querySelector('render-block');
    if (!renderBlock) throw Error('Could not find <render-block>');
    renderBlock.innerHTML = this.html();
  }

  cloneTemplate() {
    var template = document.getElementById('${name}');
    var templateContent = template.content;
    var shadowRoot = this.shadowRoot ? this.shadowRoot : this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }
});
    `;
  }
};

class Grid extends HTMLElement {
  render() {
    const cols = Number(this.getAttribute('cols') || 0);
    const rows = Number(this.getAttribute('rows') || 0);
    const cells = this.getAttribute('cells')?.split(',') || [];
    const interval = this.getAttribute('inderval');

    this.innerHTML = `<div class="grid" style="display: grid; grid-template-columns: repeat(${cols}, 1fr); grid-template-rows: repeat(${rows}, 1fr);">
      ${Array.from(
        { length: cols * rows },
        (_, i) =>
          `<cell-component interval="${interval}" id="cell-${i}" is-live="${cells[i]}" rows="${rows}" cols="${cols}" position="${i}"></cell-component>`,
      ).join('')}
    </div>`;
  }
  connectedCallback() {
    this.render();
  }

  update() {
    this.render();
    const event = new CustomEvent('update');
    this.dispatchEvent(event);
  }
}

export default Grid;

class Cell extends HTMLElement {
  _isLive = false;
  _position = 0;
  _cols = 0;
  _rows = 0;
  _interval = 0;
  _timer = 0;

  get isLive() {
    return this._isLive;
  }

  constructor() {
    console.log('cell constructor');
    super();
    this._isLive = this.getAttribute('is-live') === 'true';
    this._position = Number(this.getAttribute('position') || 0);
    this._cols = Number(this.getAttribute('cols') || 0);
    this._rows = Number(this.getAttribute('rows') || 0);
    this._interval = Number(this.getAttribute('interval') || 10000);
    // setTimeout(() => {
    //   console.log('cell cont');
    //   this.isLiveCalculate();
    //   this.render();
    // }, 2000);
    // this._timer = setInterval(() => {
    //   console.log('frame');
    //   this.isLiveCalculate();
    //   this.render();
    // }, this._interval);
  }

  render() {
    this.innerHTML = `<div style="background-color: ${
      this._isLive ? 'white' : 'black'
    }">${this._position}</div>`;
  }

  connectedCallback() {
    setInterval(() => {
      this.isLiveCalculate();
      this.render();
    }, 1000);
    this.render();
  }

  isLiveCalculate() {
    console.log('calc');
    let amountNeighborsIsLive = 0;
    const neighborsPosition = [
      this._position - this._cols,
      this._position - this._cols + 1,
      this._position + 1,
      this._position + this._cols + 1,
      this._position + this._cols,
      this._position + this._cols - 1,
      this._position - 1,
      this._position - this._cols - 1,
    ];
    // Fixme: сделать бесконечную площадку
    neighborsPosition.forEach((position) => {
      amountNeighborsIsLive =
        amountNeighborsIsLive +
        Number(document.querySelector(`#cell-${position}`)?.isLive || 0);
    });
    this._isLive = this._isLive
      ? [2, 3].includes(amountNeighborsIsLive)
      : amountNeighborsIsLive === 3;
  }

  disconnectedCallback() {
    clearInterval(this._timer);
  }
}

export default Cell;

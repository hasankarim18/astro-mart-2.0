class ProductInfo extends HTMLElement {
  constructor() {
    super();
    this.initProductInfo();
  }

  initProductInfo() {
    console.log("init product info");
  }
}

customElements.define("product-info", ProductInfo);

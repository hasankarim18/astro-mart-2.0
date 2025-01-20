class ProductInfo extends HTMLElement {
  constructor() {
    super();
    this.initProductInfo();
  }

  initProductInfo() {
    console.log("init product info");
  }
}

class AstroVariantSelector extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("change", this.onVariantChange);
  }

  onVariantChange() {
    this.getSelectedOptions();
    this.getSelectedVariant();
    console.log(this.options);
  }

  getSelectedOptions() {
    this.options = Array.from(
      this.querySelectorAll("select"),
      (select) => select.value
    );
  }

  getVariantJson() {
    this.variantData =
      this.variantData ||
      JSON.parse(this.querySelector('[type="application/json"]').textContent);

    return this.variantData;
  }

  getSelectedVariant() {
    this.currentVariant = this.getVariantJson().find((variant) => {
      const findings = !variant.options
        .map((option, index) => {
          return this.options[index] === option;
        })
        .includes(false);

      if (findings) return variant;
    });
    console.log(this.currentVariant);
  }
}

customElements.define("astro-variant-selector", AstroVariantSelector);

// variant selector by radio buttons  #swatches

/*
  steps
  1. get Selected variants by getSelectedRadios (this is different from <select> </select> ) from the html form
  2. get variantJson embeded from the html  inside first for loop <script type="application/json"> {{ product.variants | json }} </script>
  3. find the specific variantData from the step one array such as ["small", "blue"] and match it with the product.variants from the step 3

*/

class AstroVariantRadio extends HTMLElement {
  options = [];
  constructor() {
    super();
    this.addEventListener("change", this.onRadioSelect);
  }

  //  main function
  onRadioSelect() {
    this.getSelectedRadios();
    this.getSelectedVariant();

    console.log("radio values", this.options);
    // console.log(this.currentVariant);
  }

  // step 1
  getSelectedRadios() {
    // Get all the radio groups within the component
    const radioGroups = Array.from(
      new Set(
        Array.from(this.querySelectorAll('input[type="radio"]')).map(
          (input) => input.name
        )
      )
    );
    // Find the selected radio button for each group and store its value
    this.options = radioGroups
      .map((group) => {
        const selectedRadio = this.querySelector(
          `input[type="radio"][name="${group}"]:checked`
        );
        return selectedRadio ? selectedRadio.value : null;
      })
      .filter((value) => value !== null); // Exclude any null (unselected) values

    return this.options;
  }
  // step 2
  getVariantJson() {
    this.variantData =
      this.variantData ||
      JSON.parse(this.querySelector('[type="application/json"]').textContent);

    return this.variantData;
  }

  // tep 3 find the specific variantData ex. this.options = ["small", "blue"]
  getSelectedVariant() {
    this.currentVariant = this.getVariantJson().find((variant) => {
      const findings = !variant.options
        .map((option, index) => {
          return this.options[index] === option;
        })
        .includes(false);

      if (findings) return variant;
    });
    console.log(this.currentVariant);
    return this.currentVariant;
  }
}

customElements.define("astro-variant-radio", AstroVariantRadio);

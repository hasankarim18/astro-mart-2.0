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
    if (this.currentVariant) {
      this.updateUrl();
    }
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

  updateUrl() {
    if (!this.currentVariant) return;

    window.history.replaceState(
      {},
      "",
      `${this.dataset.url}?variant=${this.currentVariant.id}`
    );
  }
}

customElements.define("astro-variant-selector", AstroVariantSelector);

// variant selector by radio buttons  #swatches

/*
  steps
  1. get Selected variants by getSelectedRadios (this is different from <select> </select> ) from the html form
  2. get variantJson embeded from the html  inside first for loop <script type="application/json"> {{ product.variants | json }} </script>
  3. find the specific variantData from the step one array such as ["small", "blue"] and match it with the product.variants from the step 3

  // after finding the variant

  4. we are going to change
    a. price
    b. id inside the form hidden tag
    c. change the url
    d. change the featured image

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
    if (this.currentVariant) {
      this.updateUrl();
      this.updateFeatureImage();
      this.updateVariantId();
      this.updateUi();
    }
    //   console.log("radio values", this.options);
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
    // console.log(this.currentVariant);
    // return this.currentVariant;
  }

  updateUrl() {
    if (!this.currentVariant) return;
    window.history.replaceState(
      {},
      "",
      `${this.dataset.url}?variant=${this.currentVariant.id}`
    );
  }

  updateFeatureImage() {
    const f_image_tag = document.getElementById("product_feature_image");
    const currentVariant = this.currentVariant;

    if (currentVariant.featured_image.src !== "") {
      const variant_img_src = currentVariant.featured_image.src;
      f_image_tag.src = variant_img_src;
    } else {
      console.log("nofeature image");
    }
  }

  updateVariantId() {
    const currentVariant = this.currentVariant;
    const form_input = document
      .querySelector("#product_form")
      .querySelector(`input[name="id"]`);
    if (!this.currentVariant) return;
    form_input.value = currentVariant.id;
  }

  updateUi() {
    if (!this.currentVariant) return;
    const buyButtons = document.querySelectorAll("button[data-buy-button]");
    buyButtons.forEach((btn) => {
      btn.disabled = true;
      btn.classList.add("disabled");
    });
    fetch(
      `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.section}`
    )
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        const id = `product_price-${this.dataset.section}`;
        const html = new DOMParser().parseFromString(responseText, "text/html");

        const oldPrice = document.getElementById(id);
        const newPrice = html.getElementById(id);
        if (oldPrice && newPrice) oldPrice.innerHTML = newPrice.innerHTML;
        // update availability
        const oldRadio_variant_selector_div = document.getElementById(
          `radio_variant_selector_div-${this.dataset.section}`
        );
        const newRadio_variant_selector_div = html.getElementById(
          `radio_variant_selector_div-${this.dataset.section}`
        );

        if (oldRadio_variant_selector_div && newRadio_variant_selector_div)
          oldRadio_variant_selector_div.innerHTML =
            newRadio_variant_selector_div.innerHTML;

        // update add tocart section
        const oldProductAddToCart = document.getElementById(
          `product_addtocart-${this.dataset.section}`
        );
        const newProductAddToCart = html.getElementById(
          `product_addtocart-${this.dataset.section}`
        );
        if (oldProductAddToCart && newProductAddToCart) {
          oldProductAddToCart.innerHTML = newProductAddToCart.innerHTML;
        }
      })
      .catch((error) => {
        const errorMessage = document.getElementById("variant_error");
        errorMessage.classList.remove("thidden");
        console.error("Error during fetch", error);
      })
      .finally(() => {
        buyButtons.forEach((btn) => {
          btn.disabled = false;
          btn.classList.remove("disabled");
        });
      });
  }
}

customElements.define("astro-variant-radio", AstroVariantRadio);

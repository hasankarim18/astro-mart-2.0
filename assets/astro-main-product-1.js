document.addEventListener("DOMContentLoaded", () => {
  class ProductFeatureImageModal extends HTMLElement {
    constructor() {
      super();
      this.initModal();
    }

    initModal() {
      const img = this.querySelector("img");
      const modal = document.getElementById("gallery-modal");
      const closeModal = modal.querySelector("button");
      const modalBody = document.getElementById("image-modal-body");
      const modalBg = document.getElementById("modal-bg");

      img.addEventListener("click", () => {
        modal.classList.remove("hidden");
        const image = `<img class="hover-animation-start" src="${img.getAttribute(
          "src"
        )}" width="100%" height="100%">`;
        modalBody.innerHTML = image;
        const imageElement = modal.querySelector("img");
        setTimeout(() => {
          imageElement.classList.remove("hover-animation-start");
          imageElement.classList.add("hover-animation-end");
        }, 10);
      });

      closeModal.addEventListener("click", (e) => {
        const modal = document.getElementById("gallery-modal");

        const modalBody = document.getElementById("image-modal-body");
        const imageElement = modal.querySelector("img");
        imageElement.classList.remove("hover-animation-end");
        imageElement.classList.add("hover-animation-start");

        setTimeout(() => {
          modal.classList.remove("block");
          modal.classList.add("hidden");
          modalBody.innerHTML = "";
        }, 100);
      });

      modalBg.addEventListener("click", (e) => {
        if (e.target !== modalBg) return;
        if (e.target === modalBg) {
          const modalBody = document.getElementById("image-modal-body");
          const imageElement = modal.querySelector("img");
          imageElement.classList.remove("hover-animation-end");
          imageElement.classList.add("hover-animation-start");

          setTimeout(() => {
            modal.classList.remove("block");
            modal.classList.add("hidden");
            modalBody.innerHTML = "";
          }, 100);
        }
      });
    }
  }

  const productfeatureImageModal = customElements.define(
    "product-feature-image",
    ProductFeatureImageModal
  );
});

/*

class ProductFeatureImageModal extends HTMLElement {
  constructor() {
    super();
    this.initModal();
  }

  initModal() {
    const img = this.querySelector("img");
    if (!img) {
      console.error("No <img> element found inside the custom component.");
      return;
    }

    // Create modal HTML dynamically
    this.createModal();

    const modal = document.getElementById("gallery-modal");
    const modalBody = modal.querySelector(".feature-image-gallery-modal-body");
    const closeModal = modal.querySelector(".close-gallery-modal button");
    const modalBg = modal.querySelector(".modal-bg");

    // Open modal on image click
    img.addEventListener("click", () => this.openModal(modal, modalBody, img));

    // Close modal on button click
    closeModal.addEventListener("click", () => this.closeModal(modal, modalBody));

    // Close modal on background click
    modalBg.addEventListener("click", (e) => {
      if (e.target === modalBg) this.closeModal(modal, modalBody);
    });
  }

  createModal() {
    // Check if the modal already exists in the DOM
    if (document.getElementById("gallery-modal")) return;

    // Modal structure
    const modalHTML = `
      <div id="gallery-modal" class="feature-image-gallery-modal hidden">
        <div class="modal-bg"></div>
        <div class="close-gallery-modal">
          <button>Close</button>
        </div>
        <div class="feature-image-gallery-modal-body"></div>
      </div>
    `;

    // Append the modal to the body
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  openModal(modal, modalBody, img) {
    modal.classList.remove("hidden");
    const imageHtml = `<img class="hover-animation-start" src="${img.getAttribute(
      "src"
    )}" width="100%" height="100%">`;
    modalBody.innerHTML = imageHtml;

    const imageElement = modal.querySelector("img");
    setTimeout(() => {
      imageElement.classList.remove("hover-animation-start");
      imageElement.classList.add("hover-animation-end");
    }, 10);
  }

  closeModal(modal, modalBody) {
    const imageElement = modal.querySelector("img");
    if (imageElement) {
      imageElement.classList.remove("hover-animation-end");
      imageElement.classList.add("hover-animation-start");
    }

    setTimeout(() => {
      modal.classList.add("hidden");
      modalBody.innerHTML = "";
    }, 100);
  }
}

customElements.define("product-feature-image", ProductFeatureImageModal);

*/

class ImageModalViewer extends HTMLElement {
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

    const modal = document.getElementById("image_modal_wrapper");
    const modalBody = modal.querySelector(".image_modal_body");
    const closeModal = modal.querySelector(".close_image_modal button");
    const modalBg = modal.querySelector(".image_modal_bg");

    // Open modal on image click
    img.addEventListener("click", () => this.openModal(modal, modalBody, img));

    // Close modal on button click
    closeModal.addEventListener("click", () =>
      this.closeModal(modal, modalBody)
    );

    // Close modal on background click
    modalBg.addEventListener("click", (e) => {
      if (e.target === modalBg) this.closeModal(modal, modalBody);
    });
  }

  createModal() {
    // Check if the modal already exists in the DOM
    if (document.getElementById("image_modal_wrapper")) return;

    // Modal structure
    const modalHTML = `
          <div id="image_modal_wrapper" class="feature-image-gallery-modal hidden">
            <div style="display:block" class="image_modal_bg"></div>
            <div class="close_image_modal">
              <button>Close</button>
            </div>
            <div class="image_modal_body"></div>
          </div>
        `;

    // Append the modal to the body
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  openModal(modal, modalBody, img) {
    modal.classList.remove("hidden");
    const imageHtml = `<img style="max-height:90vh; width:100%;" class="hover-animation-start" src="${img.getAttribute(
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

customElements.define("image-modal-viewer", ImageModalViewer);

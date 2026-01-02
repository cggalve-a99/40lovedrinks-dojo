(function(w, d) {
  productDetails = () => {
    const viewMore = d.querySelector("#show-more-details");
    if (viewMore) {
      viewMore.addEventListener("click", function(e) {
        const dataValue = this.dataset.value;
        this.dataset.value = dataValue === "more" ? "less" : "more";
        this.textContent = dataValue === "more" ? "View Less" : "View More";
        d.querySelectorAll(".product__description--data:not(:first-of-type)").forEach((el) => {
          el.classList.toggle("active", dataValue === "more");
        });
      });
    }
  };
  productOptions = () => {
    const optionButtons = d.querySelectorAll(".product__purchase-options--buttons .btn");
    optionButtons.forEach((button) => {
      button.addEventListener("click", function() {
        optionButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
      });
    });
  };
  d.addEventListener("DOMContentLoaded", function() {
    productDetails();
    productOptions();
  });
})(window, document);

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
  d.addEventListener("DOMContentLoaded", function() {
    productDetails();
  });
})(window, document);

(function(w, d) {
  function debounce(fn, delay = 200) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
  }
  const updateCart = debounce((line, quantity) => {
    fetch('/cart/change.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            line: line,
            quantity: quantity
        })
    })
    .then(res => res.json())
    .then(() => {
        window.location.reload();
    })
    .catch(err => console.error('Cart update error:', err));
  }, 500); 
  productSlider = () => {
    const slider = d.querySelectorAll(".product-slider-element");
    if (slider) {
    slider.forEach((sliderElement) => {
        const splideContainer = new Splide(sliderElement, {
        type: "loop",
        perPage: 3,
        gap: "40px",
        autoplay: false,
        pagination: false,
        arrows: false,
        breakpoints: {
            991: {
            perPage: 2,
            gap: "16px"
            },
            430: {
            perPage: 1,
            gap: "0px"
            }
        }
        }).mount();
        const wrapper = sliderElement.closest(".product-slider");
        if (!wrapper) return;
        const arrows = wrapper.querySelectorAll(".product-slider__arrow");
        if (!arrows.length) {
        console.warn("No custom arrows found for slider:", sliderElement);
        return;
        }
        arrows.forEach((arrow) => {
        arrow.addEventListener("click", () => {
            const direction = arrow.dataset.id;
            splideContainer.go(direction);
        });
        });
    });
    }
  };
  plyrIO = () => {
      const videoPlayer = document.querySelector("#video-player");
      if (videoPlayer) {
      const player = new Plyr("#video-player", {
          autoplay: true,
          controls: [],
          settings: ["loop"]
      });
      player.play();
      }
  };
  testimonials = () => {
      const slider = d.querySelector("#testimonials");
      if (slider) {
      const splideContainer = new Splide("#testimonials", {
          type: "loop",
          perPage: 6,
          gap: "16px",
          autoplay: false,
          pagination: false,
          arrows: false,
          breakpoints: {
          991: { perPage: 3 },
          430: { perPage: 2 }
          }
      }).mount();
      const arrows = document.querySelectorAll(".testimonials__slider--arrow");
      if (!arrows.length) {
          console.warn("No custom arrows found");
          return;
      }
      arrows.forEach((arrow) => {
          arrow.addEventListener("click", () => {
          const direction = arrow.dataset.direction;
          console.log(`Arrow Direction ${direction}`);
          splideContainer.go(direction);
          });
      });
      }
  };
  featuredTestimonials = () => {
      const slider = d.querySelector("#featured-testimonial");
      if (slider) {
      new Splide("#featured-testimonial", {
          type: "loop",
          perPage: 2,
          gap: "16px",
          autoplay: false,
          pagination: false,
          arrows: false
      }).mount();
      }
  };
  siteFAQ = () => {
      const faq = d.querySelector(".site-faq");
      if (faq) {
      const trigger = d.querySelectorAll(".site-faq__title");
      trigger.forEach(function(title) {
          title.addEventListener("click", function(e) {
          const parent = title.closest(".site-faq__list");
          const content = title.nextElementSibling;
          if (!title.classList.contains("active")) {
              parent.querySelectorAll(".site-faq__title.active").forEach((t) => t.classList.remove("active"));
              parent.querySelectorAll(".site-faq__content.active").forEach((c) => c.classList.remove("active"));
              title.classList.add("active");
              content.classList.add("active");
          } else {
              title.classList.remove("active");
              content.classList.remove("active");
          }
          });
      });
      }
  };
  brandsSlider = () => {
      const brandSlider = d.querySelector("#brands-slider");
      if (brandSlider) {
      new Splide("#brands-slider", {
          type: "slide",
          perPage: 8,
          autoplay: false,
          pagination: false,
          arrows: false,
          breakpoints: {
          991: { perPage: 4 },
          430: { perPage: 2 }
          }
      }).mount();
      }
  };
  quantityHandler = () => {
      // Handle clicks on any .qty-button (works for multiple wrappers)
      d.addEventListener('click', e => {
          const button = e.target.closest('.qty-button');
          if (!button) return;

          e.preventDefault();

          const wrapper = button.closest('.product__qty');
          let input, context, line;

          if (wrapper) {
              input = wrapper.querySelector('.product__qty--value');
              context = wrapper.dataset.context;
              line = wrapper.dataset.line;
          } else {
              input = document.getElementById("quantity");
          }

          if (!input) return;

          let value = parseInt(input.value, 10) || 1;

          if (button.dataset.operation === 'add') value++;
          if (button.dataset.operation === 'minus') value = Math.max(1, value - 1);

          input.value = value;

          if (context === 'cart' && line) {
              updateCart(line, value);
          }
      });
  };
  d.addEventListener("DOMContentLoaded", function() {
    productSlider();
    testimonials();
    featuredTestimonials();
    plyrIO();
    siteFAQ();
    brandsSlider();
    quantityHandler();
  });
})(window, document);

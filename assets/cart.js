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
    }, 500); // ⏱ debounce delay

    quantityHandlers = () => {
        document.addEventListener('click', e => {
        const button = e.target.closest('.qty-button');
        if (!button) return;

        const wrapper = button.closest('.product__qty');
        const input = wrapper.querySelector('.product__qty--value');
        const context = wrapper.dataset.context;
        const line = wrapper.dataset.line;

        let value = parseInt(input.value, 10) || 1;

        if (button.dataset.operation === 'add') value++;
        if (button.dataset.operation === 'minus' && value > 1) value--;

        input.value = value;

        // 🛒 CART PAGE ONLY
        if (context === 'cart' && line) {
            updateCart(line, value);
        }
    });
    };
    
    d.addEventListener("DOMContentLoaded", function() {
        quantityHandlers();
    });
})(window, document);

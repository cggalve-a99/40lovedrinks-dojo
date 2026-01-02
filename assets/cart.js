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
    
    d.addEventListener("DOMContentLoaded", function() {        
    });
})(window, document);

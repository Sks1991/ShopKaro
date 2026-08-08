
// =========================================
// SHOPKARO - JAVASCRIPT
// =========================================


// Cart count
let cartCount = 0;


// Add product to cart
function addToCart() {

    // Increase cart count
    cartCount++;

    // Update cart count on screen
    document.getElementById("cart-count").innerText = cartCount;

    // Show confirmation message
    alert("Product added to cart!");
}


// =========================================
// SHOPKARO - HOME PAGE JAVASCRIPT
// =========================================


// =========================================
// HOME PRODUCT DATA
// =========================================

var homeProducts = [

    {
        id: 1,
        name: "Premium Headphones",
        price: 999,
        image: "images/product1.jpg"
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 1499,
        image: "images/product2.jpg"
    },

    {
        id: 3,
        name: "Smart Phone",
        price: 1999,
        image: "images/product3.jpg"
    }

];


// =========================================
// GET CART
// =========================================

function getHomeCart() {

    var savedCart =
        localStorage.getItem("shopkaroCart");


    if (!savedCart) {

        return [];

    }


    try {

        return JSON.parse(savedCart);

    } catch (error) {

        return [];

    }

}


// =========================================
// UPDATE CART COUNT
// =========================================

function updateHomeCartCount() {

    var cart =
        getHomeCart();


    var count = 0;


    for (
        var i = 0;
        i < cart.length;
        i++
    ) {

        count =
            count +
            Number(cart[i].quantity);

    }


    var cartCount =
        document.getElementById(
            "cart-count"
        );


    if (cartCount) {

        cartCount.innerText =
            count;

    }

}


// =========================================
// ADD HOME PRODUCT TO CART
// =========================================

function addToCart(productName, productPrice) {

    var product = null;


    // Find the selected product

    for (
        var i = 0;
        i < homeProducts.length;
        i++
    ) {

        if (
            homeProducts[i].name ===
            productName
        ) {

            product =
                homeProducts[i];

            break;

        }

    }


    if (!product) {

        alert("Product not found.");

        return;

    }


    // Get existing cart

    var cart =
        getHomeCart();


    // Check only this product

    var existingProduct = null;


    for (
        var j = 0;
        j < cart.length;
        j++
    ) {

        if (
            Number(cart[j].id) ===
            Number(product.id)
        ) {

            existingProduct =
                cart[j];

            break;

        }

    }


    // If this SAME product already exists,
    // increase only this product quantity.

    if (existingProduct) {

        existingProduct.quantity =
            Number(
                existingProduct.quantity
            ) + 1;

    }


    // If this is a NEW product,
    // always start from quantity 1.

    else {

        cart.push({

            id:
                product.id,

            name:
                product.name,

            price:
                Number(product.price),

            image:
                product.image,

            quantity:
                1

        });

    }


    // Save cart

    localStorage.setItem(
        "shopkaroCart",
        JSON.stringify(cart)
    );


    // Update cart count

    updateHomeCartCount();


    alert(
        product.name +
        " added to cart successfully!"
    );

}


// =========================================
// PAGE LOAD
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateHomeCartCount();

    }
);
// =========================================
// SHOPKARO - PRODUCT DETAILS
// =========================================


var products = [

    {
        id: 1,
        name: "Premium Headphones",
        price: 999,
        image: "images/product1.jpg",
        description:
            "High-quality headphones with clear sound and comfortable design."
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 1499,
        image: "images/product2.jpg",
        description:
            "Stylish smart watch for your everyday activities."
    },

    {
        id: 3,
        name: "Smart Phone",
        price: 1999,
        image: "images/product3.jpg",
        description:
            "Modern smartphone with powerful everyday features."
    },

    {
        id: 4,
        name: "Wireless Earbuds",
        price: 799,
        image: "images/product4.jpg",
        description:
            "Compact wireless earbuds with great sound quality."
    },

    {
        id: 5,
        name: "Laptop",
        price: 49999,
        image: "images/product5.jpg",
        description:
            "Powerful laptop suitable for work, study and entertainment."
    },

    {
        id: 6,
        name: "Running Shoes",
        price: 1299,
        image: "images/product6.jpg",
        description:
            "Comfortable running shoes designed for everyday use."
    }

];


var quantity = 1;


// =========================================
// GET PRODUCT ID
// =========================================

function getProductId() {

    var search =
        window.location.search;


    var match =
        search.match(
            /[?&]id=([^&]+)/
        );


    if (match) {

        return match[1];

    }


    return null;

}


// =========================================
// LOAD PRODUCT
// =========================================

function loadProduct() {

    var productId =
        getProductId();


    var product = null;


    for (
        var i = 0;
        i < products.length;
        i++
    ) {

        if (
            products[i].id ===
            Number(productId)
        ) {

            product =
                products[i];

            break;

        }

    }


    var container =
        document.getElementById(
            "productDetails"
        );


    if (!container) {

        return;

    }


    if (!product) {

        container.innerHTML =
            "<h2>Product not found</h2>";

        return;

    }


    container.innerHTML =

        '<div class="details-image">' +

            '<img ' +
                'src="' + product.image + '" ' +
                'alt="' + product.name + '">' +

        '</div>' +


        '<div class="details-info">' +

            '<h1>' +
                product.name +
            '</h1>' +


            '<div class="details-price">' +

                '₹' +
                product.price.toLocaleString(
                    "en-IN"
                ) +

            '</div>' +


            '<p class="details-description">' +

                product.description +

            '</p>' +


            '<div class="quantity-box">' +

                '<button ' +
                    'type="button" ' +
                    'id="minusBtn">' +

                    '-' +

                '</button>' +


                '<span id="quantity">' +

                    quantity +

                '</span>' +


                '<button ' +
                    'type="button" ' +
                    'id="plusBtn">' +

                    '+' +

                '</button>' +

            '</div>' +


            '<button ' +
                'type="button" ' +
                'class="add-product-btn" ' +
                'id="addProductButton">' +

                'Add to Cart' +

            '</button>' +


            '<a ' +
                'href="products.html" ' +
                'class="back-products">' +

                '← Back to Products' +

            '</a>' +

        '</div>';



    document.getElementById(
        "minusBtn"
    ).addEventListener(
        "click",
        function() {

            if (quantity > 1) {

                quantity--;

                document.getElementById(
                    "quantity"
                ).innerText =
                    quantity;

            }

        }
    );



    document.getElementById(
        "plusBtn"
    ).addEventListener(
        "click",
        function() {

            quantity++;

            document.getElementById(
                "quantity"
            ).innerText =
                quantity;

        }
    );



    document.getElementById(
        "addProductButton"
    ).addEventListener(
        "click",
        function() {

            addToCart(product);

        }
    );

}


// =========================================
// ADD TO CART
// =========================================

function addToCart(product) {

    var savedCart =
        localStorage.getItem(
            "shopkaroCart"
        );


    var cart = [];


    if (savedCart) {

        try {

            cart =
                JSON.parse(savedCart);

        } catch (error) {

            cart = [];

        }

    }


    var existingProduct =
        null;


    for (
        var i = 0;
        i < cart.length;
        i++
    ) {

        if (
            Number(cart[i].id) ===
            product.id
        ) {

            existingProduct =
                cart[i];

            break;

        }

    }


    if (existingProduct) {

        existingProduct.quantity =
            Number(
                existingProduct.quantity
            ) + quantity;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: quantity

        });

    }


    localStorage.setItem(
        "shopkaroCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        product.name +
        " added to cart successfully!"
    );

}


// =========================================
// CART COUNT
// =========================================

function updateCartCount() {

    var savedCart =
        localStorage.getItem(
            "shopkaroCart"
        );


    var count = 0;


    if (savedCart) {

        try {

            var cart =
                JSON.parse(savedCart);


            for (
                var i = 0;
                i < cart.length;
                i++
            ) {

                count =
                    count +
                    Number(
                        cart[i].quantity
                    );

            }

        } catch (error) {

            count = 0;

        }

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
// PAGE LOAD
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadProduct();

        updateCartCount();

    }
);
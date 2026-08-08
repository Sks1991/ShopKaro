const products = [
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
    },
    {
        id: 4,
        name: "Wireless Earbuds",
        price: 799,
        image: "images/product4.jpg"
    },
    {
        id: 5,
        name: "Laptop",
        price: 49999,
        image: "images/product5.jpg"
    },
    {
        id: 6,
        name: "Running Shoes",
        price: 1299,
        image: "images/product6.jpg"
    }
];


function getCart() {

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


function saveCart(cart) {

    localStorage.setItem(
        "shopkaroCart",
        JSON.stringify(cart)
    );
}


function updateCartCount() {

    var cart = getCart();

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
        document.getElementById("cart-count");


    if (cartCount) {

        cartCount.innerText = count;

    }
}


function addProductToCart(productId) {

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

            product = products[i];

            break;

        }
    }


    if (!product) {

        alert("Product not found.");

        return;

    }


    var cart = getCart();


    var existingProduct = null;


    for (
        var j = 0;
        j < cart.length;
        j++
    ) {

        if (
            cart[j].id ===
            product.id
        ) {

            existingProduct =
                cart[j];

            break;

        }
    }


    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity) + 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart(cart);

    updateCartCount();


    alert(
        product.name +
        " added to cart successfully!"
    );
}


function setupAddToCartButtons() {

    var buttons =
        document.querySelectorAll(
            ".add-cart-btn"
        );


    for (
        var i = 0;
        i < buttons.length;
        i++
    ) {

        buttons[i].addEventListener(
            "click",
            function() {

                var productId =
                    this.getAttribute(
                        "data-id"
                    );


                /*
                 If data-id is missing,
                 use button position.
                */

                if (!productId) {

                    for (
                        var j = 0;
                        j < buttons.length;
                        j++
                    ) {

                        if (
                            buttons[j] === this
                        ) {

                            productId =
                                j + 1;

                            break;

                        }

                    }

                }


                addProductToCart(
                    productId
                );

            }
        );

    }

}


function searchProducts() {

    var input =
        document.getElementById(
            "searchInput"
        );


    if (!input) {

        return;

    }


    var searchValue =
        input.value
            .toLowerCase()
            .trim();


    var cards =
        document.querySelectorAll(
            ".shop-product-card"
        );


    var found = 0;


    for (
        var i = 0;
        i < cards.length;
        i++
    ) {

        var name =
            cards[i]
                .getAttribute(
                    "data-name"
                )
                .toLowerCase();


        if (
            name.indexOf(searchValue) !== -1
        ) {

            cards[i].style.display =
                "flex";

            found++;

        } else {

            cards[i].style.display =
                "none";

        }

    }


    var noResults =
        document.getElementById(
            "noResults"
        );


    if (!noResults) {

        return;

    }


    if (found === 0) {

        noResults.style.display =
            "block";

    } else {

        noResults.style.display =
            "none";

    }
}


function setupSearch() {

    var input =
        document.getElementById(
            "searchInput"
        );


    var button =
        document.getElementById(
            "searchButton"
        );


    if (input) {

        input.addEventListener(
            "input",
            searchProducts
        );

    }


    if (button) {

        button.addEventListener(
            "click",
            searchProducts
        );

    }
}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        setupAddToCartButtons();

        setupSearch();

    }
);
// =========================================
// SHOPKARO - CART
// =========================================


// =========================================
// GET CART
// =========================================

function getCart() {

    var data =
        localStorage.getItem("shopkaroCart");


    if (!data) {

        return [];

    }


    try {

        return JSON.parse(data);

    } catch (error) {

        console.log(
            "Cart data could not be read."
        );

        return [];

    }

}


// =========================================
// SAVE CART
// =========================================

function saveCart(cart) {

    localStorage.setItem(
        "shopkaroCart",
        JSON.stringify(cart)
    );

}


// =========================================
// CART COUNT
// =========================================

function updateCartCount() {

    var cart =
        getCart();


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


    var element =
        document.getElementById(
            "cart-count"
        );


    if (element) {

        element.innerText =
            count;

    }

}


// =========================================
// PRICE FORMAT
// =========================================

function formatPrice(price) {

    return "Rs. " +
        Number(price).toLocaleString(
            "en-IN"
        );

}


// =========================================
// DISPLAY CART
// =========================================

function displayCart() {

    var cart =
        getCart();


    var container =
        document.getElementById(
            "cartContainer"
        );


    if (!container) {

        console.log(
            "cartContainer not found."
        );

        return;

    }


    // =====================================
    // EMPTY CART
    // =====================================

    if (cart.length === 0) {

        container.innerHTML =

            '<div class="cart-items">' +

                '<div class="empty-cart">' +

                    '<div class="empty-cart-icon">' +
                        'Cart' +
                    '</div>' +

                    '<h2>' +
                        'Your cart is empty' +
                    '</h2>' +

                    '<p>' +
                        'Add some products to your cart to continue shopping.' +
                    '</p>' +

                    '<a ' +
                        'href="products.html" ' +
                        'class="shop-products-btn">' +

                        'Shop Products' +

                    '</a>' +

                '</div>' +

            '</div>';

        return;

    }


    // =====================================
    // CART ITEMS
    // =====================================

    var subtotal = 0;


    var itemsHTML =
        '<div class="cart-items">';


    for (
        var i = 0;
        i < cart.length;
        i++
    ) {

        var item =
            cart[i];


        var price =
            Number(item.price);


        var quantity =
            Number(item.quantity);


        var itemTotal =
            price * quantity;


        subtotal =
            subtotal + itemTotal;


        itemsHTML +=

            '<div class="cart-item">' +


                '<div class="cart-item-image">' +

                    '<img ' +
                        'src="' + item.image + '" ' +
                        'alt="' + item.name + '">' +

                '</div>' +


                '<div class="cart-item-info">' +

                    '<h3>' +
                        item.name +
                    '</h3>' +


                    '<p class="cart-item-price">' +

                        formatPrice(price) +

                    '</p>' +


                    '<div class="cart-quantity">' +


                        '<button ' +

                            'type="button" ' +

                            'onclick="decreaseCartQuantity(' +
                            item.id +
                            ')">' +

                            '-' +

                        '</button>' +


                        '<span>' +

                            quantity +

                        '</span>' +


                        '<button ' +

                            'type="button" ' +

                            'onclick="increaseCartQuantity(' +
                            item.id +
                            ')">' +

                            '+' +

                        '</button>' +


                    '</div>' +


                    '<button ' +

                        'type="button" ' +

                        'class="remove-btn" ' +

                        'onclick="removeFromCart(' +
                        item.id +
                        ')">' +

                        'Remove' +

                    '</button>' +


                '</div>' +


                '<div class="cart-item-total">' +

                    formatPrice(itemTotal) +

                '</div>' +


            '</div>';

    }


    itemsHTML +=
        '</div>';


    // =====================================
    // DELIVERY
    // =====================================

    var delivery = 0;


    if (subtotal < 1000) {

        delivery = 50;

    }


    // =====================================
    // TOTAL
    // =====================================

    var total =
        subtotal + delivery;


    // =====================================
    // SUMMARY
    // =====================================

    var summaryHTML =

        '<div class="cart-summary">' +

            '<h2>' +
                'Order Summary' +
            '</h2>' +


            '<div class="summary-row">' +

                '<span>' +
                    'Subtotal' +
                '</span>' +

                '<span>' +
                    formatPrice(subtotal) +
                '</span>' +

            '</div>' +


            '<div class="summary-row">' +

                '<span>' +
                    'Delivery' +
                '</span>' +

                '<span>' +

                    (
                        delivery === 0
                        ? "FREE"
                        : formatPrice(delivery)
                    ) +

                '</span>' +

            '</div>' +


            '<div class="summary-row summary-total">' +

                '<span>' +
                    'Total' +
                '</span>' +

                '<span>' +
                    formatPrice(total) +
                '</span>' +

            '</div>' +


            '<button ' +

                'type="button" ' +

                'class="checkout-btn" ' +

                'onclick="checkout()">' +

                'Proceed to Checkout' +

            '</button>' +


            '<a ' +

                'href="products.html" ' +

                'class="continue-btn">' +

                'Continue Shopping' +

            '</a>' +


        '</div>';


    container.innerHTML =
        itemsHTML + summaryHTML;

}


// =========================================
// INCREASE QUANTITY
// =========================================

function increaseCartQuantity(id) {

    var cart =
        getCart();


    for (
        var i = 0;
        i < cart.length;
        i++
    ) {

        if (
            String(cart[i].id) ===
            String(id)
        ) {

            cart[i].quantity =
                Number(cart[i].quantity) + 1;

            break;

        }

    }


    saveCart(cart);

    displayCart();

    updateCartCount();

}


// =========================================
// DECREASE QUANTITY
// =========================================

function decreaseCartQuantity(id) {

    var cart =
        getCart();


    for (
        var i = 0;
        i < cart.length;
        i++
    ) {

        if (
            String(cart[i].id) ===
            String(id)
        ) {

            if (
                Number(cart[i].quantity) > 1
            ) {

                cart[i].quantity =
                    Number(cart[i].quantity) - 1;

            } else {

                cart.splice(i, 1);

            }

            break;

        }

    }


    saveCart(cart);

    displayCart();

    updateCartCount();

}


// =========================================
// REMOVE PRODUCT
// =========================================

function removeFromCart(id) {

    var cart =
        getCart();


    var newCart = [];


    for (
        var i = 0;
        i < cart.length;
        i++
    ) {

        if (
            String(cart[i].id) !==
            String(id)
        ) {

            newCart.push(
                cart[i]
            );

        }

    }


    saveCart(newCart);

    displayCart();

    updateCartCount();

}


// =========================================
// CHECKOUT
// =========================================

function checkout() {

    var cart =
        getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    window.location.href =
        "checkout.html";

}


// =========================================
// PAGE LOAD
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCart();

        updateCartCount();

    }
);
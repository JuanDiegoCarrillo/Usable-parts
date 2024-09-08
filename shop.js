const btnCart = document.querySelector('.container-icon')
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart')
})
// Selecciona todos los botones "añadir al carrito"
const addToCartButtons = document.querySelectorAll('.info-product button');

// Inicializa la variable para almacenar el total
let totalCart = 0;

// Selecciona el elemento donde se mostrará el total
const totalElement = document.querySelector('.total-pagar');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Selecciona el contenedor del producto asociado al botón
        const productContainer = button.closest('.info-product');

        // Obtiene el precio del producto
        const priceElement = productContainer.querySelector('.price');
        const priceText = priceElement.textContent.trim();
        
        // Elimina el símbolo de peso y convierte el precio a número
        const price = parseInt(priceText.replace('$', '').replace('.', '').replace(',', ''));

        // Suma el precio al total del carrito
        totalCart += price;

        // Actualiza el total en el elemento correspondiente
        totalElement.textContent = `$${totalCart.toLocaleString('es-ES')}`;
    });
});

// Selecciona el contenedor donde se muestran los productos en el carrito
const cartProductsContainer = document.querySelector('.container-cart-products');

// Función para actualizar el total del carrito
function updateCartTotal() {
    let total = 0;
    const prices = cartProductsContainer.querySelectorAll('.precio-producto-carrito');
    prices.forEach(priceElement => {
        const priceText = priceElement.textContent.trim();
        const price = parseInt(priceText.replace('$', '').replace('.', '').replace(',', ''));
        total += price;
    });
    totalElement.textContent = `$${total.toLocaleString('es-ES')}`;
}

// Añadir evento de eliminar producto
cartProductsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('icon-close')) {
        const productContainer = event.target.closest('.cart-product');
        productContainer.remove(); // Elimina el producto del carrito
        updateCartTotal(); // Actualiza el total del carrito
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.info-product button');
    let cartProducts = [];
    const cartProductsContainer = document.querySelector('#cart-products-list');
    const cartCount = document.getElementById('contador-productos');
    const cartContainer = document.querySelector('.container-cart-products');

    // Actualizar el total del carrito
    function updateCartTotal() {
        let total = 0;
        cartProducts.forEach(product => {
            total += product.price * product.quantity;
        });
        document.querySelector('.total-pagar').textContent = `$${total.toLocaleString('es-ES')}`;
    }

    // Actualizar la cantidad de productos en el carrito
    function updateCartCount() {
        const totalQuantity = cartProducts.reduce((total, product) => total + product.quantity, 0);
        cartCount.textContent = totalQuantity;
        cartCount.classList.toggle('hidden-cart', totalQuantity === 0);
    }

    // Renderizar el contenido del carrito
    function renderCart() {
        cartProductsContainer.innerHTML = ''; // Limpiar el contenido actual del carrito
        cartProducts.forEach((product, index) => {
            const cartProductHTML = `
                <div class="cart-product" data-index="${index}">
                    <div class="info-cart-product">
                        <span class="titulo-producto-carrito">${product.name}</span>
                        <span class="cantidad-producto-carrito">x${product.quantity}</span>
                        <span class="precio-producto-carrito">$${(product.price * product.quantity).toLocaleString('es-ES')}</span>
                    </div>
                    <button class="icon-close" data-index="${index}">&times;</button>
                </div>
            `;
            cartProductsContainer.insertAdjacentHTML('beforeend', cartProductHTML);
        });
        updateCartTotal();
        updateCartCount();
    }

    // Añadir producto al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productContainer = button.closest('.info-product');
            const name = productContainer.querySelector('.titulo-producto').textContent.trim();
            const priceText = productContainer.querySelector('.price').textContent.trim();
            const price = parseInt(priceText.replace('$', '').replace('.', '').replace(',', ''));
            const existingProduct = cartProducts.find(product => product.name === name);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cartProducts.push({ name, price, quantity: 1 });
            }

            cartContainer.classList.remove('hidden-cart');
            renderCart();
        });
    });

    // Eliminar producto del carrito
    cartProductsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('icon-close')) {
            const productIndex = event.target.dataset.index;
            cartProducts.splice(productIndex, 1);
            renderCart();

            if (cartProducts.length === 0) {
                cartContainer.classList.add('hidden-cart');
            }
        }
    });
});

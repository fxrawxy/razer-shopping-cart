// vars

const basket = document.querySelector('.basket'),
	basketLink = document.querySelector('.basket-link'),
	itemAmount = document.querySelector('.i-amount'),
	shoppingCart = document.querySelector('.shopping-cart'),
	shoppingCartCont = document.querySelector('.shopping-cart tbody'),
	items = document.querySelector('.catalog-body');



// events

function addEvents() {
	basketLink.addEventListener('click', openShoppingCart);

	items.addEventListener('click', buyItem);

	shoppingCartCont.addEventListener('click', removeFromCart);
}

addEvents();



// functions

// open shopping cart

function openShoppingCart() {
	if (itemAmount.classList.contains('active')) {
		basketLink.classList.toggle('active');

		if (shoppingCart.style.display === '') {
			shoppingCart.style.display = 'block';
		} else {
			shoppingCart.style.display = '';
		}
	}
}

function buyItem(e) {
	e.preventDefault();

	// use delegation to find item was added

	if (e.target.classList.contains('add-to-cart')) {
		const item = e.target.parentElement.parentElement.parentElement;

		getItemInfo(item);
	}
}

// get item info

function getItemInfo(item) {

	// create object with item data

	const itemInfo = {
		image: item.querySelector('img').src,
		title: item.querySelector('.card-name').textContent,
		price: item.querySelector('.card-price').textContent
	}

	addToCart(itemInfo);
}

// add item to basket

function addToCart(item) {
	const row = document.createElement('tr');

	row.innerHTML = `
		<td>
			<img src="${item.image}">
		</td>
		<td>${item.title}</td>
		<td>${item.price}</td>
		<td><ion-icon name="close" class="remove"></ion-icon></td>
	`;

	shoppingCartCont.appendChild(row);

	// update current amount of items in basket

	itemAmount.innerHTML = shoppingCartCont.childElementCount;

	// enable shopping cart and add 'in basket' effect

	if (shoppingCartCont.childElementCount > 0) {
		itemAmount.classList.add('active');
	}
}

// remove item from basket

function removeFromCart(e) {
	if (e.target.classList.contains('remove')) {
		e.target.parentElement.parentElement.remove();
	}

	// update current amount of items in basket

	itemAmount.innerHTML = shoppingCartCont.childElementCount;

	// if all items was removed

	if (shoppingCartCont.childElementCount === 0) {
		// hide shopping cart
		shoppingCart.style.display = '';

		// remove 'basket opened' effect
		basketLink.classList.remove('active');

		// remove 'in basket' effect
		itemAmount.classList.remove('active')
	}
}
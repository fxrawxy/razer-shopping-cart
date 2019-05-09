// vars

const basket = document.querySelector('.basket'),
	basketLink = document.querySelector('.basket-link'),
	itemAmount = document.querySelector('.i-amount'),
	shoppingCart = document.querySelector('.shopping-cart'),
	shoppingCartCont = document.querySelector('.shopping-cart tbody'),
	clearCartBtn = document.querySelector('.remove-order'),
	items = document.querySelector('.catalog-body');



// events

function addEvents() {
	// open shopping cart
	basketLink.addEventListener('click', openShoppingCart);

	// add item to cart
	items.addEventListener('click', buyItem);

	// remove item from cart
	shoppingCartCont.addEventListener('click', removeFromCart);

	// clear cart
	clearCartBtn.addEventListener('click', clearCart);

	// print items from local storage
	document.addEventListener('DOMContentLoaded', printFromStorage);
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

// add to cart 1
function buyItem(e) {
	e.preventDefault();

	if (e.target.classList.contains('add-to-cart')) {
		const item = e.target.parentElement.parentElement.parentElement;

		getItemInfo(item);
	}
}

// get item info
function getItemInfo(item) {
	const itemInfo = {
		image: item.querySelector('img').src,
		title: item.querySelector('.card-name').textContent,
		price: item.querySelector('.card-price').textContent,
		id: item.querySelector('.add-to-cart').getAttribute('data-id')
	}

	addToCart(itemInfo);
}

// add to cart 2
function addToCart(item) {
	const row = document.createElement('tr');

	row.innerHTML = `
		<td>
			<img src="${item.image}">
		</td>
		<td>${item.title}</td>
		<td>${item.price}</td>
		<td><ion-icon name="close" class="remove" data-id="${item.id}"></ion-icon></td>
	`;

	shoppingCartCont.appendChild(row);

	itemAmount.innerHTML = shoppingCartCont.childElementCount;

	if (shoppingCartCont.childElementCount > 0) {
		itemAmount.classList.add('active');
	}

	saveIntoStorage(item);
}

// save into local storage
function saveIntoStorage(item) {
	let items = getFromStorage();

	items.push(item);

	localStorage.setItem('items', JSON.stringify(items));
}

// get from local storage
function getFromStorage() {
	let items;

	if (localStorage.getItem('items') === null) {
		items = [];
	} else {
		items = JSON.parse(localStorage.getItem('items'));
	}

	return items;
}

// print from local storage
function printFromStorage() {
	let itemsLS = getFromStorage();

	itemsLS.forEach(function(item) {
		const row = document.createElement('tr');

		row.innerHTML = `
			<td>
				<img src="${item.image}">
			</td>
			<td>${item.title}</td>
			<td>${item.price}</td>
			<td><ion-icon name="close" class="remove" data-id="${item.id}"></ion-icon></td>
		`;

		shoppingCartCont.appendChild(row);

		itemAmount.innerHTML = shoppingCartCont.childElementCount;

		if (shoppingCartCont.childElementCount > 0) {
			itemAmount.classList.add('active');
		}
	});
}

// remove from cart
function removeFromCart(e) {
	let item, itemId;

	if (e.target.classList.contains('remove')) {
		e.target.parentElement.parentElement.remove();

		item = e.target.parentElement.parentElement;
		itemId = item.querySelector('ion-icon').getAttribute('data-id');
	}

	removeFromStorage(itemId);

	itemAmount.innerHTML = shoppingCartCont.childElementCount;

	if (shoppingCartCont.childElementCount === 0) {
		shoppingCart.style.display = '';

		basketLink.classList.remove('active');

		itemAmount.classList.remove('active')
	}
}

// remove from local storage
function removeFromStorage(id) {
	let itemsLS = getFromStorage();

	itemsLS.forEach(function(itemLS, index) {
		if (itemLS.id === id) {
			itemsLS.splice(index, 1);
		}
	});

	localStorage.setItem('items', JSON.stringify(itemsLS));
}

// clear cart
function clearCart() {
	while (shoppingCartCont.firstChild) {
		shoppingCartCont.removeChild(shoppingCartCont.firstChild);
	}

	itemAmount.innerHTML = shoppingCartCont.childElementCount;

	if (shoppingCartCont.childElementCount === 0) {
		shoppingCart.style.display = '';

		basketLink.classList.remove('active');

		itemAmount.classList.remove('active')
	}

	clearStorage();
}

// clear local storage
function clearStorage() {
	localStorage.clear();
}
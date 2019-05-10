// bugs

// totalPrice is NaN when clicked at 'shoppingCartCont' tr



// vars

const	basket = document.querySelector('.basket'),
		basketLink = document.querySelector('.basket-link'),
		itemAmount = document.querySelector('.i-amount'),
		shoppingCart = document.querySelector('.shopping-cart'),
		items = document.querySelector('.catalog-body'),
		shoppingCartCont = document.querySelector('.shopping-cart tbody'),
		clearCartBtn = document.querySelector('.remove-order');

let		totalPrice = document.querySelector('.total-price');



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
	// if cart has items
	if (itemAmount.classList.contains('active')) {

		// apply 'cart opened' effect
		basketLink.classList.toggle('active');

		// show cart
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

	// find item was added
	if (e.target.classList.contains('add-to-cart')) {
		const item = e.target.parentElement.parentElement.parentElement;

		// get item info
		getItemInfo(item);
	}
}

// get item info
function getItemInfo(item) {
	// create object with item data
	const itemInfo = {
		image: item.querySelector('img').src,
		title: item.querySelector('.card-name').textContent,
		price: item.querySelector('.card-price').textContent,
		priceData: item.querySelector('.card-price').getAttribute('data-price'),
		id: item.querySelector('.add-to-cart').getAttribute('data-id')
	}

	// add item to cart
	addToCart(itemInfo);
}

// add item to cart 2
function addToCart(item) {
	// create item in cart
	const row = document.createElement('tr');

	row.innerHTML = `
		<td>
			<img src="${item.image}">
		</td>
		<td>
			${item.title}
		</td>
		<td class="data-price" data-price="${item.priceData}">
			${item.price}
		</td>
		<td>
			<ion-icon name="close" class="remove" data-id="${item.id}"></ion-icon>
		</td>
	`;

	shoppingCartCont.appendChild(row);

	// calculate price
	calculatePrice(item);

	// update count of items in 'itemAmount'
	itemAmount.innerHTML = shoppingCartCont.childElementCount;

	// apply 'in basket' effect
	if (shoppingCartCont.childElementCount > 0) {
		itemAmount.classList.add('active');
	}

	// save item into local storage
	saveIntoStorage(item);
}

// calculate price
function calculatePrice(item) {
	// save current total price to var
	let total = parseInt(totalPrice.textContent);

	// add item price to total
	total = total + parseInt(item.priceData);

	// write total into totalPrice
	totalPrice.textContent = total;
}

// remove price
function removePrice(itemPrice) {
	// save current total price to var
	let total = parseInt(totalPrice.textContent);

	// remove item price from total
	total = total - parseInt(itemPrice);

	// write total into totalPrice
	totalPrice.textContent = total;
}

// save into local storage
function saveIntoStorage(item) {
	// get array from local storage
	let items = getFromStorage();

	// add item to array
	items.push(item);

	// convert array to string and write in local storage
	localStorage.setItem('items', JSON.stringify(items));
}

// get items from local storage
function getFromStorage() {
	let items;

	// if local storage is empty
	if (localStorage.getItem('items') === null) {
		// make array from items
		items = [];
	} else {
		// convert string to array
		items = JSON.parse(localStorage.getItem('items'));
	}

	return items;
}

// print items from local storage
function printFromStorage() {
	// get array from local storage
	let itemsLS = getFromStorage();

	// for every item in array
	itemsLS.forEach(function(item) {
		// create item in cart
		const row = document.createElement('tr');

		row.innerHTML = `
			<td>
				<img src="${item.image}">
			</td>
			<td>
				${item.title}
			</td>
			<td class="data-price" data-price="${item.priceData}">
				${item.price}
			</td>
			<td>
				<ion-icon name="close" class="remove" data-id="${item.id}"></ion-icon>
			</td>
		`;

		shoppingCartCont.appendChild(row);

		// save current total price to var
		let total = parseInt(totalPrice.textContent);

		// add item price to total
		total = total + parseInt(item.priceData);

		// write total into totalPrice
		totalPrice.textContent = total;

		// update count of items in 'itemAmount'
		itemAmount.innerHTML = shoppingCartCont.childElementCount;

		// apply 'in basket' effect
		if (shoppingCartCont.childElementCount > 0) {
			itemAmount.classList.add('active');
		}
	});
}

// remove from cart
function removeFromCart(e) {
	let item, itemId, itemPrice;

	// which item was removed
	if (e.target.classList.contains('remove')) {
		e.target.parentElement.parentElement.remove();

		item = e.target.parentElement.parentElement;

		itemId = item.querySelector('ion-icon').getAttribute('data-id');
		itemPrice = item.querySelector('.data-price').getAttribute('data-price');
	}

	// remove price
	removePrice(itemPrice);

	// remove from local storage
	removeFromStorage(itemId);

	// update count of items in 'itemAmount'
	itemAmount.innerHTML = shoppingCartCont.childElementCount;

	// hide cart and remove effects
	if (shoppingCartCont.childElementCount === 0) {
		shoppingCart.style.display = '';

		basketLink.classList.remove('active');

		itemAmount.classList.remove('active')
	}
}

// remove from local storage
function removeFromStorage(id) {
	// get array from local storage
	let itemsLS = getFromStorage();

	// remove item from array
	itemsLS.forEach(function(itemLS, index) {
		if (itemLS.id === id) {
			itemsLS.splice(index, 1);
		}
	});

	// apply changes
	localStorage.setItem('items', JSON.stringify(itemsLS));
}

// clear cart
function clearCart() {
	// remove items with loop
	while (shoppingCartCont.firstChild) {
		shoppingCartCont.removeChild(shoppingCartCont.firstChild);
	}

	// update total price
	totalPrice.textContent = 0;

	// update count of items
	itemAmount.innerHTML = shoppingCartCont.childElementCount;

	// hide cart and remove effects
	if (shoppingCartCont.childElementCount === 0) {
		shoppingCart.style.display = '';

		basketLink.classList.remove('active');

		itemAmount.classList.remove('active')
	}

	// clear local storage
	clearStorage();
}

// clear local storage
function clearStorage() {
	localStorage.clear();
}
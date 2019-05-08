// vars

const	openMenuBtn = document.querySelector('.menu-open'),
	menu = document.querySelector('.nav'),
	closeMenuBtn = document.querySelector('.menu-close');



// events

function addEvents() {
	openMenuBtn.addEventListener('click', openMenu);

	closeMenuBtn.addEventListener('click', closeMenu);
}

addEvents();



// functions

// open menu

function openMenu() {
	menu.style.left = '0';

	document.body.style.overflowY = 'hidden';

	// create cover

	createCover();
}

// create cover

function createCover() {
	const div = document.createElement('div');

	div.classList = 'cover';

	document.body.appendChild(div);
}

// close menu

function closeMenu() {
	menu.style.left = `${menu.style.width}`;

	document.body.style.overflowY = 'visible';

	// remove cover

	document.querySelector('.cover').remove();
}
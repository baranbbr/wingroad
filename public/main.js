window.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded')
	// remove aside after 2 seconds
	const delay = 2000
	document.querySelector('aside').hidden = false
	console.log('aside unhidden')
	window.setTimeout(() => {
		document.querySelector('aside').hidden = true
		console.log('aside hidden')
	}, delay)
})

// Open and Close Navigation Links
const links = document.getElementById('navLinks')
const navBtn = document.getElementById('navBtn')
const themer = document
	.getElementById('theme')
	.addEventListener('click', () => {
		btnToggles()
	})

const btnClose = document.getElementById('navClose')
const btnBurger = document.getElementById('navBurger')
btnClose.classList.add('hidden')

navBtn.addEventListener('click', () => {
	btnToggles()
})

const btnToggles = () => {
	links.classList.toggle('hidden')
	btnClose.classList.toggle('hidden')
	btnBurger.classList.toggle('hidden')
}

const theme = document.getElementById('theme')
const body = document.querySelector('body')

function isDarkModeEnabled() {
	const enabled =
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	console.log(enabled)
	return enabled
}

isDarkModeEnabled() && body.classList.add('dark')
// if(isDarkModeEnabled()) body.classList.add('dark')

theme.addEventListener('click', () => {
	body.classList.toggle('dark')
})

document.querySelector('.msg-close').addEventListener('click', () => {
	document.querySelector('.header-msg').classList.toggle('hidden')
})

// when img in article is clicked, open a modal showing fullscreen image
const imgs = document.querySelectorAll('article img')
imgs.forEach(img => {
	img.addEventListener('click', () => {
		showModal(img);
	})
})

function showModal(el) {
	// create modal
	const modal = document.createElement('div')
	modal.innerHTML = `
		<div class="modal-content">
			<span class="modal-close" id="modal-close">&times;</span>
			<img src="${el.src}" alt="${el.alt}">
		</div>
	`
	document.body.appendChild(modal)
	// allow zoom in to modal image
	const modalImg = document.querySelector('.modal-content img')
	modalImg.addEventListener('click', () => {
		modalImg.classList.toggle('zoom')
	})
	// close modal
	const close = document.getElementById('modal-close')
	// allow escape key to close modal
	document.addEventListener('keydown', e => {
		if (e.key == 'Escape') {
			modal.remove()
		}
	})
	close.addEventListener('click', () => {
		modal.remove()
	})
}

// window.onscroll = function() {myFunction()};

// var navbar = document.getElementById("nav");
// var sticky = navbar.offsetTop;

// function myFunction() {
// 	console.log('hi')
//   	if (window.pageYOffset >= sticky) {
//     	navbar.classList.add("sticky")
//   	} else {
//     	navbar.classList.remove("sticky");
//   	}
// }

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

const btnClose = document.getElementById('navClose')
const btnBurger = document.getElementById('navBurger')
btnClose.classList.add('hidden')

navBtn.addEventListener('click', () => {
	links.classList.toggle('hidden')
	btnClose.classList.toggle('hidden')
	btnBurger.classList.toggle('hidden')
})

const theme = document.getElementById('theme')
const body = document.querySelector('body')

function isDarkModeEnabled() {
	const enabled = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
	console.log(enabled)
	return enabled
}

isDarkModeEnabled() && body.classList.add('dark')
// if(isDarkModeEnabled()) body.classList.add('dark')

theme.addEventListener('click', () => {
	body.classList.toggle('dark')
})


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



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

const btnX = document.getElementById('navClose')
const btnBurger = document.getElementById('navBurger')

navBtn.addEventListener('click', () => {
	links.classList.toggle('hidden')
	btnX.classList.toggle('hidden')
	btnBurger.classList.toggle('hidden')
})

const theme = document.getElementById('theme')
const body = document.querySelector('body')
theme.addEventListener('click', () => {
	body.classList.toggle('dark')
})

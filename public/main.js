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


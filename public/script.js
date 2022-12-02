function init() {
	var total = 0
	var allElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, a, caption, span  ');
	var url = document.URL
	console.log(allElements)
	for (var i = 0; i < allElements.length; i++) {
		if(allElements[i].innerText.toLowerCase().includes('£')){
			console.log('cost found')
			console.log(parseInt(allElements[i].innerHTML.replace('£','')))
			total += parseInt(allElements[i].innerHTML.replace('£',''))//
		}
	}
	//console.log("The total on this page is ", total)
	return total;
}

init();
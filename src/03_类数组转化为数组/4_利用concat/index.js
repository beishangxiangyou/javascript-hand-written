const divs = Array.prototype.concat.apply([], document.querySelectorAll('div'))

console.log(divs, Array.isArray(divs))

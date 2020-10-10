const fn = () => {
  return [...new Set([...document.querySelectorAll('*')])].map(el => el.tagName).length
}

console.log(fn())

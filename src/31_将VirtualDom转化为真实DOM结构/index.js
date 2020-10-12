const vnode = {
  tag: 'div',
  attrs: {
    id: 'test'
  },
  children: [
    {
      tag: 'h1',
      children: ['请叫我斗图王']
    }
  ]
}

function render (vnode, container) {
  container.appendChild(_render(vnode))
}

function _render (vnode) {
  if (typeof vnode === 'number') vnode = String(vnode)
  if (typeof vnode === 'string') return document.createTextNode(vnode)

  const dom = document.createElement(vnode.tag)

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key]
      dom.setAttribute(key, value)
    })
  }
  vnode.children.forEach(vnode => render(vnode, dom))
  return dom
}

render(vnode, document.body)

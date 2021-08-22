//  --order-area-entry-height: <length>

let tmpl = document.createElement('template')
tmpl.innerHTML = `
    <style>
        #container {
            box-sizing: border-box;
            border-radius: 10px;
            width: 100%;
            height: 100%;
            border: 1px solid black;
            overflow-y: auto;
        }
    </style>
    <div id="container">
        <slot name="menu-item"></slot>
        <slot name="guest-item"></slot>
    </div>
`

export default class OrderArea extends HTMLElement {
    constructor() {
        super()
        const shr = this.attachShadow({mode: 'open'})
        shr.appendChild(tmpl.content.cloneNode(true))
    }

    $append_item(associatedItem) {
        let i = document.createElement('order-area-item')
        i.slot = 'menu-item'
        let n = document.createElement('div')
        let p = document.createElement('div')
        n.slot = 'name'
        p.slot = 'price'
        n.innerHTML = `<span>${associatedItem.fields.name}</span>`
        p.innerHTML = `<span>${associatedItem.fields.price}</span>`
        i.appendChild(n)
        i.appendChild(p)
        this.appendChild(i)
    }
}

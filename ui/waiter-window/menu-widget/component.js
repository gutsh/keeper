// styling:
// --buttons-per-row: int
// --buttons-distance: <length>
// --buttons-interval: <length>
// --buttons-padding-v: <length>
// --buttons-padding-g: <length>

import KeepStorage from '../../app/storage.js'

let tmpl = document.createElement('template')
tmpl.innerHTML = `
    <style>
        #container {
            box-sizing: border-box;
            border-radius: 10px;
            width: 100%;
            height: 100%;
            border: 1px solid black;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            overflow-y: auto;
        }
    </style>
    <div id="container">
        <slot name="menu-item"><button>Default</button></slot>
    </div>
`

export default class MenuWidget extends HTMLElement {
    $buttons = new DocumentFragment()
    $dotdot = document.createElement('menu-button')
    $navHistory = [] //array of fragments

    $init() {
        this.$dotdot.associatedItem = {model: "dotdot"}
        this.$dotdot.slot = "menu-item"
        this.$dotdot.innerHTML = `<span>...</span>`
        this.$render(KeepStorage.findChildren({pk: null}))
    }

    $render(items) {
        for(let i of items) {
            let btn = document.createElement('menu-button')
            btn.associatedItem = i
            btn.slot = "menu-item"
            btn.innerHTML = `<span>${btn.$associatedItem.fields.name}</span>`
            this.$buttons.appendChild(btn)
        }
        if (this.$navHistory.length != 0) this.$buttons.prepend(this.$dotdot)
        this.appendChild(this.$buttons)
    }

    $nav_down(associatedItem) {
        const i = KeepStorage.findChildren(associatedItem)
        const f = new DocumentFragment()
        f.append(...this.children)
        this.$navHistory.push(f)
        this.$render(i)
    }

    $nav_up() {
        const f = this.$navHistory.pop()
        if (this.$navHistory.length != 0) f.prepend(this.$dotdot)
        this.replaceChildren(f)
    }

    $select_item(associatedItem) {
        let oa = document.querySelector('order-area')
        oa.$append_item(associatedItem)
    }

    $click_cb(e) {
        if (e.target.tagName === "MENU-BUTTON") {
            let o = e.target.$associatedItem 
            switch (o.model) {
                case "service.folder":
                    this.$nav_down(o)
                    break
                case "dotdot":
                    this.$nav_up()
                    break
                case "service.item":
                    this.$select_item(o)
                    break
            }
        }
    }

    constructor() {
        super()
        this.addEventListener('click', this.$click_cb, true)
        const shr = this.attachShadow({mode: 'open'})
        shr.appendChild(tmpl.content.cloneNode(true))
    }
}

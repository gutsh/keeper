// styling: --button-width, --button-height,
//          --button-distance, --button-interval,
//          --button-padding-v, --button-padding-g,
//          --button-border-width, --button-border-color
//          --button-bg-color, --button-bg-color-hover

let gb_tmpl = document.createElement('template')
gb_tmpl.innerHTML = `
    <style>
        :host {
            display: contents;
        }
    
        button {
            box-sizing: border-box;
            width: var(--button-width, 10%);
            height: var(--button-height, 5%);
            margin: calc(var(--button-distance, 0) / 2) calc(var(--button-interval, 0) / 2);
            padding: var(--button-padding-v, 0) var(---button-padding-g, 0);
            border: var(--button-border-width, 1px) solid var(--button-border-color, black);
            background-color: var(--button-bg-color, #aaaa);
            border-radius: 5px;
        }

        button:hover {
            background-color: var(--button-bg-color-hover, green);
            transition: background-color 0.5s;
        }
    </style>
    <button>
        <slot>Title</slot>
    </button/>
`

export default class MenuButton extends HTMLElement {
    constructor() {
        super()
        const shr = this.attachShadow({mode: 'open'})
        shr.appendChild(gb_tmpl.content.cloneNode(true))
        this.$associatedItem = null
    }

    /**
     * @param {any} item
     */
    set associatedItem(item) {
        if (this.$associatedItem) {
            console.log("already has an item")
            return
        }
        this.$associatedItem = item
    }
}

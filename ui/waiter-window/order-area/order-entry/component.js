let tmpl = document.createElement('template')
tmpl.innerHTML = `
    <style>
        :host {
            display: contents;
        }
        .wrapper {
            box-sizing: border-box;
            width: 95%;
            height: var(--order-area-entry-height);
            margin: 2px auto;
            border: 1px solid black;
        }
        .picker {
            width: 10%;
            height: 100%;
            border-right: 1px solid black;
        }
        .item {
            display: flex;
            align-content: center;
            justify-content: space-between;
        }
    </style>
    <div class="wrapper">
        <div class="picker"></div>
        <div class="item">
            <slot name="name">Sample item</slot>
            <slot name="price">1$</slot>
        </div>
    </div>
`

export default class OrderAreaItem extends HTMLElement {
    constructor() {
        super()
        let shr = this.attachShadow({mode: 'open'})
        shr.appendChild(tmpl.content.cloneNode(true))
    }
}

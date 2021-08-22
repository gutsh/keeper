let tmpl = document.createElement('template')
tmpl.innerHTML = `
    <style>
        :host {
            display: contents;
        }

        #grid-container {
            display: grid;
            width: 100%;
            height: 100vh;
            margin: 0 auto;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 3rem 3rem 3rem 1fr 3rem;
            column-gap: 0.5rem;
            row-gap: 0.3rem;
        }
        
        #grid-container > * {
            background-color: #aaaa;
            width: 90%;
            height: 100%;
        }
        
        #menu-widget {
            grid-row: 4 / 5;
            background-color: unset;
        }
        
        .column-1 {
            grid-column: 1 / 2;
            margin-inline-start: 10%;
        }
        
        .column-2 {
            grid-column: 2 / 3;
            margin-inline-end: 10%;
        }
        
        #top-bar {
            width: 100%;
            grid-column: 1 / 3;
            grid-row: 1 / 2;
        }
        
        #search {
            grid-row: 2 / 3;
        }
        
        #order-area-controls {
            grid-row: 2 / 3;
        }
        
        #order-area {
            grid-row: 3 / 5;
            background-color: unset;
        }
        
        #pinned-items {
            grid-row: 3 / 4;
        }
        
        #global-controls {
            width: 100%;
            grid-column: 1 / 3;
            grid-row: 5 / 6;
        }
    </style>
    <div id="grid-container">
        <header id="top-bar"></header>
        <div id="search" class="column-2"></div>
        <div id="order-area-controls" class="column-1"></div>
        <div id="order-area" class="column-1">
            <slot name="order-area"></slot>
        </div>
        <div id="pinned-items" class="column-2"></div>
        <div id="menu-widget" class="column-2">
            <slot name="menu-widget"></slot>
        </div>
        <footer id="global-controls"></footer>
    </div>
`

class WaiterWindowEventDispatcher extends HTMLElement {
    constructor() {
        super()
    }
}

export default class WaiterWindow extends HTMLElement {
    $event_dispatcher = null
    
    constructor() {
        super()
        const shr = this.attachShadow({mode: 'open'})
        shr.appendChild(tmpl.content.cloneNode(true))
    }
}

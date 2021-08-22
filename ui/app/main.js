import KeepStorage from './storage.js'
import MenuButton from '../waiter-window/generic-button/component.js'
import MenuWidget from '../waiter-window/menu-widget/component.js'
import WaiterWindow from '../waiter-window/waiter-window.js'
import OrderArea from '../waiter-window/order-area/component.js'
import OrderAreaItem from '../waiter-window/order-area/order-entry/component.js'

customElements.define('order-area-item', OrderAreaItem)
customElements.define('order-area', OrderArea)
customElements.define('menu-button', MenuButton)
customElements.define('menu-widget', MenuWidget)
customElements.define('waiter-window', WaiterWindow)

let mw = document.createElement('menu-widget')
let oa = document.createElement('order-area')
let ww = document.createElement('waiter-window')
oa.slot = "order-area"
mw.slot = "menu-widget"
mw.$init()
ww.appendChild(mw)
ww.appendChild(oa)
document.body.appendChild(ww)
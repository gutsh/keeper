let isDragging = false;
const drag_area = document.querySelector("#editor-window-drag-area");
const adder = document.querySelector("#editor-window-controls-adder");

function dragStart(e) {
    if (!isDragging) {
        isDragging = true;
        this.style['border-style'] = 'dotted';
    }
}

function dragMove(e) {
    if (isDragging) {
        this.style.left = parseInt(this.style.left) + e.movementX + 'px';
        this.style.top = parseInt(this.style.top) + e.movementY + 'px';
    }
}

function dragStop(e) {
    if (isDragging) {
        isDragging = false;
        this.style['border-style'] = 'solid';
    }
}

function newRect() {
    let rect = document.createElement("div");
    rect.setAttribute("class", "draggable");
    rect.setAttribute("style", "top: 5px; left: 5px");
    rect.addEventListener('mousedown', dragStart, false);
    rect.addEventListener('mousemove', dragMove, false);
    rect.addEventListener('mouseup', dragStop, false);
    rect.addEventListener('mouseout', dragStop, false);
    drag_area.appendChild(rect);
}

adder.onclick = newRect;
const container = document.querySelector('#container');
const btnSides = document.querySelector('#sides');
const colorPicker = document.querySelector('#color-picker');
const btnRainbow = document.querySelector('#btn-rainbow');
const btnEraser = document.querySelector('#btn-eraser');
const btnClear = document.querySelector('#btn-clear');
const btnShade = document.querySelector('#btn-shade');

let currentSize = 16;
let currentMode = 'color'; //'color' 'rainbow' or 'erase'
let isDrawing = false;
let num;

//track global mouse states
window.addEventListener('pointerdown', () => isDrawing = true);
window.addEventListener('pointerup', () => isDrawing = false);
container.addEventListener('pointerleave', () => isDrawing = false);

createDiv(currentSize);

//======Handle Mode=============
function updateMode(newMode){
    currentMode = newMode;

    //remove highlight from all mode buttons
    document.querySelectorAll('.mode-btn')
        .forEach(btn => btn.classList.remove('active-mode'));
    
    //add highlight to the active mode button
    const activeBtn = document.querySelector(`#btn-${newMode}`);
    if(activeBtn) activeBtn.classList.add('active-mode');
}

//====Event listner for button
colorPicker.addEventListener('input', (e) => {
    updateMode('color');
} )

btnRainbow.addEventListener('click',(e)=> {
    updateMode('rainbow');
})

btnShade.addEventListener('click',(e)=> {
    updateMode('shade');
})
btnEraser.addEventListener('click', (e) => {
    updateMode('eraser');
    // console.log("I have seletect eraser");
})


//completely clear the cells 
btnClear.addEventListener('click', (e) => {
    if(num === undefined){
        createDiv(currentSize);
    }else{
        createDiv(num);
    }
    
})

//======== paint handler =========
function paint(e) {
    const cell = e.target;
    if (!cell.classList.contains('boxes')) return;

    if (currentMode === 'color') {
        cell.style.backgroundColor = colorPicker.value;
    } else if (currentMode === 'rainbow') {
        const hue = Math.floor(Math.random() * 360);
        cell.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

    } else if (currentMode === 'eraser') {
        cell.style.backgroundColor = '#ffffff';
        cell.dataset.shade = 0;
    }
    else if(currentMode === 'shade'){
        shadeCell(cell);
    }
}


// ============== shading logic ===========
function shadeCell(cell){
    let level = Number(cell.dataset.shade);
    if(level<10) level++;

    cell.dataset.shade = level;

    const shade = 255 - (level * 25.5);
    cell.style.backgroundColor = `rgb(${shade}, ${shade}, ${shade})`;
}

//==== drawing events ======

//prevent the default browser image/elent drag-and-drop behavior
container.addEventListener('dragstart', (e) => e.preventDefault());

container.addEventListener('pointerdown',(e) => {
    isDrawing = true;
    paint(e);
});
container.addEventListener('pointerenter', (e) =>{
    if(isDrawing) paint(e);
},true);

container.addEventListener('pointerleave', () => {
    isDrawing = false;
});


//===== Resize grid ===========
btnSides.addEventListener('click', () => {
    let value;

    while (true) {
        const input = prompt("Enter a number between 1 and 100");
        value = Number(input);

        if (value >= 1 && value <= 100) break;
        alert("Invalid number");
    }

    currentSize = value;
    container.style.setProperty('--grid-size', currentSize);
    createDiv(currentSize);
});


//function to crate the cells
function createDiv(num){
    container.innerHTML = "";
    //inbuilt createDocumentFragment method creates 'temporary box'
    const frag = document.createDocumentFragment();

    for(let i = 1; i<=num*num; i++){
        let div = document.createElement('div');
        div.classList.add('boxes', `box${i}`);
        // div.textContent = `box${i}`;
        div.dataset.shade = 0;
        frag.appendChild(div);        
    }
    container.appendChild(frag);    
}


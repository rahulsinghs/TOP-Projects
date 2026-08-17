const container = document.querySelector('#container');
const btnSides = document.querySelector('#sides');
const colorPicker = document.querySelector('#color-picker');
const btnRainbow = document.querySelector('#btn-rainbow');
const btnEraser = document.querySelector('#btn-eraser');
const btnClear = document.querySelector('#btn-clear');

let currentSize = 16;
let currentMode = 'color'; //'color' 'rainbow' or 'erase'
let isDrawing = false;
let num;

//track global mouse states
window.addEventListener('mousedown', () => isDrawing = true);
window.addEventListener('mouseup', () => isDrawing = false);

createDiv(currentSize);

function updateMode(newMode){
    currentMode = newMode;
}

colorPicker.addEventListener('input', (e) => {
    updateMode('color');
} )

btnRainbow.addEventListener('click',(e)=> {
    updateMode('rainbow');
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


container.addEventListener('pointerover', (e)=> {
    if(e.target.classList.contains('boxes')){
        if(currentMode === 'color'){
            e.target.style.backgroundColor = colorPicker.value;
        }else if(currentMode === 'rainbow'){
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            // console.log(`random r:${r} g:${g} b:${b}`);
            e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            
        }else if(currentMode === 'eraser'){
            // console.log("current mode is earaser");
            e.target.style.backgroundColor = '#ffffff';           
        }
        
    }
})



btnSides.addEventListener('click', (e)=>{
    let inputNum;
    let parse;
    let min = 1; let max = 100;
    do{
        inputNum = prompt(`Enter a number between ${min} and ${max}`);
        parse = Number(inputNum);
        if(parse !== null && !isNaN(parse) && parse>=min && parse <= max){
            num = parse;
        }else {
            alert(`please enter number between ${min} and ${max}`);
        }
        
    }while(num === undefined);
    
    container.replaceChildren();
    createDiv(num)
    container.style.setProperty('--grid-size',num)

})

//function to crate the cells
function createDiv(num){
    container.innerHTML = "";
    for(let i = 1; i<=num*num; i++){
        let div = document.createElement('div');
        div.classList.add('boxes', `box${i}`);
        // div.textContent = `box${i}`;
        container.appendChild(div);        
    }    
}
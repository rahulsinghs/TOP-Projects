const container = document.querySelector('#container');
const btnSides = document.querySelector('#sides');
const colorPicker = document.querySelector('#color-picker');
const btnRainbow = document.querySelector('btn-rainbow');
const btnEraser = document.querySelector('btn-eraser');
const btnClear = document.querySelector('btn-clear');

let currentSize = 16;
let currentMode = 'color'; //'color' 'rainbow' or 'erase'
let isDrawing = false;
let num;

//track global mouse states
window.addEventListener('mousedown', () => isDrawing = true);
window.addEventListener('mouseup', () => isDrawing = false);

createDiv(currentSize);

//number of sides
//make 16*16 grid aligned(dont use grid only flex) boxes
/* let i = 1;
for(i = 1; i <= currentSize*currentSize; i++){
    const div = document.createElement('div');
    div.classList.add('boxes', `box${i}`);
    // div.textContent = `box${i}`;
    container.appendChild(div);
} */

/* container.addEventListener('mouseover', (e)=> {
    if(e.target.classList.contains('boxes')){
        e.target.style.backgroundColor = 'pink';
    }
})

container.addEventListener('mouseout', (e)=> {
    if(e.target.classList.contains('boxes')){
        e.target.style.backgroundColor = 'yellow';
    }
}) */


container.addEventListener('pointerover', (e)=> {
    if(isMouseDown && e.target.classList.contains('boxes')){
        e.target.classList.add('is-active');
    }
})

// container.addEventListener('pointerout', (e)=> {
//     if(e.target.classList.contains('boxes')){
//         e.target.classList.remove('is-active');
//     }
// })


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


function createDiv(num){
    for(let i = 1; i<=num*num; i++){
        let div = document.createElement('div');
        div.classList.add('boxes', `box${i}`);
        // div.textContent = `box${i}`;
        container.appendChild(div);        
    }    
}
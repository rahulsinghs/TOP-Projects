const container = document.querySelector('#container');

//number of sides
let num;
//make 16*16 grid aligned(dont use grid only flex) boxes
let i = 1;
for(i = 1; i <= 256; i++){
    const div = document.createElement('div');
    div.classList.add('boxes', `box${i}`);
    div.textContent = `box${i}`;
    container.appendChild(div);
}

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
    if(e.target.classList.contains('boxes')){
        e.target.classList.add('is-active');
    }
})

// container.addEventListener('pointerout', (e)=> {
//     if(e.target.classList.contains('boxes')){
//         e.target.classList.remove('is-active');
//     }
// })

const button = document.querySelector('#sides');
button.addEventListener('click', (e)=>{
    let inputNum;
    let parse;
    let min = 1; let max = 100;
    do{
        inputNum = prompt(`Enter a number between ${min} and ${max}`);
        parse = Number(inputNum);
        if(parse !== null && !(isNaN(parse) && parse>=min && parse <= max){
            num = parse;
        }else {
            alert(`please enter number between ${mins} and ${max}`);
        }
        
    }while(inputNum === undefined)
})

//used object instead of independent variable
const calculator = {
    display_value: '0',
    num_container: "",
    negative_num: false,
    first_operator: null,
    sec_operator:null,
    a: 0,
    b: 0,
    result: null,
    is_result: false,
    is_equalto: false
}

const keypad = document.querySelector('.keypad')
const numbers = document.querySelector(".numbers");
const operators = document.querySelector(".operators");
const display_screen = document.querySelector(".display_screen");
const current_display = display_screen.querySelector(".current");
const prev_display = display_screen.querySelector(".previous");
const ac_btn = document.querySelector(".ac");
const equalto = document.querySelector('.equalto');
const del = document.querySelector(".btn-del");

function update_display(){
    //upadte the previous screen on result
    if(calculator.is_result === true && calculator.is_equalto === false){
        prev_display.textContent = `${calculator.a} ${calculator.first_operator} ${calculator.b} ${calculator.sec_operator} `;
        current_display.textContent = calculator.result;
    }
    if(calculator.result !== null && calculator.is_equalto === true){
        prev_display.textContent = `${calculator.a} ${calculator.first_operator} ${calculator.b} ${'='}  ${calculator.result}`;
        current_display.textContent = calculator.result;
    }
    
}

function handle_number(num){
    if(calculator.display_value === '0' && calculator.is_result !== true){
        current_display.textContent = num; //if the display is '0' this displays the new value 
        calculator.display_value = num; //assigns the display value in calculator object
        calculator.num_container = num;

    }else if(calculator.is_result === true){
        current_display.textContent = num;
        calculator.num_container = num;
        calculator.is_result = false;

    }else{
        current_display.textContent += num; //number(string) would keep adding '..235'(strings)
        calculator.num_container += num;
    } 
};

/* function isolate_num(str){
    let ops = ['+', '-', '*', '/', '%'];
    console.log(`this is inside isolate func ${str}`);
    let index = -1;
    for(let op of ops){
        const pos = str.indexOf(op);
        if(pos != -1){
            index = pos;
            break;
        }
    };
    let num = str.slice(index + 1);
    console.log(`num is ${num}`);
    calculator.b = parseInt(num);
}
 */
function add_decimal(){};

function handle_ops(ops){
    if(calculator.first_operator !== null && calculator.sec_operator !== null ){
        console.log('nothing here go back');
        return;
    }
    if(calculator.first_operator !== null && calculator.is_result === true){
        return;
    }

    if(calculator.first_operator === null){
        calculator.first_operator = ops;
        current_display.textContent += calculator.first_operator;
        calculator.a = parseFloat(calculator.num_container);
        calculator.num_container = "";
    }
    else if(calculator.first_operator !== null && calculator.sec_operator === null){
        console.log("mike check");
        calculator.sec_operator = ops;
        calculator.b = parseFloat(calculator.num_container);
        calculator.num_container = "";
        console.log(`a= ${calculator.a} and b = ${calculator.b}`);
        calculator.result = calculation(calculator.a, calculator.b, calculator.first_operator);
        calculator.is_result = true;
        update_display();
        calculator.a = calculator.result;
        calculator.first_operator = ops;
        calculator.sec_operator = null;
    }
    
};
function handle_equalto(){
    if(calculator.first_operator === null || calculator.first_operator === null ){
        console.log('nothing to handle equalto');
        return;
    }
    if(calculator.first_operator !== null && calculator.result === null){
        console.log("aaha reached equal_to");
        calculator.is_equalto = true;
        calculator.b  = parseFloat(calculator.num_container);
        calculator.result = calculation(calculator.a,calculator.b,calculator.first_operator);
        calculator.is_result = true;
        update_display();
    }
};


function delete_digit(){};

function all_clear(){
    current_display.textContent = '0';
    prev_display.textContent = "";
    calculator.display_value = '0';
    calculator.first_operator = null;
    calculator.sec_operator = null;
    calculator.a = 0;
    calculator.b = 0;
    calculator.result = null;
    calculator.is_result = false;
};

//addEventListener's 
keypad.addEventListener('click', (e) => {
    let list = e.target.classList;
    if (list.contains('num')) {
        console.log(`clicked ${e.target.textContent}`);
        handle_number(e.target.textContent);
        return;
    }

    if(list.contains('ops')){
        console.log('clicked operator' + " " + e.target.textContent);
        handle_ops(e.target.textContent);
        return;
    }

    if(list.contains('ac')){
        console.log('All clear clicked');
        all_clear();
        return;
    }

    if(list.contains('decimal')){
        console.log('decimal clicked');
        add_decimal();
        return;
    }

    if(list.contains('del')){
        console.log('delete btn clicked');
        delete_digit();
        return;
    }

    if(list.contains('equalto')){
        console.log('equal to used');
        handle_equalto(e.target.textContent);
        return;
    }
});


//perform calculation
function calculation(first, second, operator){

    switch(operator){
        case '/':
            return second === 0?'Error': first/second;
        case '*':
            return first * second;
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '=': 
            return second;
        default:
            return second;
    }
}

function showCalc() {
    document.getElementById("calculator").style.display = "block";
}

function calcClose() {
    document.getElementById("calculator").style.display = "none";
    calc_Clear();
}

document.addEventListener('mouseup', function(e) {
    if (!document.getElementById("calculator").contains(e.target) && !document.getElementById("dark_mode_switch").contains(e.target)) {
        calcClose();
    }
});

var display = document.getElementById("current_display");
var totalDisplay = document.getElementById("total_display");
var total = 0;
var accumulate = "";
var operation = "";
var add = false;
var substract = false;
var multiply = false;
var divide = false;
var numPressed = false;
var totalShown = false;

function checkDecimal(n) {
    if (n.toString().includes(".")) {
        nu = n.toString().split(".");
        return nu[0] + "," + nu[1];
    } else {
        return n.toString();
    }
}

function pressNum(num) {
    if (totalShown == true) {
        calc_Clear();
        accumulate = parseFloat(num.toString());
        display.value = checkDecimal(accumulate); 
    } else {
        if (add == true || substract == true || multiply == true || divide == true) {
            operation = parseFloat(operation + num.toString());
            display.value = checkDecimal(operation);
        } else {
            accumulate = parseFloat(accumulate + num.toString());
            display.value = checkDecimal(accumulate); 
        }
    }

    totalShown = false;
    numPressed = true;
}

function plusMinus(){
    if (numPressed == false && accumulate.toString().length>1) {
        alert("Error");
        calc_Clear();
    }
    if (numPressed == false && accumulate.toString().length<1) {
        accumulate = "0";
        accumulate = -parseFloat(accumulate);
        display.value = checkDecimal(accumulate);
    } else {
        if (operation.toString().length>0) {
            operation = operation.toString();
            operation = -parseFloat(operation);
            display.value = checkDecimal(operation);
        } else {
            accumulate = accumulate.toString();
            accumulate = -parseFloat(accumulate);
            display.value = checkDecimal(accumulate);
        }
    }
}

function calcDelete() {
    if (numPressed == false) {
        alert("Error");
        calc_Clear();
    } else {
        if (operation.toString().length>0) {
            operation = operation.toString();
            operation = operation.substring(0, operation.length-1);
            operation = parseFloat(operation);
            display.value = checkDecimal(operation);
        } else {
            accumulate = accumulate.toString();
            accumulate = accumulate.substring(0, accumulate.length-1);
            accumulate = parseFloat(accumulate);
            display.value = checkDecimal(accumulate);
        }
    }
}

function Decimal() {
    if (numPressed == false || display.value.includes(",")) {
        alert("Error");
        calc_Clear();
    } else {
        if (operation.toString().length>0) {
            display.value = operation + ",";
            operation = operation.toString() + "."
        } else {
            display.value = accumulate + ",";
            accumulate = accumulate.toString() + "."
        }
    }
}

function Operate(i) {
    if (operation.toString().slice(-1) == "." || accumulate.toString().slice(-1) == "." ) {
        alert("Error");
        calc_Clear();
        return;
    }
    if (!totalShown) {
        if (numPressed == false) {
            alert("Error");
            calc_Clear();
            return;
        }
    }
    if (add == true || substract == true || multiply == true || divide == true) {
        Total();
    }
    add = false;
    substract = false;
    multiply = false;
    divide = false;
    if (i == "+") {
        add = true;
    } if (i == "-") {
        substract = true;
    } if (i == "×") {
        multiply = true
    } if (i == "÷") {
        divide = true;
    }

    display.value += " " + i;
    numPressed = false
    totalShown = false;
}

function Trunc(num) {
    num = num.toString();
    if (num.indexOf(".") > -1) {
        let nums = num.split(".");
        if (nums[1].length > 2) {
            nums[1] = nums[1].substring(0, 2);
            nums[1] = nums[1] + "...";
        }
        num = nums[0] + "," + nums[1];
    }
    return num;
}

function calc_Clear() {
    display.value = "";
    totalDisplay.innerHTML = 0;
    total = 0;
    accumulate = "";
    operation = "";
    add = false;
    substract = false;
    multiply = false;
    divide = false;
    numPressed = false;
    totalShown = false;
}

function Total() {
    if (operation.toString().slice(-1) == "." || accumulate.toString().slice(-1) == "." ) {
        alert("Error");
        calc_Clear();
        return;
    }
    if (numPressed == false) {
        alert("Error");
        calc_Clear();
        return ;
    }
    if (add == true) {
        accumulate = accumulate + operation;
    }
    if (substract == true) {
        accumulate = accumulate - operation;
    }
    if (multiply == true) {
        accumulate = accumulate * operation;
    }
    if (divide == true) {
        accumulate = accumulate / operation;
    }

    total = Trunc(accumulate);
    operation = "";
    add = false;
    substract = false;
    multiply = false;
    divide = false;
    numPressed = false
    totalShown = true;
    totalDisplay.innerHTML = total;
}

function printCalcTotal() {
    Total();
    display.value = "";
}

document.addEventListener('keypress', function(e) {
    if (document.getElementById("calculator").style.display == "block") {
        if (e.key.toLowerCase() == "0") {
            pressNum(0);
        } if (e.key.toLowerCase() == "1") {
            pressNum(1);
        } if (e.key.toLowerCase() == "2") {
            pressNum(2);
        } if (e.key.toLowerCase() == "3") {
            pressNum(3);
        } if (e.key.toLowerCase() == "4") {
            pressNum(4);
        } if (e.key.toLowerCase() == "5") {
            pressNum(5);
        } if (e.key.toLowerCase() == "6") {
            pressNum(6);
        } if (e.key.toLowerCase() == "7") {
            pressNum(7);
        } if (e.key.toLowerCase() == "8") {
            pressNum(8);
        } if (e.key.toLowerCase() == "9") {
            pressNum(9);
        } if (e.key == "+") {
            Operate("+");
        } if (e.key == "-") {
            Operate("-");
        } if (e.key == "/") {
            Operate("÷");
        } if (e.key == "*") {
            Operate("×");
        } if (e.key == "=" || e.key == 'Enter') {
            printCalcTotal();
        } if (e.key == "Backspace" || e.key == "Delete") {
            calcDelete();
        } if (e.key == "Escape") {
            calc_Clear();
        } if (e.key == "," || e.key == ".") {
            Decimal();
        }
    }
})
/***
 * UI Controller of the Pocket Calculator Emulator.
 * Takes care of listening to key events and updating results
 * in the revelant DOM objects of the page.
 * 
 * F. G. Ramon Fox (C) 2021
 * See LICENSE for conditions of use.
 ***/

"use strict";

let firstCalc = true;
let lastOperation = '';

// Assign Event Handlers to number keys.
// Each number key that is clicked appends a number to the input string.
let numberKeys = document.querySelectorAll('input.number');
for(let key of numberKeys) {
    key.addEventListener('click', getNumberInput);
}

// Assign Event Handler to sign (+/-) key.
let signKey = document.getElementById('keyNeg');
signKey.addEventListener('click', changeSign);

// Assign Event Handler to Operation keys
let operationKeys = document.querySelectorAll('input.operation');
for (let key of operationKeys) {
    key.addEventListener('click', runCalculation);
}

//Assign Event Handler to Equals Key
let equalsKey = document.getElementById('keyEqual');
equalsKey.addEventListener('click', runCalculation);

// Assign Event Handler to Reset Key
let resetKey = document.getElementById('keyReset');
resetKey.addEventListener('click', resetCalculatorByClick);

function getNumberInput(event) {
    let inputBox = document.getElementById('inputBox');
    
    if (inputBox.value == '0') {
	inputBox.value = String(event.target.value);
    } else {
	inputBox.value = inputBox.value + String(event.target.value);
    }
}

function changeSign(event) {
    let inputBox = document.getElementById('inputBox');
    
    if (inputBox.value[0] == "-") {
	inputBox.value = inputBox.value.slice(1); // slice from 1st to end.
    } else {
	inputBox.value = "-" + inputBox.value;
    }    
}

function resetCalculatorByClick(event) {
    resetCalculator( );
}

function resetCalculator(text='0') {
    let inputBox = document.getElementById('inputBox');
    let resultDisplay = document.getElementById('result');

    firstCalc = true;
    lastOperation = '';
    inputBox.value = '0';
    resultDisplay.textContent = text;
}

function runCalculation(event) {
    /****************
     * Function to handle the onclick event when a user presses 
     * the calculate button on the form in calculator.html.
     * This function selects the operation received from the "select operation" menu,
     * and displays the result on the webpage.
     ****************/
    let operation = event.target.value;
    let numberString = document.getElementById('inputBox').value;
    let resultDiv = document.getElementById('result');

    if (! numberString.includes(',')) {
	let n1 = Number(numberString);
	let result = Number(resultDiv.textContent);

	try {
	    if (firstCalc) {
		result = n1;
		lastOperation = operation;
		firstCalc = false;
	    } else {
		result = performOperation(lastOperation, n1, result);
		lastOperation = operation;
	    }
	    
	    resultDiv.textContent = result;

	    // If the user selects the operation "=", keep the result on the text box
	    // and reset lastOperation and firstCalc so that the user can use this as a restart point
	    if (operation == '=') {
		lastOperation = '';
		firstCalc = true;
		document.getElementById('inputBox').value = result;
	    } else {
		document.getElementById('inputBox').value = 0;
	    }
	} catch(e) {
	    resetCalculator(e.message);
	}
    } else {
	alert( "Input Error: fractional numbers are only accepted with decimal point notation (e.g 1.44);\n" +
	       "             thousand separators are not accepted (e.g. 1,999,250 should be 1999250).");
	document.getElementById('inputBox').value = 0;
    }
}

function performOperation(operation, n1, result) {
    /******************
     * Performs the selected operation using the parameters n1 and result.
     * Returns undefined if any or all of the parameters are missing.
     *
     * Usage: result = performOperation(opString, n1, result);
     ******************/

    // Check for missing or undefined parameters.
    if ((operation === undefined) || (n1 === undefined) || (result === undefined)) {
	return;
    }
    
    switch (operation) {
        case '+': {
	    result = add(n1, result);
	    break;
	}
         case '-': {
	     result = sub(result, n1);
	     break;
        } 
        case '*': {
	    result = multiply(n1, result);
	    break;
	}
        case '/': {
	     if (n1 != 0) {
		 result = divide(result, n1);
	     } else {
		 throw new Error("Division error: division by zero is undefined.");
	     }
	     break;
	 }
        case '^': {
	    result = pow(result, n1);
	    break;
        }
	case 'sqrt': {
	    if (result >= 0) {
		result = sqrt(result);
	    } else {
		throw new Error("Square root error: square root of negative number is not real");
	    }
	    break;
	}
        default: {
	    throw new Error("General Error: operation not supported.");
	}
    }

    return result;
}

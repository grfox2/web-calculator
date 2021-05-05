/***
 * Provides the arithmetic operations supported by the calculator.
 * 
 * F. G. Ramon Fox (C) 2021
 * See LICENSE for conditions of use.
 ***/

"use strict";

/*******************
 * Mathematical Operations
 *******************/
function add(a, b) {
    /******************
     * Returns the addition of a and b.
     * Returns undefined if one of the parameters is missing.
     *
     * Usage: c = add(a, b);
     ******************/
    
    // Check for missing parameters.
    if ((a === undefined) || (b === undefined)) {
	return;
    }
    
    return (a + b);
}

function sub(a, b) {
    /******************
     * Returns the subtraction of b from a: a - b.
     * Returns undefined if one of the parameters is missing.
     *
     * Usage: c = sub(a, b);
     ******************/
    
    // Check for missing parameters.
    if ((a === undefined) || (b === undefined)) {
	return;
    }

    return (a - b);
}

function multiply(a, b) {
    /******************
     * Returns the multiplication of a and b.
     * Returns undefined if one of the parameters is missing.
     *
     * Usage: c = multiply(a, b);
     ******************/
    
    // Check for missing parameters.
    if ((a === undefined) || (b === undefined)) {
	return;
    }
    
    return (a * b);
}

function divide(a, b) {
    /******************
     * Returns the division of a by b.
     * If b = 0, it will trigger an division by zero error and return Infinity.
     * Returns undefined if one of the parameters is missing.
     *
     * Usage: c = divide(a, b);
     ******************/
    
    // Check for missing parameters.
    if ((a === undefined) || (b === undefined)) {
	return;
    }
    
    return (a / b);
}

function pow(a, b) {
    /******************
     * Returns a raised to the power of b.
     * Returns undefined if one of the parameters is missing.
     *
     * Usage: c = divide(a, b);
     ******************/

    // Check for missing parameters.
    if ((a === undefined) || (b === undefined)) {
	return;
    }

    return a**b;
}

function sqrt(a) {
    /******************
     * Returns the sqrt of a.
     * It is a wrapper function that calls the function Math.sqrt.
     *
     * Usage: c = sqrt(a);
     ******************/
    
    // Check for missing parameters.
    if (a === undefined) {
	return;
    }

    return Math.sqrt(a);
}

//User Story: I can add, subtract, multiply and divide two numbers.
"use strict";
//User Story: I can clear the input field with a clear button.
//User Story: I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output.
//<reference path="jquery.d.ts">
$(".number").click(function (e) {
    var num = $(e.target).html();
    calc.numberPushed(num);
    calc.display();
});
$("button").mousedown(function (e) {
    //debugger;
    $(e.target).css("background-color", "gainsboro");
});
$("button").mouseup(function (e) {
    //debugger;
    $(e.target).css("background-color", "#fefefe");
});
$("#clear").click(function () {
    calc.clear();
});
$(".operator").click(function (e) {
    var value = $(e.target).html();
    calc.operatorPushed(value);
});
$("#equals").click(function () {
    calc.equals();
});
var Calculator = (function () {
    function Calculator() {
        this.chain = [];
        this.currentDisplay = "";
    }
    ;
    Calculator.prototype.numberPushed = function (num) {
        debugger;
        this.currentDisplay += num;
        this.display();
    };
    Calculator.prototype.operatorPushed = function (operator) {
        //do not process this operation if the user hasn't pushed a number first
        if (this.currentDisplay !== "") {
            //add the currently displayed value and the operator
            this.chain.push(this.currentDisplay);
            this.chain.push(operator);
            this.currentDisplay = "";
        }
    };
    Calculator.prototype.display = function () {
        var num = this.currentDisplay;
        if (this.currentDisplay === "") {
            num = "0";
        }
        $("#output").html(num);
    };
    Calculator.prototype.clear = function () {
        this.chain = [];
        this.currentDisplay = "";
        this.display();
    };
    Calculator.prototype.equals = function () {
        this.chain.push(this.currentDisplay);
        debugger;
        var total = parseFloat(this.chain[0]);
        var len = this.chain.length - 1;
        for (var i = 1; i < len; i += 2) {
            var parsedFloat = parseFloat(this.chain[i + 1]); //number comes after operator
            debugger;
            switch (this.chain[i]) {
                case "-":
                    total -= parsedFloat;
                    break;
                case "+":
                    total += parsedFloat;
                    break;
                case "x":
                    total *= parsedFloat;
                    break;
                case "/":
                    total /= parsedFloat;
                default:
                    break;
            }
        }
        this.currentDisplay = total.toFixed(8).toString();
        this.display();
        this.currentDisplay = "";
        this.chain = [];
    };
    return Calculator;
}());
var calc = new Calculator();
var lifeCalculator = {

    init: function() {
        this.quantityField = document.querySelector("#quantity-field");
        this.submitButton = document.querySelector("#submit-button");
        this.resultField = document.querySelector("#result-field");

        this.numbers = [];
        this.firstTurn = true;
        this.isArrayEven = false;

        this.bindActions();

    },
    bindActions: function() {
        this.submitButton.onclick = function(e) {
            e.preventDefault();
            if(this.validate()) {
                var quantity = this.quantityField.value;
                var result = 0;

                this.createTable(quantity);           
                result = this.calc(quantity);
                this.renderResult(result);
            }
        }.bind(this);
    },
    renderResult: function(value) {
        this.resultField.innerHTML = "Zabawę przeżył nr. " + value;
    },

    createTable: function(quantity) {
        this.varClear();

        for(var i = 1; i <= quantity; i++) {
            this.numbers.push(i);
        }
    },

    checkArrayParity: function() {
        if(this.numbers.length % 2 === 0) {
            this.isArrayEven = true;
        } else if(this.numbers.length % 2 !== 0) {
            this.isArrayEven = false;
        }
    },
    validate() {
        if((this.quantityField.value === "") || (this.quantityField.value > 999999) || (this.quantityField.value < 1)) {
            this.resultField.innerHTML = "Podałeś niepoprawną wartość.";
            return false;
        }
        return true;
    },

    filterNumbers: function() {
        this.numbers = this.numbers.filter(function(value){
            return value !== "";
        });
    },
    evenArray: function() {
        for(var i=0; i < this.numbers.length; i++) {
            if(i % 2 !== 0) {
                this.numbers.splice(i, 1, "");
            }
        }
        this.checkArrayParity();
        this.filterNumbers();   
    },
    oddArray: function() {
        for(var i=0; i < this.numbers.length; i++) {
            if(i === 0) {
                this.numbers.splice(i, 1);
            } else if(i % 2 !== 0) {
                this.numbers.splice(i, 1, "");
            }
        }
        this.checkArrayParity();
        this.filterNumbers();
    },
    splice: function() {
        if(this.firstTurn) {
            this.evenArray();
            this.firstTurn = false;
        }

        if(this.isArrayEven) {
            this.evenArray();
        } else {
            this.oddArray();
        }
    },

    calc: function() {
        while(this.numbers.length > 1) {
            this.splice();
        }
        return this.numbers[0];
    },

    varClear: function() {
        this.numbers.length = 0;
        this.firstTurn = true;
        this.isArrayEven = false;
    }
};

lifeCalculator.init();
function Cell(key, parentBoard) {
    this.result = null;
    this.userInput = '';
    this.key = key;
    this.isValid = true; 
    this.parentBoard = parentBoard;

    this.set = function (userInput) {
        this.userInput = userInput.toString();
        let res = calculate (userInput, this.parentBoard, this.key);
        this.result = res.result;
        this.isValid = res.isValid;

        let board = this.parentBoard 
        if(board.loopers[this.key]) {
            board.loopers[this.key].forEach(cellKey => {
                let cell = board.getCell(cellKey); 
                cell.set(cell.userInput);
            })
        }
    }

    this.get = function (mode) {
        if(mode == 1) {
            return this.userInput;
        }

        return this.result;
    }

    function calculate(userInput, parentBoard, key) {
        const input = userInput.toString(); 
        if(!input.startsWith('=')) {
            return  {
                isValid: true,
                result: input
            };
        }
        else {
            let formula = input.substr(input.indexOf('=') + 1)
            if(formula.toLowerCase().startsWith('sum')) {
                return calculateSum(formula);
            } else {
                return getMathematicResult(input, formula, parentBoard, key)
            }
        }
    }

    function calculateSum (formula) {
        let values = formula.replace('sum', '').replace('(', '').replace(')', '');
        let sumValues = values.split(',');
        
        let sum = 0;
        let isValid = true;
        sumValues.forEach(element => {
            if(isNaN(element)) {
                isValid = false;
            }
            else {
                sum += parseFloat(element)
            }
        });

        if(!isValid) {
            return {
                isValid: false,
                result: input
            };
        } else {
            return {
                isValid: true,
                result: sum
            }
        }
    }

    function getMathematicResult(input, formula, parentBoard, key) {
        let formulaValues = formula.split('+');
        let result = 0;
        for(let i=0; i < formulaValues.length; i++) {

            //try getting cell by characters 
            if(isNaN(formulaValues[i])) {
                let cell = parentBoard.getCell(formulaValues[i]);
                if(!cell) {
                    return {
                        isValid: false,
                        result: input
                    };
                }
                else {
                    //add reference between cells
                    if(!parentBoard.loopers[cell.key]) {
                        parentBoard.loopers[cell.key] = []
                    } 
                    
                    if(parentBoard.loopers[cell.key].indexOf(key) === -1) {
                        parentBoard.loopers[cell.key].push(key)
                    }

                    result += cell.result
                }
            } else {
                result += parseFloat(formulaValues[i])
            }
        }    
        
        return {
            isValid: true,
            result: result
        }
    }


    return this; 
}
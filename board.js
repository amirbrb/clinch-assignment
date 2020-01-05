function Board () {
    cells = {};
    //this property holds all cells which are looping over each other (e.g - a2 and a3 holds a1 in its formula, this object will hold {"a1": ["a2", "a3"]})
    this.loopers = {} 

    this.addCell = function (cell){
        cells[cell.key] = cell;
    }
    this.getCell = function (cellKey){
        return cells[cellKey];
    }
}

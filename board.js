function Board () {
    cells = {};

    //this will hold a reference between a cell and the cells which are using it ({"a", ["a2", "a3"]})
    this.loopers = {}

    this.addCell = function (cell){
        cells[cell.key] = cell;
    }
    this.getCell = function (cellKey){
        return cells[cellKey];
    }
}

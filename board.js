function Board () {
    cells = {};
    this.loopers = {}

    this.addCell = function (cell){
        cells[cell.key] = cell;
    }
    this.getCell = function (cellKey){
        return cells[cellKey];
    }
}

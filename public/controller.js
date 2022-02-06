class Controller {
    constructor(cellChanged) {
        this.cellChanged = cellChanged;
        this.gridWrapper = document.querySelector('.grid-wrapper');
        this.colourInput = document.querySelector('.cell-colour');
        this.paintCount = document.querySelector('.paint-count');
        this.paintCounter = 0;
        this.gridWidth = 16;
        this.gridHeight = 16;
        this.litCells = {};
        this.cellRefs = {};
        this.mouseDown = false;
    };

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    getCell(x, y) {
        return this.cellRefs[x][y];
    }

    applyCellColour(cell, hex) {
        const { x, y } = cell.dataset;

        this.litCells[x][y] = hex;
        cell.style.backgroundColor = hex;
    }

    cellClicked(x, y, cell) {
        const hexColour = this.colourInput.value;

        if (this.litCells[x][y] === hexColour) {
            // cell already painted in this colour, ignore
            return;
        }

        this.applyCellColour(cell, hexColour, false);

        const { r, g, b } = this.hexToRgb(hexColour);
        this.cellChanged(x, y, r, g, b);
    };

    cellDraggedOver(e) {
        const cell = document.elementFromPoint(
            e.touches[0].clientX,
            e.touches[0].clientY
        );

        if (!cell.classList.contains('cell')) {
            return;
        }

        // Trigger the callback for an external handler to send requests
        this.cellClicked(cell.dataset.x, cell.dataset.y, cell);
    };

    updatePaintCount(newCount) {
        this.paintCounter = newCount;
        this.paintCount.textContent = this.paintCounter;
    }

    // Generates the 16x16 grid with event handlers
    // Existing cells may contain data of the current grid state, this typically occurs at start-up
    generateGrid(existingCells) {
        this.gridWrapper.textContent = '';
        this.gridWrapper.addEventListener('touchmove', (e) => this.cellDraggedOver(e));
        this.gridWrapper.addEventListener('mousedown', () => this.mouseDown = true);
        this.gridWrapper.addEventListener('mouseup', () => this.mouseDown = false);

        // row
        for (let cellY = 0; cellY < this.gridHeight; cellY++) {
            const row = document.createElement('div');
            row.classList.add('row');
            row.dataset.row = cellY;
            this.gridWrapper.appendChild(row);

            // columns
            for (let cellX = 0; cellX < this.gridWidth; cellX++) {
                const cell = document.createElement('div');

                // initialise on the first pass
                this.cellRefs[cellX] = this.cellRefs[cellX] || {};
                this.cellRefs[cellX][cellY] = cell;
                this.litCells[cellX] = this.litCells[cellX] || {};

                cell.classList.add('cell');
                cell.dataset.x = cellX;
                cell.dataset.y = cellY;

                if (existingCells?.[cellX]?.[cellY]) {
                    this.applyCellColour(cell, existingCells[cellX][cellY]);
                }

                cell.addEventListener('click', () => this.cellClicked(cellX, cellY, cell));
                cell.addEventListener('mouseover', () => this.mouseDown && this.cellClicked(cellX, cellY, cell));
                row.appendChild(cell);
            }
        }
    };
};

export default Controller;
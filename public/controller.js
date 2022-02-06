class Controller {
    constructor(cellChanged) {
        this.cellChanged = cellChanged;
        this.gridWrapper = document.querySelector('.grid-wrapper');
        this.colourInput = document.querySelector('.cell-colour');
        this.gridWidth = 16;
        this.gridHeight = 16;
        this.litCells = {};
    };

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    cellClicked(x, y, cell) {
        const hexColour = this.colourInput.value;

        if (!this.litCells[x]) {
            this.litCells[x] = {};

        } else if (this.litCells[x][y] === hexColour) {
            // cell already painted in this colour, ignore
            return;
        }

        this.litCells[x][y] = hexColour;

        cell.style.backgroundColor = hexColour;
        const { r, g, b } = this.hexToRgb(hexColour);

        this.cellChanged(x, y, r, g, b);
        // this.sendCellChangeRequest(x, y, r, g, b);
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

    // Generates the 16x16 grid with event handlers
    generateGrid() {
        this.gridWrapper.textContent = '';
        this.gridWrapper.addEventListener('touchmove', (e) => this.cellDraggedOver(e));

        // row
        for (let cellY = 0; cellY < this.gridHeight; cellY++) {
            const row = document.createElement('div');
            row.classList.add('row');
            row.dataset.row = cellY;
            this.gridWrapper.appendChild(row);

            // columns
            for (let cellX = 0; cellX < this.gridWidth; cellX++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = cellX;
                cell.dataset.y = cellY;

                cell.addEventListener('click', () => this.cellClicked(cellX, cellY, cell));
                row.appendChild(cell);
            }
        }
    };
};

export default Controller;
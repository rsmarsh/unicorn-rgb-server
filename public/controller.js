const gridWrapper = document.querySelector('.grid-wrapper');
const colourInput = document.querySelector('.cell-colour');
const gridWidth = 16;
const gridHeight = 16;

const litCells = {};

const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

const sendCellChangeRequest = (x, y, r, g, b) => {
    fetch(`/pixel/set/${x}/${y}/${r}/${g}/${b}`);
}

const cellClicked = (x, y, cell) => {
    
    const hexColour = colourInput.value;
    
    if (!litCells[x]) {
        litCells[x] = {};
        
    } else if (litCells[x][y] === hexColour) {
        // cell already painted in this colour, ignore
        return;
    }
    
    litCells[x][y] = hexColour;
    
    cell.style.backgroundColor = colourInput.value;
    const {r, g, b} = hexToRgb(colourInput.value);
    
    sendCellChangeRequest(x, y, r, g, b);
};

const cellDraggedOver = (e) => {
    const cell = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY
    );

    if (!cell.classList.contains('cell')) {
        return;
    }

    cellClicked(cell.dataset.x, cell.dataset.y, cell);
};

// Generates the 16x16 grid with event handlers
const generateGrid = () => {
    gridWrapper.textContent = '';
    gridWrapper.addEventListener('touchmove', (e) => cellDraggedOver(e));
    
    // row
    for (let cellY = 0; cellY < gridHeight; cellY++) {
        const row = document.createElement('div');
        row.classList.add('row');
        row.dataset.row = cellY;
        gridWrapper.appendChild(row);

        // columns
        for (let cellX = 0; cellX < gridWidth; cellX++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = cellX;
            cell.dataset.y = cellY;

            cell.addEventListener('click', () => cellClicked(cellX, cellY, cell));
            row.appendChild(cell);
        }
    }
};

generateGrid();
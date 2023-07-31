const validateShipPlacement = (shipIndexes: number[]): string | undefined => {
  let message = "";

  if (shipIndexes.length < 20) {
    message = message.concat("Not enough ships placed\n");
  } else if (shipIndexes.length > 20) {
    message = message.concat("Too many ships placed\n");
  }

  const board = makeBoard(shipIndexes, 10, 10);
  const labeledBoard = labelShips([...board]);
  const blobs = extractBlobs(labeledBoard);

  const correctShapes = blobs.filter((blob) => {
    const [firstRow, firstCol] = blob[0];

    return (
      blob.every(([, col]) => col === firstCol) ||
      blob.every(([row]) => row === firstRow)
    );
  });

  if (correctShapes.length !== blobs.length) {
    message = message.concat(
      "Ships must be placed vertically or horizontally, have a width of a single cell and not touch each other\n"
    );
  }

  if (correctShapes.some((blob) => blob.length > 4)) {
    message = message.concat("The longest ship is four-masts\n");
  }

  if (correctShapes.filter((blob) => blob.length === 4).length !== 1) {
    message = message.concat("There should be 1 four-masted ship\n");
  }

  if (correctShapes.filter((blob) => blob.length === 3).length !== 2) {
    message = message.concat("There should be 2 three-masted ships\n");
  }

  if (correctShapes.filter((blob) => blob.length === 2).length !== 3) {
    message = message.concat("There should be 3 two-masted ships\n");
  }

  if (correctShapes.filter((blob) => blob.length === 1).length !== 4) {
    message = message.concat("There should be 4 one-masted ships\n");
  }

  return message ? message : undefined;
};

function labelShips(board: number[][]): number[][] {
  const height = board.length;
  const width = board[0].length;

  // Create two-dimensional array filled with 0 to store labels
  const labels: number[][] = makeBoard([], height, width);

  let nextLabel = 1;
  const equivalentLabels: { [key: number]: number } = {};

  // First pass
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (board[i][j] !== 0) {
        const neighbors: number[] = [];

        // Find all 8-connected neighbors with a label
        if (i > 0 && j > 0 && labels[i - 1][j - 1] !== 0) {
          neighbors.push(labels[i - 1][j - 1]); // top-left
        }
        if (i > 0 && labels[i - 1][j] !== 0) {
          neighbors.push(labels[i - 1][j]); // top
        }
        if (i > 0 && j < width - 1 && labels[i - 1][j + 1] !== 0) {
          neighbors.push(labels[i - 1][j + 1]); // top-right
        }
        if (j > 0 && labels[i][j - 1] !== 0) {
          neighbors.push(labels[i][j - 1]); // left
        }

        // If no neighbors have labels, assign a new label
        if (neighbors.length === 0) {
          labels[i][j] = nextLabel;
          equivalentLabels[nextLabel] = nextLabel;
          nextLabel++;
        } else {
          // Find the smallest label among neighbors and assign it
          const minLabel = Math.min(...neighbors);
          labels[i][j] = minLabel;

          // Update equivalent labels
          for (let k = 0; k < neighbors.length; k++) {
            const neighborLabel = neighbors[k];
            if (neighborLabel !== minLabel) {
              equivalentLabels[neighborLabel] = minLabel;
            }
          }
        }
      }
    }
  }

  // Second pass
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (labels[i][j] !== 0) {
        labels[i][j] = equivalentLabels[labels[i][j]];
      }
    }
  }

  return labels;
}

function extractBlobs(labels: number[][]) {
  const height = labels.length;
  const width = labels[0].length;

  // Create an object to store the blobs
  const blobs: { [key: number]: [number, number][] } = {};

  // Iterate over the labeled image and group pixels with the same label into arrays
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const label = labels[i][j];

      // If the pixel has a label, add it to the corresponding blob array
      if (label !== 0) {
        if (!blobs[label]) {
          blobs[label] = [];
        }
        blobs[label].push([i, j]);
      }
    }
  }

  // Convert the blobs object into an array of arrays
  const blobArray = Object.values(blobs);

  return blobArray;
}

const makeBoard = (
  shipIndexes: number[],
  height: number,
  width: number
): (0 | 1)[][] =>
  Array.from(Array(height)).map((_el, rowIndex) =>
    Array.from(Array(width)).map((_el, columnIndex) =>
      shipIndexes.includes(rowIndex * height + columnIndex) ? 1 : 0
    )
  );

export { validateShipPlacement };

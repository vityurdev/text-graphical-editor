class TextCanvas {
  constructor(width, height) {
    if (Number.isNaN(width) || Number.isNaN(height)) {
      throw new Error("Input syntax error: width and height must be integers.");
    }

    this.width = width;
    this.height = height;

    if (width < 0 || height < 0)  {
      throw new Error("Input syntax error: width and height must be non-negative.")
    }

    this.matrix = new Array(height + 2).fill(0)
      .map((e, i) => [0, height + 1].includes(i)
        ? new Array(width + 2).fill("-")
        : new Array(width + 2).fill("|", 0, 1).fill("|", -1).fill(" ", 1, -1)
    );
  }

  drawLine(x1, y1, x2, y2) {
    const isSomeCoordOutOfBounds = 
      x1 < 1 || x1 > this.width || x2 < 1 || x2 > this.width ||
      y1 < 1 || y1 > this.height || y2 < 1 || y2 > this.height;

    if (isSomeCoordOutOfBounds)
      throw new Error("Input syntax error: at least one coordinate is out of bounds.");

    if (x1 === x2) {
      if (y1 < y2) {
        for (let i = y1; i <= y2; i++)
          this.matrix[i][x1] = 'x';
      } else {
        for (let i = y2; i <= y1; i++)
          this.matrix[i][x1] = 'x';
      }
    } else if (y1 === y2) {
      if (x1 < x2) {
        for (let i = x1; i <= x2; i++)
          this.matrix[y1][i] = 'x';
      } else {
        for (let i = x2; i <= x1; i++)
          this.matrix[y1][i] = 'x';
      }
    } else {
      throw new Error("Input syntax error: only vertical and horizontal lines are supported");
    }
  }

  drawRectangle(x1, y1, x2, y2) {
    const isSomeCoordOutOfBounds = 
      x1 < 1 || x1 > this.width || x2 < 1 || x2 > this.width ||
      y1 < 1 || y1 > this.height || y2 < 1 || y2 > this.height;

    if (isSomeCoordOutOfBounds)
      throw new Error("Input syntax error: at least one coordinate is out of bounds.");

    if (x1 > x2 || y1 > y2) {
      throw new Error("Input syntax error: (x1, y1) must be upper-left point whereas (x2, y2) must be lower-right one.");
    }

    this.drawLine(x1, y1, x2, y1);
    this.drawLine(x1, y2, x2, y2);
    this.drawLine(x1, y1, x1, y2);
    this.drawLine(x2, y1, x2, y2);
  }

  fillArea(x, y, color) {
    if (x < 1 || x > this.width || y < 1 || y > this.height)
      throw new Error("Input syntax error: either x or y is out of bounds.")

    const targetColor = this.matrix[y][x];

    if (targetColor === color)
      return;

    this.matrix[y][x] = color;
    let queue = [{x, y, color}];
  
    while (queue.length) {
      const node = queue.shift();
      const {x, y, color} = node;
  
      if (this.matrix[y][x-1] === targetColor) {
        this.matrix[y][x-1] = color;
        queue = [...queue, { x: x-1, y, color }];
      }
  
      if (this.matrix[y][x+1] === targetColor) {
        this.matrix[y][x+1] = color;
        queue = [...queue, { x: x+1, y, color }];
      }
  
      if (this.matrix[y-1][x] === targetColor) {
        this.matrix[y-1][x] = color;
        queue = [...queue, { x, y: y-1, color }];
      }
  
      if (this.matrix[y+1][x] === targetColor) {
        this.matrix[y+1][x] = color;
        queue = [...queue, { x, y: y+1, color }];
      }
    }
  }
}

export default TextCanvas;
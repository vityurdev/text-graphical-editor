import TextCanvas from './../models/TextCanvas';

test('Creating a canvas', () => {
  let textCanvas = new TextCanvas(5, 5);

  const expected = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['-', '-', '-', '-', '-', '-', '-']
  ];

  expect(textCanvas.matrix).toEqual(expected);
})

test('Drawing a line', () => {
  let textCanvas = new TextCanvas(5, 5);
  textCanvas.drawLine(1, 2, 5, 2);

  const expected = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', 'x', 'x', 'x', 'x', 'x', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['-', '-', '-', '-', '-', '-', '-']
  ];

  expect(textCanvas.matrix).toEqual(expected);
});

test('Drawing a rectangle', () => {
  let textCanvas = new TextCanvas(5, 5);
  textCanvas.drawRectangle(2, 2, 4, 4);

  const expected = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', 'x', 'x', 'x', ' ', '|'],
    ['|', ' ', 'x', ' ', 'x', ' ', '|'],
    ['|', ' ', 'x', 'x', 'x', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['-', '-', '-', '-', '-', '-', '-']
  ];

  expect(textCanvas.matrix).toEqual(expected);
});

test('Bucket filling', () => {
  let textCanvas = new TextCanvas(5, 5);
  textCanvas.fillArea(3, 3, 'o');

  const expected = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['|', 'o', 'o', 'o', 'o', 'o', '|'],
    ['|', 'o', 'o', 'o', 'o', 'o', '|'],
    ['|', 'o', 'o', 'o', 'o', 'o', '|'],
    ['|', 'o', 'o', 'o', 'o', 'o', '|'],
    ['|', 'o', 'o', 'o', 'o', 'o', '|'],
    ['-', '-', '-', '-', '-', '-', '-']
  ];

  expect(textCanvas.matrix).toEqual(expected);
});
import React from 'react';

import TextCanvas from './../../models/TextCanvas';

import { getDBClient } from '../../services/db';

class FileInput extends React.Component {
  constructor(props) {
    super(props);

    this.fileInputRef = React.createRef();
  }

  handleProcessButtonClick = () => {
    const { setCanvasMatrix, setErrorMessage, clearErrorLogTrace } = this.props;
    
    const db = getDBClient({ reset: true });

    setCanvasMatrix([]);
    clearErrorLogTrace();

    let lineCount = 1;
    
    const reader = new FileReader();
    const textFilePattern = /text.*/;

    const file = this.fileInputRef.current.files[0];

    if (!file) {
      return setErrorMessage(null, "Please upload a file");
    }

    if (!file.type.match(textFilePattern)) {
      return setErrorMessage(null, "File format error: uploaded file doesn't appear to be text file.");
    }

    reader.onload = async event => {
      try {
        const drawingSteps = event.target.result.split('\r\n');
        const initialStep = drawingSteps.shift();

        if (initialStep[0] !== 'C') {
          return setErrorMessage(1, "Input syntax error: canvas has not been drawn yet. Use command 'C x y' to draw a canvas.");
        }

        const [width, height] = initialStep.substr(2).split(' ').map(e => +e);    
        const textCanvas = new TextCanvas(width, height);

        await db.paintingSteps.add({
          command: initialStep,
          canvasMatrix: textCanvas.matrix
        });

        for (let step of drawingSteps) {        
          lineCount += 1;

          const type = step[0];
          const params = step.substr(2).split(' ')
            .map(e => Number.isInteger(+e) ? +e : e);

          switch (type) {
            case 'L': {
              const [x1, y1, x2, y2] = params;
              textCanvas.drawLine(x1, y1, x2, y2);
            } break;
            case 'R': {
              const [x1, y1, x2, y2] = params;
              textCanvas.drawRectangle(x1, y1, x2, y2);
            } break;
            case 'B':
              const [x, y, color] = params;
              textCanvas.fillArea(x, y, color);
              break;
            case 'C':
              throw new Error('Input syntax error: canvas has been already drawn.');
            default:
              throw new Error('Input syntax error: unrecognizable operation. Operations allowed: C, L, R, B.');
          }
              
          await db.paintingSteps.add({
            command: step,
            canvasMatrix: textCanvas.matrix
          });
        }
        
        setCanvasMatrix(textCanvas.matrix);
      } catch (error) {
        console.log(error.stack);
        setErrorMessage(lineCount, error.message);
      }
    }
    
    reader.readAsText(file);
  }

  render() {
    return (
      <div>
        <input type="file" ref={this.fileInputRef} name="Upload a file"></input>
        <input type="button" onClick={this.handleProcessButtonClick} value="Process"></input>
      </div>
    )
  }
}

export default FileInput;
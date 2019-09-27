import React from 'react';
import './App.css';
import FileInput from './components/FileInput/FileInput';
import Canvas from './components/Canvas/Canvas';
import DownloadSection from './components/DownloadSection/DownloadSection';
import Description from './components/Description/Description';

class App extends React.Component {
  state = {
    canvasMatrix: [],
    errorMessages: []
  }

  setCanvasMatrix = (canvasMatrix) => this.setState({ canvasMatrix });

  setErrorMessage = (line, errorMessage) => 
    this.setState(prevState => ({
      errorMessages: [...prevState.errorMessages, line == null
        ? errorMessage
        : `Check line ${line} in input file.\n${errorMessage}`
      ]
    }));

  clearErrorLogTrace = () => this.setState({ errorMessages: []});

  render() {
    const { canvasMatrix, errorMessages } = this.state;

    return (
      <main className="main">
        <h1>Text Graphic Editor</h1>
        <Description />
        <FileInput 
          setErrorMessage={this.setErrorMessage}
          clearErrorLogTrace={this.clearErrorLogTrace}
          setCanvasMatrix={this.setCanvasMatrix} />
        <Canvas
          canvasMatrix={canvasMatrix}
          errorMessages={errorMessages}  />
        {errorMessages.length > 0 &&
          <p>Get rid of all errors to download a step-by-step painting guide!</p>
        }
        {canvasMatrix.length > 0 && !errorMessages.length && 
          <DownloadSection />
        }
      </main>
    )
  }
}

export default App;
import React from 'react';

import "./Canvas.css";

class Canvas extends React.Component {
  state = {
    canvasText: ''
  }

  static getDerivedStateFromProps(props) {
    return {
      canvasText: props.canvasMatrix.map(row => row.join("")).join('\n')
    }
  }

  render() {
    const { canvasText } = this.state;
    const { errorMessages } = this.props

    return (
      <>
        <pre>{canvasText}</pre>
        <div>
          {errorMessages.map((msg, i) => <p key={i} className="error-message">{msg}</p>)}  
        </div> 
      </>
    )
  }
}

export default Canvas;
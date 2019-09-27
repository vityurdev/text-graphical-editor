import React from 'react';

import { getDBClient } from '../../services/db';

import './DownloadSection.css';

class DownloadSection extends React.Component {
  handleDownloadButtonClick = async () => {
    const db = getDBClient({ reset: false });

    const paintingSteps = (await db.paintingSteps.toArray())
      .map((step, i) => {
        return `${i + 1}. ${step.command}\r\n${step.canvasMatrix.map(row => row.join("")).join('\r\n')}`
      })
      .join("\r\n");

    const element = document.createElement("a");
    const file = new Blob([paintingSteps], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "output.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    URL.revokeObjectURL(element.href); // Allow GC to delete blob
  };

  render() {
    return (
      <>
        <p>Download step-by-step painting by clicking the button below!</p> 
        <button className="download-button" onClick={this.handleDownloadButtonClick}>Download</button>
      </>
    )
  }
}

export default DownloadSection;
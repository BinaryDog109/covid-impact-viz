import "./App.css";


import { HistogramAndPie } from "./components/HistogramAndPie";

const diagramSpace = {
  top: 22,
  left: 350,
  bottom: 150,
  right: 200,
};

const displayWidth = window.innerWidth;
const displayHeight = window.innerHeight - 50;
const drawHeight = displayHeight - diagramSpace.top - diagramSpace.bottom;
const drawWidth = displayWidth - diagramSpace.left - diagramSpace.right;

function App() {
  
  return (
    <div className="container">
      <HistogramAndPie
        displayWidth={displayWidth}
        displayHeight={displayHeight}
        diagramSpace={diagramSpace}
        drawHeight={drawHeight}
        drawWidth={drawWidth}
      />
      
      <div className="scatter-plot">
        <div className="title">
          What is the relationship between initialtive apply rate and receive
          rate?
        </div>
        <svg width={displayWidth} height={displayHeight}>
          <g transform={`translate(${diagramSpace.left}, ${diagramSpace.top})`}>
            <text>123</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default App;

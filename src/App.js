import "./App.css";

import { HistogramAndPie } from "./components/diagrams/HistogramAndPie";
import { GovernmentSchemaScatterPlot } from "./components/diagrams/GovernmentSchemaScatterPlot";

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

      <GovernmentSchemaScatterPlot
        displayWidth={displayWidth}
        displayHeight={displayHeight - 50}
        translateLeft={diagramSpace.left + 80}
        translateTop={diagramSpace.top + 25}
        drawHeight={drawHeight}
        drawWidth={drawWidth - 100}
      />
    </div>
  );
}

export default App;

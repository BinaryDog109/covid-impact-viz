import "./App.css";

import { HistogramAndPie } from "./components/diagrams/HistogramAndPie";
import { GovernmentSchemaScatterPlot } from "./components/diagrams/GovernmentSchemaScatterPlot";
import { Map } from "./components/diagrams/Map";

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
      <Map
        displayWidth={displayWidth}
        displayHeight={displayHeight - 25}
        translateLeft={diagramSpace.left}
        translateTop={diagramSpace.top}
        drawHeight={drawHeight}
        drawWidth={drawWidth}
      />
    </div>
  );
}

export default App;

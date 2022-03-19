import "./App.css";

import { HistogramAndPie } from "./components/diagrams/HistogramAndPie";
import { GovernmentSchemaScatterPlot } from "./components/diagrams/GovernmentSchemaScatterPlot";
import { Map } from "./components/diagrams/Map";
import { IndustryGroupLineChart } from "./components/diagrams/IndustryGroupLineChart";

const diagramSpace = {
  top: 22,
  left: 350,
  bottom: 150,
  right: 200,
};

const displayWidth = 1280;
const displayHeight = 930 - 50;
const drawHeight = displayHeight - diagramSpace.top - diagramSpace.bottom;
const drawWidth = displayWidth - diagramSpace.left - diagramSpace.right;

function App() {
  return (
    <div className="container" style={{ width: displayWidth }}>
      <HistogramAndPie
        displayWidth={displayWidth}
        displayHeight={displayHeight}
        diagramSpace={diagramSpace}
        drawHeight={drawHeight}
        drawWidth={drawWidth}
      />

      <GovernmentSchemaScatterPlot
        displayWidth={displayWidth}
        displayHeight={displayHeight}
        translateLeft={diagramSpace.left + 80}
        translateTop={diagramSpace.top + 25}
        drawHeight={drawHeight}
        drawWidth={drawWidth - 50}
      />
      <Map
        displayWidth={displayWidth}
        displayHeight={displayHeight}
        translateLeft={diagramSpace.left}
        translateTop={diagramSpace.top}
        drawHeight={drawHeight}
        drawWidth={drawWidth}
        scale={1.25}
      />
      <IndustryGroupLineChart
        displayWidth={displayWidth}
        displayHeight={displayHeight}
        translateLeft={diagramSpace.left}
        translateTop={diagramSpace.top}
        drawHeight={drawHeight}
        drawWidth={drawWidth}
      />
    </div>
  );
}

export default App;

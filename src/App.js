import "./App.css";

import { scaleBand, scaleLinear, scaleOrdinal, max } from "d3";

import { useData } from "./useData";

import { XAxisChannel } from "./components/XAxisChannel";
import { YAxisChannel } from "./components/YAxisChannel";
import { Marks } from "./components/Marks";
import { ColorLegend } from "./components/ColorLegend";
import { useState } from "react";

const diagramSpace = {
  top: 200,
  left: 350,
  bottom: 90,
  right: 300,
};

const displayWidth = window.innerWidth;
const displayHeight = window.innerHeight;
const drawHeight = displayHeight - diagramSpace.top - diagramSpace.bottom;
const drawWidth = displayWidth - diagramSpace.left - diagramSpace.right;

function App() {
  const data = useData();
  const [hoverLegend, setHoverLegend] = useState(null);
  if (!data) return <h1 className="no-data-title">Loading data...</h1>;
  // x axis: response number
  // y axis: industry name

  const xAccessor = (elem) => +elem.responseNum;
  xAccessor.Continue = (elem) => Math.round(+elem.continue * +elem.responseNum);
  xAccessor.TemPause = (elem) => Math.round(+elem.temPause * +elem.responseNum);
  xAccessor.PermantStop = (elem) =>
    xAccessor(elem) - xAccessor.Continue(elem) - xAccessor.TemPause(elem);

  const yAccessor = (elem) => elem.Industry.replace(data.ontURI, "");

  const xMapping = scaleLinear()
    .domain([0, max(data, xAccessor)])
    .range([0, drawWidth])
    .nice();

  const yMapping = scaleBand()
    .domain(data.map(yAccessor))
    .range([0, drawHeight])
    .paddingInner(0.45);

  const colorMapping = scaleOrdinal()
    .domain(["Continue to Trade", "Temporarily Pause", "Permanently Stop"])
    .range(["#F2DA57", "#F6B656", "#C1BAA9"]);

  return (
    <div className="histogram">
      <svg width={displayWidth} height={displayHeight}>
        <g transform={`translate(${diagramSpace.left}, ${diagramSpace.top})`}>
          <XAxisChannel xMapping={xMapping} drawHeight={drawHeight} />
          <YAxisChannel yMapping={yMapping} />
          <Marks
            data={data}
            xMapping={xMapping}
            yMapping={yMapping}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            hoverLegend={hoverLegend}
            colorMapping={colorMapping}
          />
          <Marks
            data={data}
            xMapping={xMapping}
            yMapping={yMapping}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            hoverLegend={hoverLegend}
            colorMapping={colorMapping}
            mustDisplay={hoverLegend ? false : true}
          />

          <ColorLegend
            hoverLegend={hoverLegend}
            handleHover={setHoverLegend}
            colorMapping={colorMapping}
            drawWidth={drawWidth}
          />
        </g>
      </svg>
    </div>
  );
}

export default App;

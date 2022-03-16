import "./App.css";

import { scaleBand, scaleLinear, scaleOrdinal, max } from "d3";
import { useData } from "./dataset/useData";
import ReactDropdown from "react-dropdown";

import { XAxisChannel } from "./components/XAxisChannel";
import { YAxisChannel } from "./components/YAxisChannel";
import { Marks } from "./components/Marks";
import { ColorLegend } from "./components/ColorLegend";
import { PieChart } from "./components/PieChart";
import { useState } from "react";

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
  const data = useData().industryTradingStatusData;
  const [hoverLegend, setHoverLegend] = useState(null);

  // Dropdown state
  const defaultSelected = 0;
  const [selected, setSelected] = useState(defaultSelected);

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

  //   Attributes for react dropdown
  // all, large, non-large
  const attributes = [
    { value: "0", label: "All-Size Industry" },
    { value: "1", label: "250+ Industry" },
    { value: "2", label: "<250 Industry" },
  ];

  return (
    <div className="histogram">
      <div className="header">
        <div className="title">
          What is the trading status among the respondents?
        </div>
        <div className="drop-down-container" style={{marginRight: '10px', position: 'relative', top: '320px'}}>
          <ReactDropdown
            options={attributes}
            value={"0"}
            onChange={({ value }) => setSelected(value)}
          />
        </div>
      </div>
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
          <text
            className="axis-label"
            textAnchor="middle"
            x={drawWidth / 2}
            y={drawHeight}
            fontSize={30}
            dy={60}
          >
            Number of Responses
          </text>
          <ColorLegend
            hoverLegend={hoverLegend}
            handleHover={setHoverLegend}
            colorMapping={colorMapping}
            drawWidth={drawWidth}
          />
          <PieChart
            selected={selected}
            xAccessor={xAccessor}
            colorMapping={colorMapping}
            diagramSpace={diagramSpace}
            drawWidth={drawWidth}
          />
        </g>
      </svg>
    </div>
  );
}

export default App;

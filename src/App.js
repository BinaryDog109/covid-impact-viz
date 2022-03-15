import logo from "./logo.svg";
import "./App.css";

import { scaleBand, scaleLinear, scaleOrdinal, max } from "d3";

import { useData } from "./useData";

import { XAxisChannel } from "./components/XAxisChannel";
import { YAxisChannel } from "./components/YAxisChannel";
import { Marks } from "./components/Marks";

const diagramSpace = {
  top: 35,
  left: 350,
  bottom: 90,
  right: 150,
};
const outsideMargin = 20;
const textOffset = 50;

const displayWidth = window.innerWidth;
const displayHeight = window.innerHeight;
const drawHeight = displayHeight - diagramSpace.top - diagramSpace.bottom;
const drawWidth = displayWidth - diagramSpace.left - diagramSpace.right;

function App() {
  const data = useData();
  if (!data) return <h1 className="no-data-title">Loading data...</h1>;
  // x axis: response number
  // y axis: industry name
  console.log(data);

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
    .domain(["Continue to Trade", "Temporarily Pause", "Permantly Stop"])
    .range(["#F2DA57", "#F6B656", "#E25A42"]);


    const handleMouseEnter = () => {
      console.log("mouse in")
    }
  const ColorLegend = ({ legendOffset = 30, legendWidth = 10 }) => (
    <g onMouseEnter={handleMouseEnter} transform={`translate(${drawWidth + 5}, 0)`}>
      {colorMapping.domain().map((domainValue, index) => (
        <g transform={`translate(0, ${legendOffset * index})`}>
          <rect
            fill={colorMapping(domainValue)}
            width={legendWidth}
            height={legendWidth}
          />
          <text x={legendWidth + 5} dy={legendWidth}>{domainValue}</text>
        </g>
      ))}
    </g>
  );

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
          />
          <ColorLegend />
        </g>
      </svg>
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";

import { scaleBand, scaleLinear, max } from "d3";

import { useData } from "./useData";

import { XAxisChannel } from "./components/XAxisChannel";
import { YAxisChannel } from "./components/YAxisChannel";

const diagramSpace = {
  top: 35,
  left: 350,
  bottom: 90,
  right: 90,
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

  console.log(data);

  const xAccessor = (elem) => +elem.responseNum;
  const yAccessor = (elem) => elem.Industry.replace(data.ontURI, "");
  // x axis: response number
  // y axis: industry name
  const xMapping = scaleLinear()
    .domain([0, max(data, xAccessor)])
    .range([0, drawWidth])
    .nice();

  const yMapping = scaleBand()
    .domain(data.map(yAccessor))
    .range([0, drawHeight])
    .paddingInner(0.15);
    ;

    const Marks = () => (
      data.map(d => (
        <rect
          className="mark"
          key={yAccessor(d)}
          x={0}
          y={yMapping(yAccessor(d))}
          width={xMapping(xAccessor(d))}
          height={yMapping.bandwidth()}
        >
          {/* <title>{xValue(d)}</title> */}
        </rect>
    )))

  return (
    <div className="histogram">
      <svg width={displayWidth} height={displayHeight}>
        <g transform={`translate(${diagramSpace.left}, ${diagramSpace.top})`}>
          <XAxisChannel xMapping={xMapping} drawHeight={drawHeight} />
          <YAxisChannel yMapping={yMapping}/>
          <Marks />
        </g>
      </svg>
    </div>
  );
}

export default App;

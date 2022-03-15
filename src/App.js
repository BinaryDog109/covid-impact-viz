import logo from "./logo.svg";
import "./App.css";

import { scaleBand, scaleLinear, max } from "d3";

import { useData } from "./useData";

const diagramSpace = {
  top: 35,
  left: 300,
  bottom: 90,
  right: 90,
};
const outsideMargin = 20
const textOffset = 50;

const displayWidth = window.innerWidth
const displayHeight = window.innerHeight
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
    .range([0, drawHeight]);

  const XAxisChannel = () =>
    xMapping.ticks().map((tickValue) => (
      <g className="tick-group" key={tickValue} transform={`translate(${xMapping(tickValue)}, 0)`}>
        <line y2={drawHeight} />
        <text y={drawHeight}>{tickValue}</text>
      </g>
    ));
  
    const YAxisChannel = () => 
      yMapping.domain().map(domainValue => (
        <text y={yMapping(domainValue)}>{domainValue}</text>
      ))

  return (
    <div className="histogram">
      <svg
        width={displayWidth}
        height={displayHeight}
      >
        <g transform={`translate(${diagramSpace.left}, ${diagramSpace.top})`}><XAxisChannel />
        <YAxisChannel /></g>
        
      </svg>
    </div>
  );
}

export default App;

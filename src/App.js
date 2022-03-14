import logo from "./logo.svg";
import "./App.css";

import { scaleBand, scaleLinear, max } from "d3";

import { useData } from "./useData";

const margin = {
  top: 65,
  left: 120,
  bottom: 90,
  right: 30,
};
const textOffset = 50;

const drawHeight = window.innerHeight - margin.top - margin.bottom;
const drawWidth = window.innerWidth - margin.left - margin.right;

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

  const XAxisLine = () =>
    xMapping.ticks().map((tickValue) => (
      <g className="tick-group" key={tickValue} transform={`translate(${xMapping(tickValue)}, 0)`}>
        <line y2={drawHeight} />
        <text y={drawHeight}>{tickValue}</text>
      </g>
    ));
  
    const yAxis = () => 
      yMapping.domain().map(domain => (
        <text y={yMapping(domain)}>{domain}</text>
      ))

  return (
    <div className="container">
      <svg
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}><XAxisLine />
        <yAxis /></g>
        
      </svg>
    </div>
  );
}

export default App;

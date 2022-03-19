import { scaleBand, scaleLinear, scaleOrdinal } from "d3";
import { useState } from "react";
import ReactDropdown from "react-dropdown";
import { predicateTypes } from "../../dataset/predicateTypes";
import { useGovernmentSchemeData } from "../../dataset/useGovermentSchemeData";
import { ColorLegend } from "../ColorLegend";
import { LineChart } from "../LineChart";
import { XAxisBandChannel } from "../XAxisBandChannel";
import { XAxisChannel } from "../XAxisChannel";
import { YAxisLinearChannel } from "../YAxisLinearChannel";

export const IndustryGroupLineChart = ({
  displayWidth,
  displayHeight,
  translateLeft,
  translateTop,
  drawHeight,
  drawWidth,
}) => {
  const selectedInitialtiveString = "CoronavirusJobRetentionScheme";
  const [selected, setSelected] = useState(selectedInitialtiveString);
  // Hover on legend
  const [hover, setHover] = useState(null); 
  // Hover on the line
  const [hoverLine, sethoverLine] = useState(null); 

  const csvUrl = "./sparql/industry group initialtive.csv";
  const data = useGovernmentSchemeData(csvUrl, "IndustryGroup");

  if (!data) return <h1>Loading...</h1>;
  console.log(data);
  const groupedData = data[selected];
  const getPredicateString = (verb, initialtive) =>
    `${verb}_${initialtive}_Percentage`;

  const nameAccessor = (record) => {
    const name = record.IndustryGroup;
    if (name.includes("all")) return "All Band Size";
    if (name.includes("large")) return "> 250 Work Size";
    else return "< 250 Work Size";
  };
  const applyAccessor = (record) => {
    const value = record[getPredicateString("apply", selected)];
    return value === "*" ? 0 : +value;
  };
  const receiveAccessor = (record) => {
    const value = record[getPredicateString("receive", selected)];
    return value === "*" ? 0 : +value;
  };
  const intendAccessor = (record) => {
    const value = record[getPredicateString("intend", selected)];
    return value === "*" ? value : +value;
  };
  const yAccessor = applyAccessor;

  const xMapping = scaleBand()
    .domain(groupedData.map(nameAccessor))
    .range([0, drawWidth]);
  const yMapping = scaleLinear().domain([0, 1]).range([drawHeight, 0]);
  const yAccessors = { applyAccessor, receiveAccessor, intendAccessor };
  const colorMapping = scaleOrdinal()
    .domain(["applyAccessor", "receiveAccessor", "intendAccessor"])
    .range(["#BD8F22", "#BA5F06", "#005D6E"]);

  //   Attributes for the drop down menu
  const attributes = predicateTypes.map((predicate) => ({
    value: predicate,
    label: `Selected: ${predicate} Initialtive`,
  }));

  return (
    <div className="line-chart">
      <div className="title">
        What is the Government Schemes status among diffenrent work force size?
      </div>
      <div className="drop-down"  style={{ width: "70ch", marginLeft: "auto", textAlign: "center" }}>
        <ReactDropdown
          options={attributes}
          value={selected}
          onChange={({ value }) => setSelected(value)}
        />
      </div>
      <svg width={displayWidth} height={displayHeight}>
        <g transform={`translate(${translateLeft}, ${translateTop})`}>
          <YAxisLinearChannel
            textOffset={30}
            yMapping={yMapping}
            drawWidth={drawWidth}
            displayPercentage
            formatter={(v) => v * 100}
          />
          <g transform={`translate(${50}, 0)`}>
            <XAxisBandChannel
              textOffset={30}
              xMapping={xMapping}
              drawHeight={drawHeight}
            />
            <LineChart
              colorMapping={colorMapping}
              yAccessors={yAccessors}
              data={groupedData}
              xAccessor={nameAccessor}
              xMapping={xMapping}
              yAccessor={yAccessor}
              yMapping={yMapping}
              formatter={d=>(d*100).toFixed(2)}
              displayPercentage
              hoverLegend={hover}
              hoverLine={hoverLine}
              handleHoverLine={sethoverLine}
            />
          </g>
          <g transform={`translate(${10}, ${50})`}>
            <ColorLegend handleHover={setHover} hoverLegend={hover} deleteLegendText="Accessor" drawWidth={drawWidth} colorMapping={colorMapping} />
          </g>
          <text
            className="axis-label"
            textAnchor="middle"
            x={drawWidth / 2}
            y={drawHeight}
            fontSize={30}
            dy={60}
          >
            Industry Work Force Size
          </text>
          <text
            className="axis-label"
            textAnchor="middle"
            fontSize={30}
            dy={0}
            transform={`translate(${-60}, ${drawHeight / 2}) rotate(-90)`}
          >
            Initialtive Rates
          </text>
        </g>
      </svg>
    </div>
  );
};

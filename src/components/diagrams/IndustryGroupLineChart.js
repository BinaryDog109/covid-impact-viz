import { scaleLinear } from "d3";
import { max } from "d3";
import { scaleBand } from "d3";
import { useState } from "react";
import { useGovernmentSchemeData } from "../../dataset/useGovermentSchemeData";
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
  const xAccessor = applyAccessor;

  const xMapping = scaleBand()
    .domain(groupedData.map(nameAccessor))
    .range([0, drawWidth]);
  const yMapping = scaleLinear().domain([0, 1]).range([drawHeight, 0]);

  return (
    <div className="line-chart">
      <div className="title">
        What is the Government Schemes status among diffenrent work force size?
      </div>
      <svg width={displayWidth} height={displayHeight}>
        <g transform={`translate(${translateLeft}, ${translateTop})`}>
          <g transform={`translate(${50}, 0)`}>
            <XAxisBandChannel
              textOffset={30}
              xMapping={xMapping}
              drawHeight={drawHeight}
            />
          </g>
          <YAxisLinearChannel
            textOffset={30}
            yMapping={yMapping}
            drawWidth={drawWidth}
            displayPercentage
            formatter={v => v*100}
          />
        </g>
      </svg>
    </div>
  );
};

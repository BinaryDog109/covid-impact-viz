import { useGovernmentSchemeData } from "../../dataset/useGovermentSchemeData";
import { scaleLinear, scaleOrdinal, max } from "d3";
import { useState } from "react";
import { XAxisChannel } from "../XAxisChannel";
import { YAxisLinearChannel } from "../YAxisLinearChannel";
import { ColorLegend } from "../ColorLegend";
import { ScatterPlot } from "../ScatterPlot";
import ReactDropdown from "react-dropdown";
import { predicateTypes } from "../../dataset/predicateTypes";

export const GovernmentSchemaScatterPlot = ({
  displayWidth,
  displayHeight,
  translateLeft,
  translateTop,
  drawHeight,
  drawWidth,
}) => {
  const data = useGovernmentSchemeData();
  const selectedInitialtiveString = "CoronavirusJobRetentionScheme";
  const [option, setOption] = useState(selectedInitialtiveString);
  const [hoverLegend, setHoverLegend] = useState(null);
  const [hoverCircle, setHoverCircle] = useState(null);

  if (!data) return <h1>Loading...</h1>;

  const selectedData = data[option];
  const getPredicateString = (verb, initialtive) =>
    `${verb}_${initialtive}_Percentage`;
  const xAccessor = (record) => {
    const value = record[getPredicateString("apply", option)];
    return value === "*" ? 0 : +value;
  };
  const yAccessor = (record) => {
    const value = record[getPredicateString("receive", option)];
    return value === "*" ? 0 : +value;
  };
  const colorDomainAccessor = (record) => record["Industry"];
  const intendRateAccessor = (record) => {
    const value = record[getPredicateString("intend", option)];
    return value === "*" ? value : +value;
  };
  const sizeAccessor = (record) => {
    const value = record[getPredicateString("intend", option)];
    return value === "*" ? 0.005 * 80 : +value * 80;
  };
  const xMapping = scaleLinear().domain([0, 1]).range([0, drawWidth]).nice();
  const yMapping = scaleLinear().domain([0, 1]).range([drawHeight, 0]).nice();
  const colorMapping = scaleOrdinal()
    .domain(selectedData.map(colorDomainAccessor))
    .range([
      "#e6194b",
      "#3cb44b",
      "#ffe119",
      "#4363d8",
      "#f58231",
      "#911eb4",
      "#46f0f0",
      "#f032e6",
      "#bcf60c",
      "#fabebe",
      "#008080",
      "#e6beff",
    ]);
  const percentageFormatter = (d) => parseInt(d * 100);
  const attributes = predicateTypes.map((predicate) => ({
    value: predicate,
    label: `${predicate} Initiative`,
  }));
  const circleOpacity = 0.7;
  return (
    <div>
      <div className="scatter-plot">
        <div className="title">
          What is the relationship between initiative apply rate and receive
          rate?
        </div>
        <div style={{ width: "60ch", paddingLeft: "22px" }}>
          <ReactDropdown
            options={attributes}
            value={option}
            onChange={({ value }) => setOption(value)}
          />
        </div>
      </div>
      <svg width={displayWidth} height={displayHeight}>
        <g transform={`translate(${translateLeft}, ${translateTop})`}>
          <text
            className="axis-label"
            textAnchor="middle"
            x={drawWidth / 2}
            y={drawHeight}
            fontSize={30}
            dy={60}
          >
            Initiative Apply Rates
          </text>
          <text
            className="axis-label"
            textAnchor="middle"
            fontSize={30}
            dy={0}
            transform={`translate(${-60}, ${drawHeight / 2}) rotate(-90)`}
          >
            Initiative Receive Rates
          </text>
          <XAxisChannel
            formatter={percentageFormatter}
            textOffset={22}
            displayPercentage={true}
            xMapping={xMapping}
            drawHeight={drawHeight}
          />
          <YAxisLinearChannel
            textOffset={22}
            formatter={percentageFormatter}
            displayPercentage={true}
            yMapping={yMapping}
            drawWidth={drawWidth}
          />
          <ScatterPlot
            data={selectedData}
            yMapping={yMapping}
            xMapping={xMapping}
            colorMapping={colorMapping}
            colorDomainAccessor={colorDomainAccessor}
            sizeAccessor={sizeAccessor}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            intendRateAccessor={intendRateAccessor}
            hoverLegend={hoverLegend}
            hoverCircle={hoverCircle}
            handleHoverCircle={setHoverCircle}
            textOffset={25}
            circleOpacity={circleOpacity}
          />
          <ColorLegend
            textYOffset={10}
            offset={20}
            drawWidth={-translateLeft}
            colorMapping={colorMapping}
            useCircle
            handleHover={setHoverLegend}
            hoverLegend={hoverLegend}
            hoverCircle={hoverCircle}
            opacity={circleOpacity}
          />
        </g>
      </svg>
    </div>
  );
};

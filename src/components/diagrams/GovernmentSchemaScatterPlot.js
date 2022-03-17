import { useGovernmentSchemeData } from "../../dataset/useGovermentSchemeData";
import { scaleLinear, scaleOrdinal, max } from "d3";
import { XAxisChannel } from "../XAxisChannel";
import { YAxisLinearChannel } from "../YAxisLinearChannel";

export const GovernmentSchemaScatterPlot = ({
  displayWidth,
  displayHeight,
  diagramSpace,
  drawHeight,
  drawWidth,
}) => {
  const data = useGovernmentSchemeData();

  if (!data) return <h1>Loading...</h1>;
  console.log(data);

  const selectedInitialtiveString = "CoronavirusJobRetentionScheme";
  const selectedData = data[selectedInitialtiveString];
  const getPredicateString = (verb, initialtive) =>
    `${verb}_${initialtive}_Percentage`;
  const xAccessor = (record) => {
    const value =
      record[getPredicateString("apply", selectedInitialtiveString)];
    return value === "*" ? 0 : +value;
  };
  const yAccessor = (record) => {
    const value =
      record[getPredicateString("receive", selectedInitialtiveString)];
    return value === "*" ? 0 : +value;
  };
  const colorDomainAccessor = (record) => record["Industry"];
  const sizeAccessor = (record) => {
    const value =
      record[getPredicateString("intend", selectedInitialtiveString)];
    return value === "*" ? 0 : (+value) * 30;
  };
  const xMapping = scaleLinear()
    .domain([0, max(selectedData, xAccessor)])
    .range([0, drawWidth])
    .nice();
  const yMapping = scaleLinear()
    .domain([0, max(selectedData, yAccessor)])
    .range([drawHeight, 0])
    .nice();
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
    
  const ScatterPlot = ({ data }) =>
    data.map((record) => (
      <circle
        cx={xMapping(xAccessor(record))}
        cy={yMapping(yAccessor(record))}
        fill={colorMapping(colorDomainAccessor(record))}
        r={sizeAccessor(record)}
      >
        <title>{colorDomainAccessor(record)}</title>
      </circle>
    ));

  return (
    <div className="scatter-plot">
      <div className="title">
        What is the relationship between initialtive apply rate and receive
        rate?
      </div>
      <svg width={displayWidth} height={displayHeight}>
        <g transform={`translate(${diagramSpace.left}, ${diagramSpace.top})`}>
          <XAxisChannel textOffset={22} displayPercentage={true} xMapping={xMapping} drawHeight={drawHeight} />
          <YAxisLinearChannel yMapping={yMapping} drawWidth={drawWidth} />
          <ScatterPlot data={selectedData} />
        </g>
      </svg>
    </div>
  );
};

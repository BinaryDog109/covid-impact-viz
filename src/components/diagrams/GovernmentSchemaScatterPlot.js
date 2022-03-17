import { useGovernmentSchemeData } from "../../dataset/useGovermentSchemeData";
export const GovernmentSchemaScatterPlot = ({
  displayWidth,
  displayHeight,
  diagramSpace,
  drawHeight,
  drawWidth,
}) => {

    const data = useGovernmentSchemeData()

    if (!data) return <h1>Loading...</h1>
    console.log(data)

  return (
    <div className="scatter-plot">
      <div className="title">
        What is the relationship between initialtive apply rate and receive
        rate?
      </div>
      <svg width={displayWidth} height={displayHeight}>
        <g transform={`translate(${diagramSpace.left}, ${diagramSpace.top})`}>
          <text>123</text>
        </g>
      </svg>
    </div>
  );
};

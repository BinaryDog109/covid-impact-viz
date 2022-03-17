export const YAxisLinearChannel = ({ yMapping, drawWidth, textOffset = 15, formatter=tickValue=>tickValue, displayPercentage = false }) =>
  yMapping.ticks().map((tickValue) => (
    <g
      className="tick-group"
      key={tickValue}
      transform={`translate(0, ${yMapping(tickValue)})`}
    >
      <line x2={drawWidth} />
      <text textAnchor="middle" dy={"0.32em"} x={-textOffset}>
        {`${formatter(tickValue)}${displayPercentage? '%':''}`}
      </text>
    </g>
  ));
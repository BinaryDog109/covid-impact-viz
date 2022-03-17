export const XAxisChannel = ({ xMapping, drawHeight, textOffset = 15, formatter=tickValue=>tickValue, displayPercentage = false }) =>
  xMapping.ticks().map((tickValue) => (
    <g
      className="tick-group"
      key={tickValue}
      transform={`translate(${xMapping(tickValue)}, 0)`}
    >
      <line y2={drawHeight} />
      <text textAnchor="middle" y={drawHeight + textOffset}>
        {`${formatter(tickValue)}${displayPercentage? '%':''}`}
      </text>
    </g>
  ));

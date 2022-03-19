export const XAxisBandChannel = ({ xMapping, drawHeight, textOffset = 15, formatter=tickValue=>tickValue, displayPercentage = false }) =>
  xMapping.domain().map((domainValue) => (
    <g
      className="tick-group"
      key={domainValue}
      transform={`translate(${xMapping(domainValue)}, 0)`}
    >
      <line y2={drawHeight} />
      <text textAnchor="middle" y={drawHeight + textOffset}>
        {`${formatter(domainValue)}${displayPercentage? '%':''}`}
      </text>
    </g>
  ));

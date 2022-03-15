export const XAxisChannel = ({xMapping, drawHeight}) =>
    xMapping.ticks().map((tickValue) => (
      <g className="tick-group" key={tickValue} transform={`translate(${xMapping(tickValue)}, 0)`}>
        <line y2={drawHeight} />
        <text y={drawHeight}>{tickValue}</text>
      </g>
    ));
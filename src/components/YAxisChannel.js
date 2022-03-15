export const YAxisChannel = ({ yMapping, domainValueSplitIndex=30, textOffset=-10 }) =>
  yMapping.domain().map((domainValue) => (
    <g className="tick-group" transform={`translate(${textOffset}, 0)`}>
      <text y={yMapping(domainValue) + yMapping.bandwidth() / 2} textAnchor="end">
        <tspan  x="0" dx="0" dy="0">
          {domainValue.substring(0,domainValueSplitIndex)}
        </tspan>
        <tspan  x="0" dx="0" dy="16">
          {domainValue.substring(domainValueSplitIndex)}
        </tspan>
      </text>
    </g>
  ));

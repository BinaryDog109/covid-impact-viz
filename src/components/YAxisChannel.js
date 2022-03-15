export const YAxisChannel = ({ yMapping, domainValueSplitIndex=30, textOffset=-3 }) =>
  yMapping.domain().map((domainValue) => (
    <g transform={`translate(${textOffset}, 0)`}>
      <text y={yMapping(domainValue)} textAnchor="end">
        <tspan class="text" x="0" dx="0" dy="0">
          {domainValue.substring(0,domainValueSplitIndex)}
        </tspan>
        <tspan class="text" x="0" dx="0" dy="16">
          {domainValue.substring(domainValueSplitIndex)}
        </tspan>
      </text>
    </g>
  ));

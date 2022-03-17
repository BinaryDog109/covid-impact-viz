export const ColorLegend = ({
  legendOffset = 35,
  legendWidth = 10,
  drawWidth,
  colorMapping,
  hoverLegend = null,
  offset = 5,
  domainValueSplitIndex = 30,
  textYOffset = 10,
  handleHover = () => console.log("Hovered"),
}) => (
  <g className="main-shape" transform={`translate(${drawWidth + offset}, 0)`}>
    {colorMapping.domain().map((domainValue, index) => (
      <g
        key={domainValue}
        opacity={hoverLegend && domainValue !== hoverLegend ? 0.2 : 1}
        onMouseEnter={() => handleHover(domainValue)}
        onMouseLeave={() => handleHover(null)}
        cursor={"pointer"}
        transform={`translate(0, ${legendOffset * index})`}
      >
        <rect
          fill={colorMapping(domainValue)}
          width={legendWidth}
          height={legendWidth}
        />
        <g transform={`translate(${legendWidth + 5}, ${legendWidth})`}>
          <text>
            <tspan x="0" dx="0" dy="0">
              {domainValue.substring(0, domainValueSplitIndex)}
            </tspan>
            <tspan x="0" dx="0" dy="16">
              {domainValue.substring(domainValueSplitIndex)}
            </tspan>
          </text>
        </g>
      </g>
    ))}
  </g>
);

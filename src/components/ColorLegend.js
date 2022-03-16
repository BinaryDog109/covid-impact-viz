export const ColorLegend = ({
  legendOffset = 30,
  legendWidth = 10,
  drawWidth,
  colorMapping,
  hoverLegend,
  handleHover = () => console.log("Hovered"),
}) => (
  <g className="main-shape" transform={`translate(${drawWidth + 5}, 0)`}>
    {colorMapping.domain().map((domainValue, index) => (
      <g
        opacity={hoverLegend && domainValue !== hoverLegend? 0.2:1}
        onMouseEnter={() => handleHover(domainValue)}
        onMouseLeave={()=>handleHover(null)}
        cursor={"pointer"}
        transform={`translate(0, ${legendOffset * index})`}
      >
        <rect
          fill={colorMapping(domainValue)}
          width={legendWidth}
          height={legendWidth}
        />
        <text x={legendWidth + 5} dy={legendWidth}>
          {domainValue}
        </text>
      </g>
    ))}
  </g>
);

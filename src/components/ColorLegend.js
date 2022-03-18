export const ColorLegend = ({
  legendOffset = 35,
  legendWidth = 10,
  drawWidth,
  colorMapping,
  hoverLegend = null,
  offset = 5,
  domainValueSplitIndex = 30,
  textYOffset = 10,
  opacity = 0.5,
  useCircle = false,
  hoverCircle = null,
  handleHover = () => console.log("Hovered"),
}) => (
  <g className="color-legend main-shape" transform={`translate(${drawWidth + offset}, 0)`}>
    {colorMapping.domain().map((domainValue, index) => (
      <g
        key={domainValue}
        // Opacity for the rest of the text next to circle/rect
        
        opacity={(hoverLegend && domainValue !== hoverLegend) || (hoverCircle && hoverCircle !== domainValue) ?           
           0.2 : 1
          }
        onMouseEnter={() => handleHover(domainValue)}
        onMouseLeave={() => handleHover(null)}
        cursor={"pointer"}
        transform={`translate(0, ${legendOffset * index})`}
      >
        {useCircle ? (
          <circle
            fill={colorMapping(domainValue)}
            r={legendWidth / 2}
            cy="0.32em"
            cx="5"
            opacity={opacity}
          ></circle>
        ) : (
          <rect
            fill={colorMapping(domainValue)}
            width={legendWidth}
            height={legendWidth}
          />
        )}

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

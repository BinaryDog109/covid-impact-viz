export const ScatterPlot = ({
  data,
  yMapping,
  xMapping,
  colorMapping,
  colorDomainAccessor,
  sizeAccessor,
  yAccessor,
  xAccessor,
  intendRateAccessor,
  textOffset = 20,
  hoverLegend = null,
  hoverCircle = null,
  circleOpacity = 0.5,
  handleHoverCircle = () => console.log("Hovered"),
}) =>
  data.map((record) => {
    const xPosition = xMapping(xAccessor(record));
    const yPosition = yMapping(yAccessor(record));
    return (
      <g
        className="scatter-plot"
        key={colorDomainAccessor(record)}
        onMouseEnter={() => handleHoverCircle(colorDomainAccessor(record))}
        onMouseLeave={() => handleHoverCircle(null)}
      >
        <circle
          cx={xPosition}
          cy={yPosition}
          fill={colorMapping(colorDomainAccessor(record))}
          r={sizeAccessor(record)}
          opacity={hoverCircle && hoverCircle !== colorDomainAccessor(record)? 0 : circleOpacity}
          className={
            hoverLegend && hoverLegend === colorDomainAccessor(record)
              ? "transition-scale-on-legend"
              : hoverLegend
              ? "no-opacity"
              : null
          }
        >
          <title>{colorDomainAccessor(record)}</title>
        </circle>
        <g
          className={
            hoverLegend && hoverLegend === colorDomainAccessor(record)
              ? "text-group transition-scale-text-on-legend"
              : "text-group"
          }
          transform={`translate(0, ${-150 / 9})`}
        >
          <text
            textAnchor="middle"
            fontWeight={600}
            x={xPosition}
            y={yPosition}
          >{`${(intendRateAccessor(record) * 100).toFixed(
            2
          )}% of this industry intends to apply it`}</text>
          <text textAnchor="middle" x={xPosition} y={yPosition + textOffset}>
            {`${(xAccessor(record) * 100).toFixed(2)}% of this industry has applied for it`}
          </text>
          <text
            textAnchor="middle"
            x={xPosition}
            y={yPosition + textOffset * 2}
          >
            {`${(yAccessor(record) * 100).toFixed(2)}% of this industry has received it`}
          </text>
        </g>
      </g>
    );
  });

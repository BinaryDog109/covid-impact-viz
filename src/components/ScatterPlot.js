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
}) =>
  data.map((record) => {
    const xPosition = xMapping(xAccessor(record));
    const yPosition = yMapping(yAccessor(record));
    return (
      <g className="scatter-plot" key={record.Industry}>
        <circle
          cx={xPosition}
          cy={yPosition}
          fill={colorMapping(colorDomainAccessor(record))}
          r={sizeAccessor(record)}
          opacity={0.5}
          className={
            hoverLegend && hoverLegend === colorDomainAccessor(record)
              ? "transition-scale-on-legend"
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
          transform={`translate(0, ${-150/9})`}
        >
          <text textAnchor="middle" fontWeight={600} x={xPosition} y={yPosition}>{`${(
            intendRateAccessor(record) * 100
          ).toFixed(2)}% intends to apply it`}</text>
          <text textAnchor="middle" x={xPosition} y={yPosition + textOffset}>
            {`${(xAccessor(record) * 100).toFixed(2)}% has applied for it`}
          </text>
          <text textAnchor="middle" x={xPosition} y={yPosition + textOffset*2}>
            {`${(yAccessor(record) * 100).toFixed(2)}% has received it`}
          </text>
        </g>
      </g>
    );
  });

export const ScatterPlot = ({
  data,
  yMapping,
  xMapping,
  colorMapping,
  colorDomainAccessor,
  sizeAccessor,
  yAccessor,
  xAccessor
}) =>
  data.map((record) => (
    <circle
      cx={xMapping(xAccessor(record))}
      cy={yMapping(yAccessor(record))}
      fill={colorMapping(colorDomainAccessor(record))}
      r={sizeAccessor(record)}
      opacity={0.5}
    >
      <title>{colorDomainAccessor(record)}</title>
    </circle>
  ));

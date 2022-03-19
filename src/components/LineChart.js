import { line, curveNatural } from "d3";
export const LineChart = ({
  data,
  xMapping,
  yMapping,
  xAccessor,
  yAccessors,
  colorMapping,
  circleRadius = 10,
}) => (
  <g className="line-chart-mark">
    {Object.keys(yAccessors).map((yAccessorName) => {
        const yAccessor = yAccessors[yAccessorName]
        const color = colorMapping(yAccessorName)
      return (
        <g key={yAccessorName}>
          <path
          stroke={color}
            d={line()
              .curve(curveNatural)
              .x((record) => xMapping(xAccessor(record)))
              .y((record) => yMapping(yAccessor(record)))(data)}
          />
          {data.map((record) => {
            const xPosition = xMapping(xAccessor(record));
            const yPosition = yMapping(yAccessor(record));
            return (
              <g key={xAccessor(record)}>
                <circle fill={color} r={circleRadius} cx={xPosition} cy={yPosition}></circle>
              </g>
            );
          })}
        </g>
      );
    })}
  </g>
);

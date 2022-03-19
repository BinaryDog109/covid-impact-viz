import { line, curveNatural } from "d3";
export const LineChart = ({
  data,
  xMapping,
  yMapping,
  xAccessor,
  yAccessors,
  colorMapping,
  formatter = (d) => d,
  displayPercentage = false,
  circleRadius = 10,
  hoverLegend = null,
  hoverLine = null,
  handleHoverLine = () => {},
}) => (
  <g>
    {Object.keys(yAccessors).map((yAccessorName) => {
      const yAccessor = yAccessors[yAccessorName];
      const color = colorMapping(yAccessorName);
      return (
        <g
          key={yAccessorName}
          className={
            hoverLegend && hoverLegend !== yAccessorName
              ? "no-opacity line-chart-mark"
              : "line-chart-mark"
          }
          onMouseEnter={() => handleHoverLine(yAccessorName)}
          onMouseLeave={() => handleHoverLine(null)}
          opacity={hoverLine && hoverLine !== yAccessorName? 0 : 1}
        >
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
            const yValue = formatter(yAccessor(record));
            return (
              <g
                className="line-chart-circle-text"
                key={xAccessor(record)}
                transform={`translate(${xPosition}, ${yPosition})`}
              >
                <circle fill={color} r={circleRadius}>
                  <title>{`${yValue}${displayPercentage ? "%" : ""}`}</title>
                </circle>
                <text
                  className={
                    hoverLegend && hoverLegend === yAccessorName
                      ? "text-group transition-scale-text-on-legend"
                      : "text-group"
                  }
                  textAnchor="middle"
                  dy={"-0.32em"}
                >{`${yValue}${displayPercentage ? "%" : ""}`}</text>
              </g>
            );
          })}
        </g>
      );
    })}
  </g>
);

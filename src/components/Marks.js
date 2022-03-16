import { HistogramRect } from "./mark-components/HistogramRect";

export const Marks = ({ data, xMapping, yMapping, xAccessor, yAccessor, hoverLegend, colorMapping, mustDisplay }) =>
  data.map((d) => {
    return (
      <g className="mark" key={yAccessor(d)}>
        <HistogramRect
          record={d}
          xMapping={xMapping}
          yMapping={yMapping}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
          hoverLegend={hoverLegend}
          colorMapping={colorMapping}
          mustDisplay={mustDisplay}
        />
      </g>
    );
  });

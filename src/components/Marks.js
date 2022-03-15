import { HistogramRect } from "./mark-components/HistogramRect";

export const Marks = ({ data, xMapping, yMapping, xAccessor, yAccessor }) =>
  data.map((d) => {
    return (
      <g className="mark" key={yAccessor(d)}>
        <HistogramRect
          record={d}
          xMapping={xMapping}
          yMapping={yMapping}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
        />
      </g>
    );
  });

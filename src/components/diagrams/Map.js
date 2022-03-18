import { useData } from "../../dataset/useCountryAreaData";
import { geoAlbers, geoPath } from "d3";

export const Map = ({
  displayWidth,
  displayHeight,
  translateLeft,
  translateTop,
  drawHeight,
  drawWidth,
}) => {
  const projection = geoAlbers()
    .center([0, 52.561928])
    .rotate([-1.464854, 0])
    .parallels([41, 44])
    .translate([drawWidth / 2 + 300, drawHeight / 2])
    .scale(6000); // scale factor
  const path = geoPath(projection);
  const data = useData();
  if (!data) return <h1>Loading...</h1>;
  console.log(data);
  const { countryAreaData, areas } = data;
  return (
    <div>
      <div className="map">
        <div className="title">
          What is the trading and initialtive application status in different
          areas?
        </div>
        <svg width={displayWidth} height={displayHeight}>
          <g className="map-mark">
            {areas[0].features.map((feature) => (
              <path className="feature" d={path(feature)} />
            ))}
            {areas[1].features.map((feature) => (
              <path className="feature" d={path(feature)} />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

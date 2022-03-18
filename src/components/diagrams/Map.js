import { useData } from "../../dataset/useCountryAreaData";
import {
  geoNaturalEarth1,
  geoPath,
  schemeOranges,
  extent,
  scaleThreshold,
  min,
} from "d3";

export const Map = ({
  displayWidth,
  displayHeight,
  translateLeft,
  translateTop,
  drawHeight,
  drawWidth,
}) => {
  const data = useData();
  if (!data) return <h1>Loading...</h1>;
  console.log(data);

  const { countryAreaData, areas } = data;
  const featureCollection = {
    type: "FeatureCollection",
    features: [],
  };
  areas.forEach((area) => {
    featureCollection.features.push(...area.features);
  });

  const projection = geoNaturalEarth1().fitSize(
    [drawWidth, drawHeight],
    featureCollection
  );

  const path = geoPath(projection);

  const elemNum = areas.length;
  const continuAccessor = (data) => data.continue;
  const getScaleThreshold = (
    data,
    accessor = (d) => d,
    elemNum = data.length
  ) => {
    const extentArray = extent(data, accessor);
    const distance = Math.abs(extentArray[1] - extentArray[0]) / elemNum;
    const thresholds = [];
    for (let i = 1; i <= elemNum - 1; i++) {
      thresholds.push(min(data, accessor) + distance * i);
    }
    return scaleThreshold().domain(thresholds).range(schemeOranges[elemNum]);
  };

  return (
    <div>
      <div className="map">
        <div className="title">
          What is the trading and initialtive application status in different
          areas?
        </div>
        <svg width={displayWidth} height={displayHeight}>
          <g className="map-mark" transform={`scale(1.3)`}>
            {areas.map((area) => { 
              const mapName = area.mapName
              const areaData = countryAreaData.find()
              return (
              <g
                // fill={getScaleThreshold(countryAreaData, continuAccessor)()}
                className={area.mapName}
              >
                {area.features.map((feature) => (
                  <path className="feature" d={path(feature)} />
                ))}
              </g>
            )})}
          </g>
        </svg>
      </div>
    </div>
  );
};

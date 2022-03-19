import { geoNaturalEarth1, geoPath } from "d3";

export const MapMarks = ({
  areas,
  countryAreaData,
  countryNameAccessor,
  drawHeight,
  drawWidth,
  thresholdMapping,
  accesors,
  selected,
}) => {
  const featureCollection = {
    type: "FeatureCollection",
    features: [],
  };
  areas.forEach((area) => {
    featureCollection.features.push(...area.features);
  });

  const projection = geoNaturalEarth1().fitSize(
    [drawHeight, drawHeight],
    featureCollection
  );

  const path = geoPath(projection);
  return areas.map((area) => {
    // area is a geojson object, while record is retrieved from the d3.csv data
    const mapName = area.mapName;
    const record = countryAreaData.find(
      (elem) => countryNameAccessor(elem) === mapName
    );
    // Find the center of each area
    const [textX, textY] = path.centroid(area);

    return (
      <g key={area.mapName} className={`${area.mapName} map-area`}>
        {area.features.map((feature) => {
          return (
            <path key={feature.id}
              fill={thresholdMapping(accesors[selected](record))}
              className="feature"
              d={path(feature)}
            />
          );
        })}
        <text fontSize={"1.2rem"} fontWeight={600} textAnchor="middle" x={textX} y={textY}>
          {area.mapName}:{(accesors[selected](record) * 100).toFixed(2)}%
        </text>
      </g>
    );
  });
};

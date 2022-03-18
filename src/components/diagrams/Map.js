import { useData } from "../../dataset/useCountryAreaData";
import {
  geoNaturalEarth1,
  geoPath,
  schemeOranges,
  extent,
  scaleThreshold,
  min,
} from "d3";
import { ColorLegend } from "../ColorLegend";

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
    [drawHeight, drawHeight],
    featureCollection
  );

  const path = geoPath(projection);

  const continueAccessor = (record) => +record.continue;
  const countryNameAccessor = (record) => record.CountryArea;
  const temPauseAccessor = (record) => record.temPause;
  const permantStopAccessor = (elem) =>
    1 - permantStopAccessor(elem) - temPauseAccessor(elem);
  const AccreditedFinanceagreementsAccesor = (record) =>
    +record.AccreditedFinanceagreements;
  const BusinessRatesholidayAccesor = (record) => +record.BusinessRatesholiday;
  const CoronavirusJobRetentionSchemeAccesor = (record) =>
    +record.CoronavirusJobRetentionScheme;
  const DeferringVATpaymentsAccesor = (record) => +record.DeferringVATpayments;
  const GovernmentFundedSmallBusinessGrantOrLoanschemesAccesor = (record) =>
    +record.GovernmentFundedSmallBusinessGrantOrLoanschemes;
  const HMRCTimeToPayschemeAccesor = (record) => +record.HMRCTimeToPayscheme;

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

  const getThresholdMapping = (data, accessor) => getScaleThreshold(data, accessor);
  const thresholdMapping = getThresholdMapping(
    countryAreaData,
    continueAccessor
  )
  // Convert from threshold mapping to color mapping
  const colorMapping = {}
  colorMapping.domain = () => {

    const domain = [...thresholdMapping.domain()]
    domain.map()
  }
  colorMapping.range = () => [...thresholdMapping.range()]
  return (
    <div>
      <div className="map">
        <div className="title">
          What is the trading and initialtive application status in different
          areas?
        </div>
        <svg width={displayWidth} height={displayHeight}>
          <g className="map-mark" transform={`scale(1.4)`}>
            <ColorLegend  />
            {areas.map((area) => {
              // area is a geojson object, while record is retrieved from the d3.csv data
              const mapName = area.mapName;
              const record = countryAreaData.find(
                (elem) => countryNameAccessor(elem) === mapName
              );
              // Find the center of each area
              const [textX, textY] = (path.centroid(area))

              return (
                <g key={area.mapName} className={`${area.mapName} map-area`}>
                  {area.features.map((feature) => { 
                    return (
                    <path
                      fill={thresholdMapping(continueAccessor(record))}
                      className="feature"
                      d={path(feature)}
                    />
                  )})}
                  <text textAnchor="middle" x={textX} y={textY}>{area.mapName}:{(continueAccessor(record) * 100).toFixed(2)}%</text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

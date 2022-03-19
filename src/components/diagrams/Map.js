import { useData } from "../../dataset/useCountryAreaData";
import {
  schemeReds,
  extent,
  scaleThreshold,
  min,
  scaleOrdinal,
} from "d3";
import { ColorLegend } from "../ColorLegend";
import ReactDropdown from "react-dropdown";
import { predicateTypes } from "../../dataset/predicateTypes";
import { useState } from "react";
import { MapMarks } from "../MapMarks";

export const Map = ({
  displayWidth,
  displayHeight,
  translateLeft,
  translateTop,
  drawHeight,
  drawWidth,
  scale,
}) => {
  const data = useData();
  const initialSelected = "AccreditedFinanceagreementsAccessor";
  const [selected, setSelected] = useState(initialSelected);
  if (!data) return <h1>Loading...</h1>;

  const { countryAreaData, areas } = data;

  const continueAccessor = (record) => +record.continue;
  const countryNameAccessor = (record) => record.CountryArea;
  const temPauseAccessor = (record) => record.temPause;
  const permantStopAccessor = (elem) =>
    1 - permantStopAccessor(elem) - temPauseAccessor(elem);
  const AccreditedFinanceagreementsAccessor = (record) =>
    +record.AccreditedFinanceagreements;
  const BusinessRatesholidayAccessor = (record) => +record.BusinessRatesholiday;
  const CoronavirusJobRetentionSchemeAccessor = (record) =>
    +record.CoronavirusJobRetentionScheme;
  const DeferringVATpaymentsAccessor = (record) => +record.DeferringVATpayments;
  const GovernmentFundedSmallBusinessGrantOrLoanschemesAccessor = (record) =>
    +record.GovernmentFundedSmallBusinessGrantOrLoanschemes;
  const HMRCTimeToPayschemeAccessor = (record) => +record.HMRCTimeToPayscheme;
  const accesors = {
    continueAccessor,
    countryNameAccessor,
    temPauseAccessor,
    permantStopAccessor,
    AccreditedFinanceagreementsAccessor,
    BusinessRatesholidayAccessor,
    CoronavirusJobRetentionSchemeAccessor,
    DeferringVATpaymentsAccessor,
    GovernmentFundedSmallBusinessGrantOrLoanschemesAccessor,
    HMRCTimeToPayschemeAccessor,
  };
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
    return scaleThreshold().domain(thresholds).range(schemeReds[elemNum]);
  };
  const getThresholdMapping = (data, accessor) =>
    getScaleThreshold(data, accessor);
  const thresholdMapping = getThresholdMapping(
    countryAreaData,
    accesors[selected]
  );
  // Convert from threshold mapping to color mapping so it can be passed to ColorLegend
  const converToColorMapping = (thresholdMapping) => {
    const domain = [...thresholdMapping.domain()];
    let prev = 0;
    const domainArr = domain.reduce((acc, elem) => {
      acc.push(`${(prev * 100).toFixed(2)}% ~ ${(elem * 100).toFixed(2)}%`);
      prev = elem;
      return acc;
    }, []);
    domainArr.push(`> ${(prev * 100).toFixed(2)}%`); // Last range
    const colorMapping = scaleOrdinal()
      .domain(domainArr)
      .range([...thresholdMapping.range()]);
    return colorMapping;
  };
  const colorMapping = converToColorMapping(thresholdMapping);

  const attributes = predicateTypes.map((predicate) => ({
    value: `${
      predicate === "Government-fundedSmallBusinessGrantOrLoanschemes"
        ? "GovernmentFundedSmallBusinessGrantOrLoanschemes"
        : predicate
    }Accessor`,
    label: `Selected: ${predicate} apply percentage`,
  }));

  return (
    <div>
      <div className="map">
        <div className="title">
          What is the trading and initialtive application status in different
          areas?
        </div>
        <div
          className="drop-down"
          style={{ width: "50%", marginLeft: "auto", textAlign: "center" }}
        >
          <ReactDropdown
            options={attributes}
            value={selected}
            onChange={({ value }) => setSelected(value)}
          />
        </div>
        <svg width={displayWidth} height={displayHeight}>
          <g className="map-mark" transform={`scale(${scale})`}>
            <g transform={`translate(0, ${22})`}>
              <ColorLegend colorMapping={colorMapping} drawWidth={drawWidth} />
            </g>
            <MapMarks
              areas={areas}
              countryAreaData={countryAreaData}
              countryNameAccessor={countryNameAccessor}
              drawHeight={drawHeight}
              drawWidth={drawWidth}
              thresholdMapping={thresholdMapping}
              accesors={accesors}
              selected={selected}
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

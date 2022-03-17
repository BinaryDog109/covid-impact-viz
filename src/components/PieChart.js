import { pie, arc, csv } from "d3";
import { useEffect, useState } from "react";
import "react-dropdown/style.css";

export const PieChart = ({
  selected,
  diagramSpace,
  drawWidth,
  colorMapping,
}) => {
  const industryGroupTradingStatusCsvUrl =
    "./sparql/Industry groups response and trading status.csv";
  const ontURI =
    "http://www.semanticweb.org/tianyiyuan/ontologies/comp6214/coursework1#";

  const pieRadius = diagramSpace.right / 3;
  const arcGenerator = arc().innerRadius(0).outerRadius(pieRadius);
  const [data, setData] = useState(null);
  useEffect(() => {
    const row = (record) => {
      record.industryGroup = record.industryGroup.replace(ontURI, "");
      record.temPause = +record.temPause;
      record.continue = +record.continue;
      return record;
    };
    csv(industryGroupTradingStatusCsvUrl, row).then((data) => {
      data.ontURI = ontURI;
      setData(data);
    });
  }, []);
  const continuePercentageAccessor = (record) => record.continue;
  const temPausePercentageAccessor = (record) => record.temPause;

  if (!data)
    return (
      <g
        transform={`translate(${drawWidth + pieRadius + 5}, ${pieRadius * 3})`}
      >
        <text>Loading...</text>
      </g>
    );
  const colorValueArray = data.reduce((acc, record) => {
    const continuePercentage = continuePercentageAccessor(record);
    const temPausePercentage = temPausePercentageAccessor(record);
    const permantStopPercentage = 1 - continuePercentage - temPausePercentage;
    const values = [
      continuePercentage,
      temPausePercentage,
      permantStopPercentage,
    ];
    const colors = colorMapping.range();
    acc.push({ values, colors });
    return acc;
  }, []);
  console.log(colorValueArray);

  const arcsData = pie()(colorValueArray[selected].values);
  return arcsData.map((arc, index) => {
    const pathString = arcGenerator(arc);
    const percentage = (colorValueArray[selected].values[index] * 100).toFixed(2)
    return (
      <g key={index} className="main-shape"
        transform={`translate(${drawWidth + pieRadius + 5}, ${
          pieRadius * 2.5
        })`}
      >
        <path
          className="piePath"
          fill={colorValueArray[selected].colors[index]}
          d={pathString}
        />
        <text fontSize={`0.7em`} textAnchor="middle" transform={`translate(${arcGenerator.centroid(arc)})`}>
            {`${percentage}%`}
        </text>
      </g>
    );
  });
};

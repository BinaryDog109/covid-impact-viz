import { useState, useEffect } from "react";
import { csv, json } from "d3";
import { feature } from "topojson";

const CountryAreaDataCsvUrl = "./sparql/country-area.csv";
const jsonUrlEngland =
  "https://martinjc.github.io/UK-GeoJSON/json/eng/topo_eer.json";
const jsonUrlWales =
  "https://martinjc.github.io/UK-GeoJSON/json/wal/topo_eer.json";
const jsonScotland =
  "https://martinjc.github.io/UK-GeoJSON/json/sco/topo_eer.json";

const ontURI =
  "http://www.semanticweb.org/tianyiyuan/ontologies/comp6214/coursework1#";

export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const row = (record) => {
      record.CountryArea = record.CountryArea.replace(ontURI, "");
      return record;
    };
    async function fetchData() {
      const countryAreaData = await csv(CountryAreaDataCsvUrl, row);
      countryAreaData.ontURI = ontURI;
      const topology = await json(jsonUrlEngland);
      topology.mapName = "England"
      const walesTopology = await json(jsonUrlWales);
      walesTopology.mapName = "Wales"
      const scotlandTopology = await json(jsonScotland);
      scotlandTopology.mapName = "Scotland"
      // console.log(scotlandTopology);
      const topologies = [topology, walesTopology, scotlandTopology];
      const areas = topologies.map((topology) => {
        const item = feature(topology, topology.objects.eer);
        item.mapName = topology.mapName
        return item
      });

      setData({
        countryAreaData,
        areas,
      });
    }
    fetchData();
  }, []);

  return data;
};

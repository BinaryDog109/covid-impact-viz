import { useState, useEffect } from "react";
import { csv, json } from "d3";
import { feature, mesh } from "topojson";

const CountryAreaDataCsvUrl = "./sparql/country-area.csv";
const jsonUrlEngland =
  "https://martinjc.github.io/UK-GeoJSON/json/eng/topo_eer.json";
const jsonUrlWales =
  "https://martinjc.github.io/UK-GeoJSON/json/wal/topo_eer.json";
const jsonUrlScotland =
  "https://martinjc.github.io/UK-GeoJSON/json/sco/topo_eer.json";
const jsonUrlNorthernIreland =
  "https://martinjc.github.io/UK-GeoJSON/json/ni/topo_wpc.json";

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
      topology.mapName = "England";
      const walesTopology = await json(jsonUrlWales);
      walesTopology.mapName = "Wales";
      const scotlandTopology = await json(jsonUrlScotland);
      scotlandTopology.mapName = "Scotland";
      const northIrelandTopology = await json(jsonUrlNorthernIreland);
      northIrelandTopology.mapName = "NorthernIreland";
      const topologies = [
        topology,
        walesTopology,
        scotlandTopology,
        northIrelandTopology,
      ];
      const areas = topologies.map((topology) => {
        let item;
        if (topology.mapName === "NorthernIreland")
          item = feature(topology, topology.objects.wpc);
        else item = feature(topology, topology.objects.eer);
        item.mapName = topology.mapName;
        return item;
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

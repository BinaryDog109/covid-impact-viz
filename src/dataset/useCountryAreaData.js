import { useState, useEffect } from "react";
import { csv, json } from "d3";
import { feature } from 'topojson';

const CountryAreaDataCsvUrl = "./sparql/country-area.csv";
const jsonUrlEngland = 'https://martinjc.github.io/UK-GeoJSON/json/eng/topo_eer.json'
const jsonUrlWealsh = 'https://martinjc.github.io/UK-GeoJSON/json/wal/topo_eer.json'

const ontURI =
  "http://www.semanticweb.org/tianyiyuan/ontologies/comp6214/coursework1#";

export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const row = record => {
      record.CountryArea = record.CountryArea.replace(ontURI, "")
      return record
    }
    async function fetchData() {
      const countryAreaData = await csv(
        CountryAreaDataCsvUrl, row
      );
      countryAreaData.ontURI = ontURI;
      const topology = await json(jsonUrlEngland)
      const welshTopology = await json(jsonUrlWealsh)
      console.log(welshTopology)
      const { eer } = topology.objects
      const eer2 = welshTopology.objects.eer
      setData({countryAreaData, areas: [feature(topology, eer), feature(welshTopology, eer2)]});
    }
    fetchData();
  }, []);

  return data;
};

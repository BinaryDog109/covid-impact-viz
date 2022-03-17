import { useState, useEffect } from "react";
import { csv } from "d3";

const governmentSchemeDataCsvUrl = "./sparql/government scheme.csv";

const ontURI =
  "http://www.semanticweb.org/tianyiyuan/ontologies/comp6214/coursework1#";

export const useGovernmentSchemeData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const governmentSchemeData = await csv(
        governmentSchemeDataCsvUrl
      );
      governmentSchemeData.ontURI = ontURI;
      setData(governmentSchemeData);
    }
    fetchData();
  }, []);

  return data;
};

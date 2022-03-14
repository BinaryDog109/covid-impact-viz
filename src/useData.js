import { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl = "./sparql/query-result.csv";
const ontURI =
  "http://www.semanticweb.org/tianyiyuan/ontologies/comp6214/coursework1#";

export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    csv(csvUrl).then((data) => {
      data.ontURI = ontURI;
      setData(data);
    });
  }, []);

  return data;
};

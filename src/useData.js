import { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl =
  "./sparql/query-result.csv";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
      csv(csvUrl).then((data) => {
          setData(data)
      })
  }, []);
  return data
};

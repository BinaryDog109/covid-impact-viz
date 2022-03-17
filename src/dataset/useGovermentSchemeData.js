import { useState, useEffect } from "react";
import { csv } from "d3";

import { predicateTypes } from "./predicateTypes";

const governmentSchemeDataCsvUrl = "./sparql/government scheme.csv";

const ontURI =
  "http://www.semanticweb.org/tianyiyuan/ontologies/comp6214/coursework1#";

export const useGovernmentSchemeData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const governmentSchemeData = await csv(
        governmentSchemeDataCsvUrl,
        (row) => {
          row.Industry = row.Industry.replace(ontURI, "");
          row.predicate = row.predicate.replace(ontURI, "");
          return row;
        }
      );
      governmentSchemeData.ontURI = ontURI;
      // The obj stores like this: { InitialtiveName: [{},{},...] }
      const aggregated = predicateTypes.reduce((acc, type) => {
        acc[type] = [];
        return acc;
      }, {});

      // Transform from {idProp:x, typeProp:y, valueProp:z} to {idProp:x, y:z}
      function trans(elem, idProp, typeProp, valueProp) {
        const newElem = {};
        newElem[idProp] = elem[idProp];
        newElem[elem[typeProp]] = elem[valueProp];
        return newElem;
      }
      // merge {idProp:x, a:b} {idProp:x, c:d} into {idProp:x, a:b, c:d} then returns it
      function startMerge(e1, idProp) {
        let saved = e1;
        return function mergeInner(e2) {
          if (saved[idProp] === e2[idProp]) {
            saved = { ...saved, ...e2 };
            return { ...saved, ...e2 };
          } else {
            saved = { ...e2 };
            return { ...e2 };
          }
        };
      }

      for (let i = 0; i < predicateTypes.length; i++) {
        const type = predicateTypes[i];
        const aggregatedObj = aggregated[type];

        // Filter elem of the same predicate type from the csv data
        // Each elem will look like: {Industry: "AccommodationAndFoodServiceActivities", num: "0.206" ,predicate: "apply_AccreditedFinanceagreements_Percentag}
        const filteredArray = governmentSchemeData.filter((elem) =>
          elem.predicate.includes(type)
        );

        // Here I transform elements of the same Industry in the filteredArray to be in the shape of the merge function result
        // So that each elem becomes like this:
        // Industry: "AccommodationAndFoodServiceActivities"
        // apply_BusinessRatesholiday_Percentage: "0.782"
        // intend_BusinessRatesholiday_Percentage: "0.18"
        // receive_BusinessRatesholiday_Percentage: "0.633"

        const categorisedArray = [];
        let merge = null;
        for (let i = 0; i < filteredArray.length; i++) {
          const elem = filteredArray[i];
          if (i === 0) {
            // Initiating the merging process, this returns a merging function
            merge = startMerge(trans(elem), "Industry");
          }

          const newElem = trans(elem, "Industry", "predicate", "num");
          const mergedElem = merge(newElem);
          if (Object.keys(mergedElem).length === 4)
            categorisedArray.push(mergedElem);
        }
        aggregated[type] = categorisedArray;
      }
      // aggregated has 6 elem and each is an array of objects representing industries
      setData(aggregated);
    }
    fetchData();
  }, []);

  return data;
};

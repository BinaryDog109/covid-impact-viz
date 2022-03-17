import { useState, useEffect } from "react";
import { csv } from "d3";

const governmentSchemeDataCsvUrl = "./sparql/government scheme.csv";

const ontURI =
  "http://www.semanticweb.org/tianyiyuan/ontologies/comp6214/coursework1#";
  const predicateTypes = [
    'AccreditedFinanceagreements',
    'BusinessRatesholiday',
    'CoronavirusJobRetentionScheme',
    'DeferringVATpayments',
    'Government-fundedSmallBusinessGrantOrLoanschemes',
    'HMRCTimeToPayscheme'

  ]
  const negativePredicates = {
    apply: 'WeHaveNotAppliedForAnyOfTheseinitiatives',
    receive: 'WehaventReceivedAnyThatWeAppliedfor',
    intend: 'NoneOfTheabove'
  }
export const useGovernmentSchemeData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const governmentSchemeData = await csv(
        governmentSchemeDataCsvUrl, (row)=>{
          row.Industry = row.Industry.replace(ontURI, "")
          row.predicate = row.predicate.replace(ontURI, "")
          return row
        }
      );
      governmentSchemeData.ontURI = ontURI;
      const aggregatedArray = predicateTypes.map(type => ({[type]: []}))
      
      for (let i = 0; i < predicateTypes.length; i++) {
        const type = predicateTypes[i]
        const aggregatedObj = aggregatedArray[i]
        
        // Filter elem of the same predicate type
        const filteredArray = governmentSchemeData.filter(elem => elem.predicate.includes(type))
        const categorisedArray = filteredArray.reduce((acc, elem)=>{
          console.log({acc}, {elem})
          // acc.push(elem)
          return acc
        })

        aggregatedObj[type] = filteredArray
      }
      // In this array each elem looks like this: {Initialtive_Name: [{IndustryA applyIntitialtive value}, {IndustryA applyIntitialtive value} ... ]}
      // console.log(aggregatedArray)
      setData(aggregatedArray);
    }
    fetchData();
  }, []);

  return data;
};

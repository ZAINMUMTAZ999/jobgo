  // /* eslint-disable react-refresh/only-export-components */
  // // import React, { useContext, useState } from "react";
  //   import React, { useContext, useState } from "react";
  // type searchContext = {
    
    

  //   jobTitle: string;
  //   jobLocation: string;
  //   companysIndustry: string;
  //   salary: string;
  //   // sortOption:string;
   
  //   // starRating:string;
   
   
  //   saveSearchValues: (
  //     jobTitle: string,
  //     jobLocation: string,
  //     companysIndustry: string,
  //     salary:string,
  //     // sortOption:string
  //     // starRating: string,

  //   ) => void;
  // };
  // const searchContext = React.createContext<searchContext | undefined>(undefined);
  //   // console.log(React.reac)
  // export const SearchContextProvider = ({
  //   children,
  // }: {  
  //   children: React.ReactNode;
  
  // }) => {
  //   const [jobTitle, setJobTitle] = useState<string>("");
  //   const [jobLocation, setJobLocation] = useState<string>("");
  //   const [companysIndustry, setCompanysIndustry] = useState<string>("");
  //   const [salary, setSalary] = useState<string>("");
  //   // const [sortOption, setsortOption] = useState<string>("");
  //   // const [starRating, setStarRating] = useState<string>("");

  //   const saveSearchValues = (
  //     jobTitle: string,
  //     jobLocation: string,
  //     companysIndustry: string,
  //     salary: string,
  //     // sortOption: string
  //     // starRating: string,
 
  //   ) => {
  //     setJobTitle(jobTitle);
  //     setJobLocation(jobLocation);
  //     setCompanysIndustry(companysIndustry);
  //     setSalary(salary);
  //     // setsortOption(sortOption);
  //     // setStarRating(starRating);
     
  //   };
    
  //   return (
  //     <searchContext.Provider
  //       value={{
  //         jobTitle,
  //         jobLocation,
  //         companysIndustry,
  //         salary,
  //         // sortOption,
  //         // starRating,

  //         saveSearchValues,
  //       }}
  //     >
  //       {children}
  //     </searchContext.Provider>
  //   );
  // };
  // export const useSearchContext = () => {
  //   const context = useContext(searchContext);
  //   return context as searchContext;
  // };
  import React, { useContext, useState } from "react";

  type searchContext = {
    jobTitle: string;
    jobLocation: string;
    companysIndustry: string;
    sortOption: string; // Make sure this matches what you use in components
    saveSearchValues: (
      jobTitle: string,
      jobLocation: string,
      companysIndustry: string,
      sortOption: string, // This parameter name should match what you pass
    ) => void;
  };
  
  const searchContext = React.createContext<searchContext | undefined>(undefined);
  
  export const SearchContextProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [jobTitle, setJobTitle] = useState<string>("");
    const [jobLocation, setJobLocation] = useState<string>("");
    const [companysIndustry, setCompanysIndustry] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("");
  
    const saveSearchValues = (
      jobTitle: string,
      jobLocation: string,
      companysIndustry: string,
      sortOption: string,
    ) => {
      setJobTitle(jobTitle);
      setJobLocation(jobLocation);
      setCompanysIndustry(companysIndustry);
      setSortOption(sortOption);
    };
  
    return (
      <searchContext.Provider
        value={{
          jobTitle,
          jobLocation,
          companysIndustry,
          sortOption,
          saveSearchValues,
        }}
      >
        {children}
      </searchContext.Provider>
    );
  };
  
  export const useSearchContext = () => {
    const context = useContext(searchContext);
    return context as searchContext;
  };
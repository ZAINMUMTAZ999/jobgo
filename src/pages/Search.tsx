
import { searchPage } from "@/Api";
import { useSearchContext } from "@/context/SearchContext";
import { useState } from "react";
import { useQuery } from "react-query";
import Pagination from "@/components/Pagination";
import SearchDataPage from "@/components/SearchDataPage";
import {  JobSkeletons } from "@/components/JobCardSkeleton";
import SearchBar from "@/components/SearchBar";

const Search = () => {
  const [page, setPage] = useState<number>(1);
  const search = useSearchContext();
  
  // Create search parameters object
  const searchParams = {
    jobTitle: search.jobTitle,
    companysIndustry: search.companysIndustry,
    jobLocation: search.jobLocation,
    sortOption: search.sortOption,
    page: page.toString(),
  };
  
  // Use an array query key with all dependencies to ensure proper caching
  const queryKey = ["searchJobs", searchParams.jobTitle, searchParams.companysIndustry, 
                   searchParams.jobLocation, 
                   searchParams.sortOption, 
                   searchParams.page];
                   
  // Configure React Query with strict settings to prevent duplicate fetching
  const { data: searchData, isLoading } = useQuery(
    queryKey,
    () => searchPage(searchParams),
    {
      staleTime: Infinity, // Never consider the data stale
      cacheTime: Infinity, // Keep the data in cache indefinitely
      refetchOnMount: false, // Don't refetch when component mounts again
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnReconnect: false, // Don't refetch when reconnecting
    }
  );
  console.log(searchData)

  if (isLoading) {
    return <p className="flex justify-center text-3xl font-bold tracking-widest">
      <JobSkeletons/>
    </p>;
  }

  return (
    <div className="ml-40">
      <SearchBar />

    
       
      <div className="flex flex-col">
      <div className="text-sm">
    {
          searchData?.pagination.total ===0 ?   <span className="font-bold  flex justify-end mr-96">
          {searchData?.pagination?.total} jobs Found
        </span>:
     
        <span className="font-bold  flex justify-end mr-96">
          {searchData?.pagination?.total} jobs Found
        </span>
    
        }

    </div>
        {searchData?.data?.map((job) => (
          // Always provide a key when mapping components
          <span className="-mt-12">
          
          <SearchDataPage key={job._id} job={job} />
          </span>
        ))}
        
      </div>
      
      <div className="flex flex-row">
        <Pagination
          page={searchData?.pagination?.page || 1}
          pages={searchData?.pagination?.pages || 1}
          onPageChange={(page) => setPage(page)}
          
        />
      </div>
    </div>
  );
};

export default Search;
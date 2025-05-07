import { useSearchContext } from "../context/SearchContext";
import { FormEvent, useEffect, useState } from "react";
import { MapPin, Briefcase, Search, RotateCcw } from "lucide-react";

const industryOptions = [
  'Tech',
  'Healthcare', 
  'Finance',
  'Education',
  'Retail',
  'Marketing',
  'Hospitality',
  'Construction',
  'Entertainment'  
];

const SearchBar = () => {
  const search = useSearchContext();

  const [jobTitle, setJobTitle] = useState(search.jobTitle);
  const [jobLocation, setJobLocation] = useState(search.jobLocation);
  const [companysIndustry, setCompanysIndustry] = useState(search.companysIndustry);
  const [sortOption, setSortOption] = useState(search.sortOption);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (companysIndustry) {
      setIsLoading(true);
      search.saveSearchValues(jobTitle, jobLocation, companysIndustry, sortOption);

      const timer = setTimeout(() => {
        setIsLoading(false);
        // Trigger any necessary updates or actions after search
      }, 1500);

      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companysIndustry]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    search.saveSearchValues(jobTitle, jobLocation, companysIndustry, sortOption);

    setTimeout(() => {
      setIsLoading(false);
      // Trigger any necessary updates or actions after search
      setIsExpanded(false); // collapse after search on mobile
    }, 1500);
  };

  const handleReset = () => {
    setJobTitle('');
    setJobLocation('');
    setCompanysIndustry('');
    setSortOption('');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full px-4 py-4 md:py-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 md:p-6 rounded-lg w-full max-w-6xl mx-auto shadow-md">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Find Jobs</h2>
          <button
            type="button"
            onClick={toggleExpanded}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Simplified Mobile Search (Always Visible) */}
        <div className="md:hidden">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"  
                name="quickSearch"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Job title or keywords..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </button>
          </form>
        </div>

        {/* Full Search Form (Hidden on Mobile unless Expanded) */}
        <div className={`${isExpanded ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Job Title */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-white">
                Job Title
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"  
                  name="jobTitle"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g. Software Engineer"
                />
              </div>
            </div>

            {/* Job Location */}
            <div>
              <label htmlFor="jobLocation" className="block text-sm font-medium text-white">
                Location
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />  
                </div>
                <input  
                  type="text"
                  name="jobLocation" 
                  id="jobLocation"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)} 
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
            </div>

            {/* Industry */}  
            <div>
              <label htmlFor="companysIndustry" className="block text-sm font-medium text-white">
                Industry  
              </label>
              <select
                id="companysIndustry" 
                name="companysIndustry"
                value={companysIndustry}
                onChange={(e) => setCompanysIndustry(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Industries</option>
                {industryOptions.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sortOption" className="block text-sm font-medium text-white">
                Sort by  
              </label>
              <select
                id="sortOption"
                name="sortOption" 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Relevance</option>
                <option value="salary_Desc">Salary: High to Low</option>
                <option value="salary_Asc">Salary: Low to High</option>
              </select>
            </div>

            {/* Search & Reset Buttons - Desktop View */}
            <div className="hidden md:flex md:col-span-4 md:mt-4 justify-end space-x-4">
              <button
                type="button"
                onClick={handleReset}  
                className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2 animate-spin" /> 
                    Searching...
                  </div>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" /> 
                    Search
                  </>
                )}
              </button>
            </div>

            {/* Search & Reset Buttons - Mobile View (Only shown when expanded) */}
            <div className="md:hidden col-span-2 sm:col-span-2 mt-4 flex justify-between space-x-2">
              <button
                type="button"
                onClick={handleReset}  
                className="inline-flex justify-center items-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RotateCcw className="mr-1 h-4 w-4" />
                Reset
              </button>
              <button
                type="submit"
                className="inline-flex justify-center items-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1 animate-spin" /> 
                    <span>Searching...</span>
                  </div>
                ) : (
                  <>
                    <Search className="mr-1 h-4 w-4" /> 
                    <span>Apply Filters</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Filter chips/tags - Optional: Shows what filters are active */}
        {(jobTitle || jobLocation || companysIndustry || sortOption) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {jobTitle && (
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-indigo-800">
                {jobTitle}
                <button
                  type="button"
                  onClick={() => setJobTitle('')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-100 hover:text-indigo-500 focus:outline-none"
                >
                  <span className="sr-only">Remove filter</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </div>
            )}
            {jobLocation && (
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-indigo-800">
                {jobLocation}
                <button
                  type="button"
                  onClick={() => setJobLocation('')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-100 hover:text-indigo-500 focus:outline-none"
                >
                  <span className="sr-only">Remove filter</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </div>
            )}
            {companysIndustry && (
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-indigo-800">
                {companysIndustry}
                <button
                  type="button"
                  onClick={() => setCompanysIndustry('')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-100 hover:text-indigo-500 focus:outline-none"
                >
                  <span className="sr-only">Remove filter</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </div>
            )}
            {sortOption && (
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-indigo-800">
                {sortOption.replace('_', ': ').replace('Desc', 'High-Low').replace('Asc', 'Low-High')}
                <button
                  type="button"
                  onClick={() => setSortOption('')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-100 hover:text-indigo-500 focus:outline-none"
                >
                  <span className="sr-only">Remove sort</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
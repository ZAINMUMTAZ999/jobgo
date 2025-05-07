import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { AllUserFetching } from "@/Api";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import DOMPurify from "dompurify";
// import { AddJobTypes } from "../types/AddjobTypes";
import {AddJobTypes} from "../pages/AddPage";

// Define prop type for the component
type SearchDataPageProps = {
  job: AddJobTypes;
  // job: AddJobTypes[] | AddJobTypes;
};

const SearchDataPage: React.FC<SearchDataPageProps> = ({ job }) => {
  // Ensure job is always an array
  const jobArray = Array.isArray(job) ? job : [job];
  
  // State to track the selected job
  const [selectedJobId, setSelectedJobId] = useState<string | null>(
    jobArray.length > 0 ? jobArray[0]._id : null
  );

  // State for mobile view to toggle between list and details
  const [showDetails, setShowDetails] = useState<boolean>(false);
  
  // Find the currently selected job
  const selectedJob = jobArray.find(j => j._id === selectedJobId) || jobArray[0];
  
  // React Query for user data
  const userQueryKey = ["user", "profile"];
  const { data: userFetchingData, isLoading: userLoading } = useQuery(
    userQueryKey,
    AllUserFetching,
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  // Set first job as selected on initial render
  useEffect(() => {
    if (jobArray.length > 0 && !selectedJobId) {
      setSelectedJobId(jobArray[0]._id);
    }
  }, [jobArray]);

  // Handle job selection
  const handleJobSelect = (id: string) => {
    setSelectedJobId(id);
    // On mobile, automatically show details when a job is selected
    if (window.innerWidth < 1024) {
      setShowDetails(true);
    }
  };

  // Handle back button for mobile view
  const handleBackToList = () => {
    setShowDetails(false);
  };

  // Format date function
  const formatDate = (dateString: Date) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (userLoading) return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="animate-pulse text-lg">Loading user data...</div>
    </div>
  );
  
  if (!userFetchingData) return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="text-lg text-red-600">User data not available</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Job Listings</h1>
      
      <div className="lg:hidden mb-4">
        {/* Mobile Toggle Button */}
        {showDetails && selectedJob && (
          <Button 
            onClick={handleBackToList}
            className="flex items-center gap-2 mb-4 bg-gray-100 text-gray-800 hover:bg-gray-200 w-full justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Job List
          </Button>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Job List */}
        <div className={`w-full lg:w-2/5 space-y-4 overflow-auto max-h-[calc(100vh-12rem)] ${showDetails ? 'hidden lg:block' : 'block'}`}>
          {jobArray.length === 0 ? (
            <div className="bg-white border p-6 rounded-lg text-center">
              <p className="text-gray-500">No job listings available</p>
            </div>
          ) : (
            jobArray.map((j) => (
              <div
                key={j._id}
                onClick={() => handleJobSelect(j._id)}
                className={`bg-white border p-4 rounded-lg cursor-pointer transition-all hover:shadow-md
                  ${selectedJobId === j._id ? "border-l-4 border-blue-600 bg-blue-50" : "border-gray-200"}`}
              >
                <h3 className="font-bold text-lg">{j.jobTitle}</h3>
                <div className="flex flex-wrap justify-between items-center mt-1">
                  <p className="text-gray-700">{j.companyName}</p>
                  <p className="text-sm text-gray-500">Posted: {formatDate(j.date)}</p>
                </div>
                <div className="flex flex-wrap justify-between items-center mt-2">
                  <p className="text-gray-700">{j.companysIndustry}</p>
                  <p className="font-semibold">${j.salary}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side - Job Details */}
        {selectedJob && (
          <div className={`w-full lg:w-3/5 bg-white border border-gray-200 rounded-lg p-4 md:p-6 ${!showDetails && 'hidden lg:block'}`}>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold">{selectedJob.jobTitle}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <p className="font-medium">{selectedJob.companyName}</p>
                <p className="text-gray-700">{selectedJob.jobLocation}</p>
                
                {selectedJob.jobStatus && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {selectedJob.jobStatus}
                  </span>
                )}
                
                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-sm">
                  Posted: {formatDate(selectedJob.date)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <Link to="/userProfile" className="flex items-center gap-3">
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  src={userFetchingData.user.imageFile}
                  alt="User Profile"
                  loading="lazy"
                />
                <div>
                  <span className="font-medium block">{userFetchingData.user.firstName || "User"}</span>
                  <p className="text-gray-500 text-sm">Job Poster</p>
                </div>
              </Link>

              <Link to="/" className="sm:self-center">
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  Apply Now
                </Button>
              </Link>
            </div>

            {selectedJob.imageFile && (
              <div className="mb-6 flex justify-center">
                <div className="overflow-hidden max-w-full rounded-lg shadow-sm">
                  <img
                    src={selectedJob.imageFile}
                    alt={`${selectedJob.jobTitle} visual`}
                    className="max-w-full h-auto object-contain"
                    style={{ maxHeight: "500px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Job Description */}
              {selectedJob.textEditor && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(selectedJob.textEditor),
                    }}
                  />
                </div>
              )}

              {/* Company Description */}
              {selectedJob.companyDescription && 
              (!selectedJob.textEditor || 
                !selectedJob.textEditor.includes(selectedJob.companyDescription)) && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">About the Company</h3>
                  <p className="text-gray-700">{selectedJob.companyDescription}</p>
                </div>
              )}
              
              {/* Additional details section - can be expanded with more job info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-3">Job Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Salary</p>
                    <p className="font-medium">${selectedJob.salary}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Industry</p>
                    <p className="font-medium">{selectedJob.companysIndustry}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Location</p>
                    <p className="font-medium">{selectedJob.jobLocation}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Status</p>
                    <p className="font-medium">{selectedJob.jobStatus || "Active"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div> 
  );
};

export default SearchDataPage;
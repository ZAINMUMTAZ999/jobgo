
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { AllUserFetching } from "@/Api";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import DOMPurify from "dompurify";
import { AddJobTypes } from "../pages/AddPage";
import { JobSkeletons } from "./JobCardSkeleton";

// Define prop type for the component
type SearchDataPageProps = {
  job: AddJobTypes[] | AddJobTypes;
}

const SearchDataPage: React.FC<SearchDataPageProps> = ({ job }) => {
  // Ensure job is always an array
  const jobArray = Array.isArray(job) ? job : [job];
  
  // State to track the selected job
  const [selectedJobId, setSelectedJobId] = useState<string | null>(
    jobArray.length > 0 ? jobArray[0]._id : null
  );

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobArray]);

  // Format date function
  const formatDate = (dateString: string | Date | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (userLoading) return   <JobSkeletons/>;
  if (!userFetchingData) return <div className="flex justify-center p-4">User data not available</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      
      
   
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Job List */}
        <div className="w-full lg:w-2/5 space-y-4 overflow-auto max-h-[calc(100vh-12rem)]">
          {jobArray.map((j) => (
            <div
              key={j._id}
              onClick={() => setSelectedJobId(j._id)}
              className={`bg-white border p-4 rounded-lg cursor-pointer transition-all hover:shadow-md
                ${selectedJobId === j._id ? "border-l-4 border-blue-600 bg-blue-50" : "border-gray-200"}`}
            >
              <h3 className="font-bold text-lg">{j.jobTitle}</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-gray-700">{j.companyName}</p>
                {/* Display formatted date */}
                <p className="text-sm text-gray-500">Posted: {formatDate(j.date)}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-700">{j.companysIndustry}</p>
                <p className="font-semibold">${j.salary}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Job Details */}
        {selectedJob && (
          <div className="w-full lg:w-3/5 bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{selectedJob.jobTitle}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <p className="font-medium">{selectedJob.companyName}</p>
                <p className="font-medium">{selectedJob.jobLocation}</p>
                
                {selectedJob.jobStatus && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {selectedJob.jobStatus}
                  </span>
                )}
                
                {/* Display date in the header section too */}
                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-sm">
                  Posted: {formatDate(selectedJob.date)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <Link to="/userProfile" className="flex items-center gap-3">
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  src={userFetchingData.user.imageFile}
                  alt="User Profile"
                />
                <div>
                  <span className="font-medium block">{userFetchingData.user.firstName || "User Name"}</span>
                  <p className="text-gray-500 text-sm">Job Poster</p>
                </div>
              </Link>

              <Link to="/">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Apply Now
                </Button>
              </Link>
            </div>

            {selectedJob.imageFile && (
              <div className="mb-6 flex justify-center">
                <div className="overflow-hidden max-w-full">
                  <img
                    src={selectedJob.imageFile}
                    alt="Job"
                    className="max-w-full h-auto object-contain"
                    style={{ maxHeight: "500px" }}
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
            </div>
          </div>
        )}
      </div>
    </div> 
  );
};

export default SearchDataPage;
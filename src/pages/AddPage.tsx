
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Controller, useForm } from "react-hook-form";
import TextEditor from "@/components/TextEditor";
import { AddJobApi } from "../Api";
import { AppContext } from "../context/AppNotify";
import step1img from "../assets/postJob.jpg";
import step2img from "../assets/postJob2.jpg";
import step3img from "../assets/postJob3.webp";
import { useNavigate } from "react-router-dom";
// import { AddJobTypes } from "../../../backend/src/models/addJob.models";
import { Button } from "@/components/ui/button";
export type AddJobTypes = {
  dashboard: never[];
  _id: string;
  userId: string;
  companyName: string;
  imageFile: string; 
  ownerName: string;
  companyOwnerNumber: number;
  ownerEmail: string;
  companysIndustry: string;
  companyDescription: string;
  jobTitle: string;
  file: File;
  numberofPeopleHiring: number;
  jobLocation: string;
  jobType: string;
  salary: number;
  postalCode: number;
 
  jobStatus: "Interview" | "Pending" | "Declined" | string;
  starRating: string[];
  imageUrl: string[];
  role: string;
  textEditor: string;
  companyFind: string;
  date: Date;
};
const companyFindOptions = [
  "NewsPaper",
  "Mobile",
  "Social Networks",
  "Advertisement",
  "College",
];
const jobStatus = ["Interview", "Pending", "Declined"];
const jobType = ["full-time", "part-time", "internship"];

// Skeleton UI Component
const SkeletonUI = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 animate-pulse">
      {/* Skeleton Image */}
      <div className="flex justify-center">
        <div className="w-full max-w-md h-64 bg-gray-300 rounded-lg"></div>
      </div>
      
      {/* Skeleton Form Fields - Step 1 */}
      <div className="grid gap-4 mt-6 md:grid-cols-2">
        <div className="flex flex-col">
          <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex flex-col">
          <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      
      <div className="grid gap-4 mt-4">
        <div className="flex flex-col">
          <div className="h-5 w-20 bg-gray-300 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex flex-col">
          <div className="h-5 w-48 bg-gray-300 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex flex-col">
          <div className="h-5 w-56 bg-gray-300 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex flex-col">
          <div className="h-5 w-24 bg-gray-300 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex flex-col">
          <div className="h-5 w-28 bg-gray-300 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex flex-col">
          <div className="h-5 w-28 bg-gray-300 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <div className="h-10 w-20 bg-gray-300 rounded"></div>
        <div className="h-10 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

const AddPage = () => {
  const { showToast } = AppContext();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    control,
  } = useForm<AddJobTypes>({
    defaultValues: {
      // Set default date to today
      date: new Date()
    }
  });
  
  const { mutate: submitJob, isLoading: isSubmitting } = useMutation(AddJobApi, {
    onSuccess: () => {
      showToast({ type: "SUCCESS", message: "Job Added!" });
      navigate("/search");
    },
    onError: (error: Error) =>
      showToast({ type: "ERROR", message: error?.message }),
  });

  // Simulate loading state (in a real app, this would depend on data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate 2 second loading time
    
    return () => clearTimeout(timer);
  }, []);

  const handleNextStep = async () => {
    const isValid = await trigger();
    if (isValid) setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };
  
  const onSubmit = (data: AddJobTypes) => {
    const formData = new FormData();
    // Append other fields
    formData.append("companyName", data.companyName);
    formData.append("jobTitle", data.jobTitle);
    formData.append("ownerEmail", data.ownerEmail);
    formData.append("numberofPeopleHiring", String(data.numberofPeopleHiring));
    formData.append("companyFind", data.companyFind);
    formData.append("jobType", data.jobType);
    formData.append("jobStatus", data.jobStatus);
    // formData.append("jobStatus", data.jobStatus);
    formData.append("postalCode", String(data.postalCode));
    formData.append("salary", String(data.salary));
    formData.append("companyOwnerNumber", String(data.companyOwnerNumber));
    formData.append("companyDescription", data.companyDescription);
    formData.append("jobLocation", data.jobLocation);
    formData.append("Rating", data.starRating.toString());
    formData.append("ownerName", data.ownerName);
    formData.append("companysIndustry", data.companysIndustry);
    formData.append("textEditor", data.textEditor);
    
    // Add the date field - convert to ISO string for consistent format
    if (data.date) {
      formData.append("date", new Date(data.date).toISOString());
    }

    formData.append("imageFile", data.imageFile[0]);
    // Append imageFile
    console.log("dataformdata", data.imageFile);
    
    submitJob(formData);
  };

  // Show skeleton UI when loading
  if (isLoading) {
    return <SkeletonUI />;
  }

  // Image loader component to reuse for both steps
  const ImageWithLoader = ({ src, alt }: { src: string, alt: string }) => (
    <div className="relative w-full max-w-md h-64">
      <div className="image-loading-state absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg transition-opacity duration-300">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading image...</p>
        </div>
      </div>
      <img
        src={src}
        alt={alt}
        className="w-full h-full rounded-lg object-cover"
        style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
        onLoad={(e) => {
          // Hide the loading state when image loads
          const target = e.target as HTMLImageElement;
          const parent = target.parentElement;
          if (parent) {
            const loadingEl = parent.querySelector('.image-loading-state');
            if (loadingEl) {
              loadingEl.classList.add('opacity-0');
              setTimeout(() => {
                loadingEl.classList.add('hidden');
              }, 300);
            }
          }
          // Show the image when it loads
          target.style.opacity = '1';
        }}
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto p-4"
    >
      {step === 1 && (
        <>
          <div className="flex justify-center">
            {isSubmitting ? (
              <div className="text-black font-bold text-3xl flex items-center justify-center h-64 w-full max-w-md bg-gray-100 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2">Loading...</p>
                </div>
              </div>
            ) : (
              <ImageWithLoader src={step1img} alt="Step 1" />
            )}
          </div>
          <div className="grid gap-4 mt-6 md:grid-cols-2">
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">Company Name:</span>
              <input
                type="text"
                {...register("companyName", {
                  required: "Company Name is required",
                })}
                className="border rounded-md p-2"
                placeholder="Your company name"
              />
              {errors.companyName && (
                <span className="text-red-500">
                  {errors.companyName.message}
                </span>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">Job Title:</span>
              <input
                type="text"
                {...register("jobTitle", { required: "Job Title is required" })}
                className="border rounded-md p-2"
                placeholder="e.g. Frontend Developer"
              />
              {errors.jobTitle && (
                <span className="text-red-500">{errors.jobTitle.message}</span>
              )}
            </label>
          </div>
          <div className="grid gap-4 mt-4">
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">Email:</span>
              <input
                type="email"
                {...register("ownerEmail", { required: "Email is required" })}
                className="border rounded-md p-2"
                placeholder="example@gmail.com"
              />
              {errors.ownerEmail && (
                <span className="text-red-500">
                  {errors.ownerEmail.message}
                </span>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">
                Number of People Hiring:
              </span>
              <input
                type="number"
                {...register("numberofPeopleHiring", {
                  required: "This field is required",
                })}
                className="border rounded-md p-2"
                placeholder="Enter number"
              />
              {errors.numberofPeopleHiring && (
                <span className="text-red-500">
                  {errors.numberofPeopleHiring.message}
                </span>
              )}
            </label>
          </div>
          <div className="mt-4">
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">
                Where did you hear about us:
              </span>
              <select
                {...register("companyFind", {
                  required: "This field is required",
                })}
                className="border rounded-md p-2"
              >
                <option value="">Select an option</option>
                {companyFindOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.companyFind && (
                <span className="text-red-500">
                  {errors.companyFind.message}
                </span>
              )}
            </label>
          </div>
          <div className="mt-4">
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">JobType:</span>
              <select
                {...register("jobType", {
                  required: "JobType field is required",
                })}
                className="border rounded-md p-2"
              >
                <option value="">Select an option</option>
                {jobType.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.jobType && (
                <span className="text-red-500">{errors.jobType?.message}</span>
              )}
            </label>
          </div>
          <div className="mt-4">
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">Job Rating:</span>
              <select
               className="border rounded-md p-2"
                {...register("starRating", {
                  required: "This field is required",
                })}
              >
                <option value="">select starRating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>{rating} Rating</option>
                ))}
              </select>
              {errors.starRating && (
                <span className="text-red-500">{errors.starRating.message}</span>
              )}
            </label>
          </div>
          <div className="mt-4">
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">JobStatus:</span>
              <select
                {...register("jobStatus", {
                  required: "JobStatus field is required",
                })}
                className="border rounded-md p-2"
              >
                <option value="">Select an option</option>
                {jobStatus.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.jobStatus && (
                <span className="text-red-500">
                  {errors.jobStatus.message}
                </span>
              )}
            </label>
          </div>

          <div className="mt-6 flex justify-between">
            <Button type="button" disabled className="bg-gray-400 text-white">
              Back
            </Button>
            <Button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-500 text-white hover:bg-red-500"
            >
              Next
            </Button>
          </div>
        </>
      )}
      
      {step === 2 && (
        <>
          <div className="flex justify-center">
            {isSubmitting ? (
              <div className="text-black font-bold text-3xl flex items-center justify-center h-64 w-full max-w-md bg-gray-100 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2">Loading...</p>
                </div>
              </div>
            ) : (
              <ImageWithLoader src={step2img} alt="Step 2" />
            )}
          </div>
          <div className="grid gap-4 mt-6 md:grid-cols-2">
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">PostalCode:</span>
              <input
                type="number"
                {...register("postalCode", {
                  required: "postalCode is required",
                })}
                className="border rounded-md p-2"
                placeholder="e.g 123"
              />
              {errors.postalCode && (
                <span className="text-red-500">
                  {errors.postalCode?.message}
                </span>
              )}
            </label>
            {/* image */}
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">
                Select Cover Image:
              </span>
              <input
                type="file"
                accept="image/*"
                {...register("imageFile", { required: "image is required" })}
                className="border rounded-md p-2"
              />
              {errors.imageFile && (
                <span className="text-red-500">
                  {errors.imageFile?.message}
                </span>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">Salary:</span>
              <input
                type="number"
                {...register("salary", { required: "Salary is required" })}
                className="border rounded-md p-2"
                placeholder="$"
              />
              {errors.salary && (
                <span className="text-red-500">{errors.salary?.message}</span>
              )}
            </label>
          </div>
          <div className="grid gap-4 mt-4">
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">
                OwnerPhoneNumber:
              </span>
              <input
                type="number"
                {...register("companyOwnerNumber", {
                  required: "companyOwnerNumber is required",
                })}
                className="border rounded-md p-2"
                placeholder="+923xxxxxxxxx"
              />
              {errors.companyOwnerNumber && (
                <span className="text-red-500">
                  {errors.companyOwnerNumber?.message}
                </span>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">Description:</span>
              <textarea
                rows={6}
                aria-placeholder="describe about your job"
                {...register("companyDescription", {
                  required: "This field is required",
                })}
                className="w-full p-4 border border-gray-300 rounded-md"
                placeholder="Enter job description"
              />
              {errors.companyDescription && (
                <span className="text-red-500">
                  {errors.companyDescription?.message}
                </span>
              )}
            </label>
          </div>
          <div className="mt-6 flex justify-between">
            <Button
              type="button"
              className="bg-blue-500 text-white"
              onClick={handlePreviousStep}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-500 text-white  hover:bg-red-500"
            >
              Next
            </Button>
          </div>
        </>
      )}
      
      {step === 3 && (
        <>
          <div className="flex justify-center">
            {isSubmitting ? (
              <div className="text-black font-bold text-3xl flex items-center justify-center h-64 w-full max-w-md bg-gray-100 rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2">Loading...</p>
                </div>
              </div>
            ) : (
              <ImageWithLoader src={step3img} alt="Step 3" />
            )}
          </div>
          {/* //Rating */}
          <div></div>
          <div className="grid gap-4 mt-6 md:grid-cols-2">
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">Location:</span>
              <input
                type="text"
                {...register("jobLocation", {
                  required: "locationOfJob is required",
                })}
                className="border rounded-md p-2"
                placeholder="city/country"
              />
              {errors.jobLocation && (
                <span className="text-red-500">
                  {errors.jobLocation?.message}
                </span>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">Owner Name:</span>
              <input
                type="text"
                {...register("ownerName", {
                  required: "OwnerName is required",
                })}
                className="border rounded-md p-2"
                placeholder="e.g Charles"
              />
              {errors.ownerName && (
                <span className="text-red-500">
                  {errors.ownerName?.message}
                </span>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">Industry:</span>
              <input
                type="text"
                {...register("companysIndustry", {
                  required: "Industry field is required",
                })}
                className="border rounded-md p-2"
                placeholder="tech/transpot/education ..."
              />
              {errors.companysIndustry && (
                <span className="text-red-500">
                  {errors.companysIndustry?.message}
                </span>
              )}
            </label>
            {/* Date field added here */}
            <label className="flex flex-col">
              <span className="text-gray-700 font-semibold">Posting Date:</span>
              <input
                type="date"
                {...register("date")}
                className="border rounded-md p-2"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
              {errors.date && (
                <span className="text-red-500">
                  {errors.date?.message}
                </span>
              )}
            </label>
          </div>

          <div className="mt-6 flex justify-between">
            <Button
              type="button"
              className="bg-blue-500 text-white"
              onClick={handlePreviousStep}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleNextStep}
              className="bg-blue-500 text-white hover:bg-red-500 "
            >
              Next
            </Button>
          </div>
        </>
      )}
      
      {step === 4 && (
        <div className="bg-slate-300 rounded-3xl p-6">
          <h2 className="text-2xl font-extrabold text-center underline">
            Editor of Job Post
          </h2>
          <div className="mt-6">
            <Controller
              name="textEditor"
              control={control}
              defaultValue=""
              rules={{ required: "This Field is required" }}
              render={({ field, fieldState }) => (
                <>
                  <TextEditor value={field.value} onChange={field.onChange} />
                  {fieldState.error && (
                    <span className="text-red-500">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="mt-6 flex justify-center">
            {isSubmitting ? (
              <Button type="button" disabled className="bg-gray-400 text-white">
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading...
                </div>
              </Button>
            ) : (
              <Button type="submit" className="bg-green-500 text-white px-10 hover:bg-red-500">
                Submit
              </Button>
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default AddPage;
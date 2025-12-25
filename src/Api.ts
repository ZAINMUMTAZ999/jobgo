import { registerUserTypes } from "./pages/Register";
import { AddJobTypes } from "./pages/AddPage";
// import axios from "axios";

// const Base_Url_API = "https://fascinating-hamster-38f55b.netlify.app/api";
const Base_Url_API = "https://694d7752f2ba815e43e8216c--newbakkedknekdena.netlify.app/api";
// const Base_Url_API = "http://localhost:8000/api";
type loginUserTypes = {
  email: string;
  password: string;
};
export type jobSearchResponse = {
  data: AddJobTypes[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
const registerApi = async (formDatajson: registerUserTypes) => {
  const response = await fetch(`${Base_Url_API}/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDatajson),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
// http://localhost:8000/api/login
const loginApi = async (formDatajson: loginUserTypes) => {
  const response = await fetch(`${Base_Url_API}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDatajson),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    console.log("login Api 30");
    throw new Error("login Error Api");
  }
  return responseBody;
};
const validateToken = async () => {
  const response = await fetch(`${Base_Url_API}/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("fetch validate-token");
  }
  return await response.json();
};
const LogoutApi = async () => {
  const response = await fetch(`${Base_Url_API}/logout`, {
    credentials: "include",
    method: "POST"
  });
  if (!response.ok) {
    throw new Error("logout api not fetch");
  }
  return response.json();
};

const AddJobApi = async (formData: FormData) => {
  // const formData = new FormData();
  // formData.append("imageFile", file);

  const response = await fetch(`${Base_Url_API}/addJob`, {
    method: "POST",
    credentials: "include",
    // headers:{
    //   "Content-Type": "multipart/form-data",
    // },
    body: formData, // Automatically sets the Content-Type
  });

  if (!response.ok) {
    throw new Error("JobApi not fetched");
  }

  console.log("apiJobPostResponse", response);
  return await response.json();
};
const deleteJobApi = async (jobId: string) => {
  const response = await fetch(`${Base_Url_API}/jobDelete/${jobId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
    // No body needed for simple deletion by ID
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete job");
  }

  return await response.json();
};


const AllUserFetching = async () => {

// try {
//   const resp = await axios.get(`${Base_Url_API}/userInfo`,{
//     withCredentials:true,
//     headers:{
//       Accept:"application/json"
//     }
    
//   }
// );
// const data= resp.data;
// return data;
// } catch (error) {
//   console.log(error);
//   if(axios.isAxiosError(error)){
//     throw new Error("userInfo not found!")
//   } throw error
  
// }
  const response = await fetch(`${Base_Url_API}/userInfo`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("JobApi not fetched");
  }

  const data = await response.json();
  return data || { user: null };
};
const JobFetching = async (): Promise<jobSearchResponse> => {
  const response = await fetch(`${Base_Url_API}/jobs`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("JobApi not fetched");
  }

  const data = await response.json();
  return data || { user: null };
};

const dashboardApi = async (): Promise<AddJobTypes> => {
  const response = await fetch(`${Base_Url_API}/dashboard`, {
    credentials: "include",
    

  });

  if (!response.ok) {
    throw new Error("JobApi not fetched");
  }

  const data = await response.json();
  return data || { user: null };
};

const updateMyProfileById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${Base_Url_API}/UpdateUser`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

type searchParams = {
  jobTitle?: string;
  companysIndustry?: string;
  jobLocation?: string;

  starRating?: string[];
  salary?: string;
  sortOption?: string;
  page?: string;
};
const searchPage = async (
  searchParams: searchParams
): Promise<jobSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("jobTitle", searchParams.jobTitle || "");
  queryParams.append("jobLocation", searchParams.jobLocation || "");
  queryParams.append("companysIndustry", searchParams.companysIndustry || "");
  // queryParams.append("starRating",searchParams.starRating  || "");
  // queryParams.append("salary", searchParams.salary || "");
  // queryParams.append("salary", searchParams.salary || "");
queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.starRating?.forEach((star) =>
    queryParams.append("starRating", star)
  );

  queryParams.append("page", searchParams.page || "");
  try {
    const repsonse = await fetch(`${Base_Url_API}/search?${queryParams}`);
    if (!repsonse.ok) {
      throw new Error("Something Went Wrong!");
    }
    return repsonse.json();
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong!");
  }
};
console.log(searchPage);

export {
  registerApi,
  loginApi,
  validateToken,
  LogoutApi,
  AddJobApi,
  deleteJobApi,
  JobFetching,
  AllUserFetching,
  updateMyProfileById,
  dashboardApi,
  searchPage,
};


// import { AllUserFetching, updateMyProfileById } from '../Api';
// import { Button } from '../components/ui/button';    
// import { AppContext } from '../context/AppNotify';
// import { useMutation, useQuery } from 'react-query';
// import { useState, useEffect, useRef } from 'react';

// const UserProfile = () => {
//   const { showToast } = AppContext();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Fetch user profile data
//   const { data: userProfileData, isLoading: userProfileLoading, refetch } = useQuery("userProfile", AllUserFetching);
  
//   // Set up mutation for profile updates
//   const { mutate: updateProfile, isLoading: updateProfileLoading } = useMutation(updateMyProfileById, {
//     onSuccess: () => {
//       showToast({ message: "Profile Updated Successfully!", type: "SUCCESS" });
//       refetch(); // Refresh user data after successful update
//     },
//     onError: (error) => {
//       console.error('Update error:', error);
//       showToast({ message: "Error Updating Profile", type: "ERROR" });
//     },
//   });

//   // State for form data with proper typing
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: ''
//   });

//   // State for image handling with proper typing
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string>('');

//   // Update form data when API data is loaded
//   useEffect(() => {
//     if (userProfileData?.user) {
//       setFormData({
//         firstName: userProfileData.user.firstName || '',
//         lastName: userProfileData.user.lastName || '',
//         email: userProfileData.user.email || ''
//       });
      
//       // Set initial image preview if available
//       if (userProfileData.user.imageFile) {
//         setImagePreview(userProfileData.user.imageFile);
//       }
//     }
//   }, [userProfileData]);

//   // Handle text input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle image file selection with proper typing
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
      
//       // Create a preview URL
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         // Type check the result before setting state
//         const result = reader.result;
//         if (typeof result === 'string') {
//           setImagePreview(result);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     // Create FormData object for the API call
//     const profileFormData = new FormData();
//     profileFormData.append('firstName', formData.firstName);
//     profileFormData.append('lastName', formData.lastName);
    
//     // Only append image if a new one was selected
//     if (imageFile) {
//       profileFormData.append('imageFile', imageFile);
//     }
    
//     // Call the mutation with the FormData
//     updateProfile(profileFormData);
//   };

//   // Render skeleton loading UI that exactly matches the screenshot
//   const renderExactProfileSkeletonUI = () => {
//     return (
//       <>
//         {/* Blue header section */}
//         <div className="bg-blue-500 py-6 px-8 w-full">
//           <div className="h-7 w-56 bg-blue-400 bg-opacity-50 rounded-md mb-2 animate-pulse"></div>
//           <div className="h-5 w-64 bg-blue-400 bg-opacity-50 rounded-md animate-pulse"></div>
//         </div>

//         <div className="p-8">
//           {/* Profile Image Skeleton */}
//           <div className="flex flex-col items-center mb-8">
//             <div className="relative mb-4">
//               <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden animate-pulse">
//               </div>
              
//               <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
//                 <div className="w-5 h-5 bg-gray-300 rounded-md animate-pulse"></div>
//               </div>
//             </div>
//             <div className="h-4 w-64 bg-gray-200 rounded-md animate-pulse"></div>
//           </div>

//           {/* Form Fields Skeleton */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             {/* Email Field */}
//             <div>
//               <div className="h-5 w-12 bg-gray-200 rounded-md mb-2 animate-pulse"></div>
//               <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
//             </div>
            
//             {/* First Name Field */}
//             <div>
//               <div className="h-5 w-24 bg-gray-200 rounded-md mb-2 animate-pulse"></div>
//               <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
//             </div>

//             {/* Last Name Field */}
//             <div>
//               <div className="h-5 w-24 bg-gray-200 rounded-md mb-2 animate-pulse"></div>
//               <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
//             </div>
//           </div>

//           {/* Save Button Skeleton - positioned at the right side */}
//           <div className="flex justify-end">
//             <div className="h-10 w-32 bg-gray-800 rounded-md animate-pulse"></div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   return (
//     <div className="container ml-48 bg-white rounded-xl shadow-lg overflow-hidden">
//       {userProfileLoading ? (
//         renderExactProfileSkeletonUI()
//       ) : (
//         <>
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6 px-8">
//             <h2 className="text-2xl font-bold text-white">Profile Information</h2>
//             <p className="text-blue-100 mt-1">Update your personal details</p>
//           </div>

//           <form className="p-8" onSubmit={handleSubmit}>
//             <div className="flex flex-col items-center mb-8">
//               <div className="relative mb-4">
//                 <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
//                   {imagePreview ? (
//                     <img 
//                       src={imagePreview} 
//                       alt="Profile" 
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-12 h-12 text-gray-400"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
//                       />
//                     </svg>
//                   )}
//                 </div>
                
//                 <label
//                   htmlFor="imageFile"
//                   className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="w-5 h-5 text-gray-700"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
//                     />
//                   </svg>
//                 </label>
//                 <input
//                   type="file"
//                   id="imageFile"
//                   name="imageFile"
//                   accept="image/*"
//                   ref={fileInputRef}
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </div>
//               <span className="text-sm text-gray-500">Click the icon to change your profile picture</span>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                     </svg>
//                   </div>
//                   <input
//                     className="w-full cursor-not-allowed pl-10 border border-gray-300 bg-gray-50 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
//                     type="email"
//                     id="email"
//                     name="email"
//                     readOnly
//                     value={formData.email}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
//                   First Name
//                 </label>
//                 <input
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Name
//                 </label>
//                 <input
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <Button 
//                 type="submit"
//                 disabled={updateProfileLoading}
//                 className={`${updateProfileLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//               >
//                 {updateProfileLoading ? (
//                   <>
//                     <span className="mr-2">Saving...</span>
//                     <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
//                   </>
//                 ) : 'Save Changes'}
//               </Button>
//             </div>
//           </form>
//         </>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
import { AllUserFetching, updateMyProfileById } from '../Api';
import { Button } from '../components/ui/button';    
import { AppContext } from '../context/AppNotify';
import { useMutation, useQuery } from 'react-query';
import { useState, useEffect, useRef } from 'react';

const UserProfile = () => {
  const { showToast } = AppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user profile data
  const { data: userProfileData, isLoading: userProfileLoading, refetch } = useQuery("userProfile", AllUserFetching);
  
  // Set up mutation for profile updates
  const { mutate: updateProfile, isLoading: updateProfileLoading } = useMutation(updateMyProfileById, {
    onSuccess: () => {
      showToast({ message: "Profile Updated Successfully!", type: "SUCCESS" });
      refetch(); // Refresh user data after successful update
    },
    onError: (error) => {
      console.error('Update error:', error);
      showToast({ message: "Error Updating Profile", type: "ERROR" });
    },
  });

  // State for form data with proper typing
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // State for image handling with proper typing
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Update form data when API data is loaded
  useEffect(() => {
    if (userProfileData?.user) {
      setFormData({
        firstName: userProfileData.user.firstName || '',
        lastName: userProfileData.user.lastName || '',
        email: userProfileData.user.email || ''
      });
      
      // Set initial image preview if available
      if (userProfileData.user.imageFile) {
        setImagePreview(userProfileData.user.imageFile);
      }
    }
  }, [userProfileData]);

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image file selection with proper typing
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        // Type check the result before setting state
        const result = reader.result;
        if (typeof result === 'string') {
          setImagePreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create FormData object for the API call
    const profileFormData = new FormData();
    profileFormData.append('firstName', formData.firstName);
    profileFormData.append('lastName', formData.lastName);
    
    // Only append image if a new one was selected
    if (imageFile) {
      profileFormData.append('imageFile', imageFile);
    }
    
    // Call the mutation with the FormData
    updateProfile(profileFormData);
  };

  // Render skeleton loading UI that exactly matches the screenshot
  const renderExactProfileSkeletonUI = () => {
    return (
      <>
        {/* Blue header section */}
        <div className="bg-blue-500 py-6 px-8 w-full">
          <div className="h-7 w-56 bg-blue-400 bg-opacity-50 rounded-md mb-2 animate-pulse"></div>
          <div className="h-5 w-64 bg-blue-400 bg-opacity-50 rounded-md animate-pulse"></div>
        </div>

        <div className="p-8">
          {/* Profile Image Skeleton */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden animate-pulse">
              </div>
              
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
                <div className="w-5 h-5 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
            </div>
            <div className="h-4 w-64 bg-gray-200 rounded-md animate-pulse"></div>
          </div>

          {/* Form Fields Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Email Field */}
            <div>
              <div className="h-5 w-12 bg-gray-200 rounded-md mb-2 animate-pulse"></div>
              <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            
            {/* First Name Field */}
            <div>
              <div className="h-5 w-24 bg-gray-200 rounded-md mb-2 animate-pulse"></div>
              <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
            </div>

            {/* Last Name Field */}
            <div>
              <div className="h-5 w-24 bg-gray-200 rounded-md mb-2 animate-pulse"></div>
              <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Save Button Skeleton - positioned at the right side */}
          <div className="flex justify-end">
            <div className="h-10 w-32 bg-gray-800 rounded-md animate-pulse"></div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex justify-center items-start w-full min-h-screen pt-6 pb-12 px-4 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {userProfileLoading ? (
          renderExactProfileSkeletonUI()
        ) : (
          <>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6 px-8">
              <h2 className="text-2xl font-bold text-white">Profile Information</h2>
              <p className="text-blue-100 mt-1">Update your personal details</p>
            </div>

            <form className="p-8" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12 text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    )}
                  </div>
                  
                  <label
                    htmlFor="imageFile"
                    className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                      />
                    </svg>
                  </label>
                  <input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                <span className="text-sm text-gray-500">Click the icon to change your profile picture</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      className="w-full cursor-not-allowed pl-10 border border-gray-300 bg-gray-50 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none"
                      type="email"
                      id="email"
                      name="email"
                      readOnly
                      value={formData.email}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit"
                  disabled={updateProfileLoading}
                  className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors ${updateProfileLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {updateProfileLoading ? (
                    <div className="flex items-center">
                      <span className="mr-2">Saving...</span>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    </div>
                  ) : 'Save Changes'}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
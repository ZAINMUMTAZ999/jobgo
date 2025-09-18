import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from 'react-query';
import { View, EyeOff } from "lucide-react";
import { loginApi } from '../Api';

type loginUserTypes = {
    email: string;
    password: string;
};
import { AppContext } from "../context/AppNotify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export type loginTypes = {
    email: string,
    password: string
}
const Login = () => {


    const [passwordType, setPasswordType] = useState("password");
    const [PasswordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!PasswordVisible);
        setPasswordType(PasswordVisible ? "text" : "password")
    }
    const navigate = useNavigate();
    const { showToast } = AppContext();
    const queryclient = useQueryClient();


    const { register, handleSubmit, formState: { errors } } = useForm<loginUserTypes>();

    const { mutate: apiMutate, isLoading } = useMutation(loginApi, {
        onSuccess: async () => {
            showToast({ message: "Logged user Succesfully", type: "SUCCESS" })
            await queryclient.invalidateQueries("validateToken")
            navigate("/search")
        }
        ,
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    });
    const onSubmit = handleSubmit((da) => {
        apiMutate(da)
    })
    return (
        
        <form className="flex flex-col bg-slate-400 rounded-lg w-full mt-12 md:w-1/2 h-auto p-4 mx-auto" onSubmit={onSubmit}>
            <h2 className="flex justify-center text-2xl font-bold">Sign in</h2>
            <div className="flex flex-col gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email:
                    <input type="email"
                    defaultValue="mzainmumtaz99@gmail.com"
                        className="border rounded w-full py-1 px-2 font-normal" {...register("email", { required: "Email is required" })} />
                    {
                        errors.email && (<span className="text-sm text-red-300">{errors.email.message}</span>)
                    }
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Password:
                    <input type={passwordType}
                    defaultValue="password"

                        className="border rounded w-full py-1 px-2 font-normal" {...register("password", {
                            minLength: {
                                value: 6,
                                message: "password must be 6 characters"
                            },
                            required:"Password is required"
                        
                        })} />
                    <span onClick={togglePasswordVisibility} className="absolute -m-8 mt-1 hover:cursor-pointer"
                    >
                        {PasswordVisible ? <View /> : <EyeOff />}

                    </span>
                    {
                        errors.password && (<span className="text-sm text-red-300">{errors.password.message}</span>)
                    }
                </label>
                <span className="flex ">
                    <Link to="/register" className="underline font-semibold tracking-tighter hover:text-lg">Register your acccount? </Link>
                </span>
            </div>
        
           
   
            <div className="flex justify-center mt-2">
                {isLoading?
                <button
                className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                <svg
                  className="w-5 h-5 mr-2 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Loading...
              </button>
              
                :
                <button className="bg-green-700 hover:bg-blue-500 text-white  py-1 px-2 rounded" type="submit">Submit</button>
                }
            </div>
   


           
        </form>
    )
}

export { Login }
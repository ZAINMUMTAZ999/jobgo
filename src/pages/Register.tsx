// import React from 'react'
import { useForm } from "react-hook-form";
// import { registerUserTypes } from "../../backend/src/models/register.models";
// import { registerUserTypes } from "../../../backend/src/models/register.models"
export type registerUserTypes = {
  user: any;

  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  imageFile:string,
  
  lastName: string
}
// import { RegisterUserTypes } from '../../../backend/src/models/registeUser.models';
// import { Link } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';
import { registerApi } from '../Api';
import { AppContext } from "../context/AppNotify";
import { Link, useNavigate } from "react-router-dom";

// import { useContextNotify } from '../context/AppNotify';

const Register = () => {
  const { showToast } = AppContext();
  const navigate=useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<registerUserTypes>();
  const queryclient = useQueryClient();
  const apiMutate = useMutation(registerApi, {
    onSuccess: async () => {
      showToast({ type: "SUCCESS", message: "Succesfsfuy Registered" })
      await queryclient.invalidateQueries("validateToken")
      // console.log("registered succesfully")
      navigate("/login")
    }
    ,
    onError: (error: Error) => {
      showToast({ type: "ERROR", message: error.message })
      // console.log(error.message)

    }
  });
  const onSubmit = handleSubmit((data) => {
    apiMutate.mutate(data);
  })
  return (

    <form className="flex flex-col bg-slate-400 rounded-lg mt-12 w-full md:w-1/2 h-auto p-4 mx-auto" onSubmit={onSubmit}>
      <h2 className="flex justify-center text-2xl font-bold">Register Your Account</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          FirstName:
          <input className="border rounded w-full py-1 px-2 font-normal" {...register("firstName", { required: "firstName is required" })} />
          {
            errors.firstName && (<span className="text-sm text-red-300">{errors.firstName.message}</span>)
          }
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          LastName:
          <input className="border rounded w-full py-1 px-2 font-normal" {...register("lastName", { required: "lastName is required" })} />
          {
            errors.lastName && (<span className="text-sm text-red-300">{errors.lastName.message}</span>)
          }
        </label>
      </div>
      {/* ///// */}
      <div className="flex flex-col gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email:
          <input type="email" className="border rounded w-full py-1 px-2 font-normal" {...register("email", { required: "Email is required" })} />
          {
            errors.email && (<span className="text-sm text-red-300">{errors.email.message}</span>)
          }
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password:
          <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("password", {
            minLength: {
              value: 6,
              message: "password must be 6 characters"
            }
          })} />
          {
            errors.password && (<span className="text-sm text-red-300">{errors.password?.message}</span>)
          }
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          ConfirmPassword:
          <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Password is required"
              }
              else if (watch("password") !== val) {
                return "Password not macthed"

              }
            }
          })} />
          {
            errors.confirmPassword && (<span className="text-sm text-red-300">{errors.confirmPassword?.message}</span>)
          }
        </label>
      </div>
      <span className="flex ">
                    <Link to="/login" className="underline font-semibold tracking-tighter hover:text-lg">Login your acccount</Link>
                </span>
      <div className="flex justify-center mt-2">
        <button className="bg-green-700 hover:bg-blue-500 text-white  py-1 px-2 rounded" type="submit">Submit</button>
      </div>
    </form>
  )
}

export { Register }
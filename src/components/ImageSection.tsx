import { useForm } from "react-hook-form";
import { AddJobTypes } from "../pages/AddPage";
import { useState } from "react";
// import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const [image, setImage] = useState<string>();
    const {
        register,
        formState: { errors },

    } = useForm<AddJobTypes>();

    // const handleFileUpload = async (event) => {
    //     const file = event.target.files[0]; // Get the selected file
    //     if (!file) {
    //         console.error("No file selected!");
    //         return;
    //     }


        return (
            <div>
                <h2 className="text-2xl font-bold mb-3">Images</h2>
                <div className="border rounded p-4 flex flex-col gap-4">

                    <input
                        type="file"

                        accept="image/*"
                        className="w-full text-gray-700 font-normal"
                        {...register("imageFile", {
                            validate: (imageFiles) => {
                                const totalLength =
                                    imageFiles.length;

                                if (totalLength === 0) {
                                    return "At least one image should be added";
                                }

                                if (totalLength > 1) {
                                    return "Total number of images cannot be more than 1";
                                }

                                return true;
                            },
                        })}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setImage(file ? URL.createObjectURL(file) : undefined)

                        }}
                    />
                  
                       {
                        image  && (
                            <img src={image}/>
                        )
                       }
                   
                </div>
                {errors.imageFile && (
                    <span className="text-red-500 text-sm font-bold">
                        {errors.imageFile.message}
                    </span>
                )}
            </div>
        );
    
}

export default ImagesSection;
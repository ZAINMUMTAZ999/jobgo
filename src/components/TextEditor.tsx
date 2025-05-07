// import 'froala-editor/css/froala_editor.pkgd.min.css';
// import 'froala-editor/css/froala_style.min.css';
// import 'froala-editor/js/plugins.pkgd.min.js';
// // import 'froala-editor/js/froala_editor.pkgd.min.js';
// import FroalaEditor from "react-froala-wysiwyg";
// import { useState,useEffect, SetStateAction, forwardRef } from 'react';
// import { configureHeader, configuretext } from '@/config/froalaConfigs';
// import { useForm } from 'react-hook-form';
// import { AddJobTypes } from '../../../backend/src/models/addJob.models';
// const blocks = ["heading","text"];

// const TextEditor = () => {
//   const { register, handleSubmit, formState: { errors }, } = useForm<AddJobTypes>();
//   const [model, setModel] = useState("");
//   const [model2, setModel2] = useState("");
//   console.log("model",model)
//   console.log("model2",model2)
 
//   // const [model2, setModel2] = useState(() => localStorage.getItem("htmlSaved") || "");
// useEffect(()=>{
//  return localStorage.setItem("modelStrage",model+ model2)
// },[model,model2]);
// const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
//   setModel(event?.target?.value);
// };
// const storedValue = ()=>{
//    localStorage.getItem("modelStrage" )
// }
//   return (
//     <div className=' container'>
//     {
//       blocks.map((block)=>{
//         console.log(block)
//       switch (block) {
//         case "heading":
//           return (  <FroalaEditor
//             tag="textarea"
            
//             model={model}
          
//             onModelChange={setModel}
//             //  tag="textarea"
//             config={configureHeader}
    
    
//           />)
//         case "text":
//           return (  <FroalaEditor
//             tag="textarea"
//             model={model2}
            
//             onModelChange={setModel2}
            
//             config={configuretext}
            
    
    
//           />)
          
          
      
//         default:
//           return null;
//       }
//       })
//     }

    
//       {/* <FroalaEditorView model={model} /> */}

//     </div>
//   )
// }

// export default TextEditor
type CustomInputProps = {
  value: string;
  onChange: (value: string) => void;
};

import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
// import 'froala-editor/js/froala_editor.pkgd.min.js';
import FroalaEditor from "react-froala-wysiwyg";
import { useState,useEffect } from 'react';
import { configuretext } from '@/config/froalaConfigs';
// import { useForm } from 'react-hook-form';
// import { AddJobTypes } from '../../../backend/src/models/addJob.models';
// import { configureHeader, configuretext } from '@/config/froalaConfigs';
// const blocks = ["heading","text"];

const TextEditor = ({onChange}:CustomInputProps) => {
  // const { formState: { errors }, } = useForm<AddJobTypes>();
  const [model, setModel] = useState("");
  const [model2] = useState("");
  console.log("model",model)
  console.log("model2",model2)
 
  // const [model2, setModel2] = useState(() => localStorage.getItem("htmlSaved") || "");
// useEffect(()=>{
//  return localStorage.setItem("modelStrage",model+ model2)
// },[model,model2]);
// useEffect(() => {
//   console.log("Current Value:", value);
// }, [value]);
useEffect(() => {
  onChange(model); // Updates the form state with the `model` value
}, [model, onChange]);

// const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
//   setModel(event?.target?.value);
// };
// const storedValue = ()=>{
//    localStorage.getItem("modelStrage" )
// }
//   const handleModelChange = (html: string) => {
//   // Remove all HTML tags using regex
//   const plainText = html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes anything between < and >
//   onChange(plainText);
// };

  return (
    <div className='container mx-8 min-h-[700px]'>
   {/* {
      blocks.map((block)=>{
        console.log(block)
      switch (block) {
        case "heading":
          return (  <FroalaEditor
            tag="textarea"
            
            model={model}
          
            onModelChange={setModel}
            //  tag="textarea"
            config={configureHeader}
    
    
          />)
        case "text":
          return (  <FroalaEditor
            tag="textarea"
            model={model2}
            
            onModelChange={setModel2}
            
            config={configuretext}
            
    
    
          />)
          
          
      
        default:
          return null;
      }
      })
    }  */}
    
    <FroalaEditor
            tag="textarea"
            model={model}
            
            onModelChange={setModel}
            
            config={configuretext
              
            }
            
    
    
          />
    
    
    </div>
  )
}

export default TextEditor
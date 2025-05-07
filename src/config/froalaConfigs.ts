// import { AppContext } from "@/context/AppNotify";
// import { FroalaOptions } from "froala-editor";

// export const configureHeader: Partial<FroalaOptions> = {

//     toolbarInline: true,
//     initOnClick: true,
//     toolbarVisibleWithoutSelection: true,

//     placeholderText: "Job Title(e.g full stack developer)",

//     // toolbarInline:true,
//     toolbarButtons: [
//       "bold",
//       "italic",
//       "underline",
//       "fontFamily",
//       "clearFormatting",
//       "fontSize",
//       "textColor",
//     ]
//     ,
//     fontSize: ['8', '9', '10', '11', '12', '14', '18', '24', '30', '36', '48', '60', '72', '96'],

//     //     charCounterCount: true,    // Enable the character counter
//         charCounterMax: 50,      // Optionally, set a maximum character limit
//     //     heightMin: 300,
//     //     heightMax: 500,
//     //     saveInterval:2000,
//     events: {
//       // 'initialized': function() {
//       //   console.log('The editor has initialized');
//       // },
//       'contentChanged': function () {
//         console.log('Content within the editor has changed');
//       },

//       "charCounter.exceeded":function(){
//         alert("excedded limit")
//         // showToast({message:"Limit excedded",type:})
//       },
//       // "save.before":function(html:string){
//       //   localStorage.setItem("htmlSaved",html)

//       // }
//       // }
//     }
//   }
// export const configuretext: Partial<FroalaOptions> = {
//      toolbarButtons: [
//       'bold', 'italic', 'underline',
//       'formatOL', 'formatUL',
//       'insertLink',
//      'undo', 'redo'
//     ],

//     toolbarInline: false,
//     initOnClick: true,
//     // toolbarVisibleWithoutSelection: true,

//     placeholderText: "write here all the description and responsiblites etc of the job",

//     //     charCounterCount: true,    // Enable the character counter
//         charCounterMax: 300,      // Optionally, set a maximum character limit
//     //     heightMin: 300,
//     //     heightMax: 500,
//     //     saveInterval:2000,
//     events: {
//       // 'initialized': function() {
//       //   console.log('The editor has initialized');
//       // },

//       "charCounter.exceeded":function(){
//         alert("excedded limit")
//       },
//       // "save.before":function(html:string){
//       //   localStorage.setItem("htmlSaved",html)

//       // }
//       // }
//     }
//   }

import { FroalaOptions } from "froala-editor";

// export const configureHeader: Partial<FroalaOptions> = {
//   toolbarInline: true,
//   initOnClick: true,
//   toolbarVisibleWithoutSelection: true,

//   placeholderText: "Job Title(e.g full stack developer)",

//   // toolbarInline:true,
//   toolbarButtons: [
//     "bold",
//     "italic",
//     "underline",
//     "fontFamily",
//     "clearFormatting",
//     "fontSize",
//     "textColor",
//   ],
//   fontSize: [
//     "8",
//     "9",
//     "10",
//     "11",
//     "12",
//     "14",
//     "18",
//     "24",
//     "30",
//     "36",
//     "48",
//     "60",
//     "72",
//     "96",
//   ],

//   //     charCounterCount: true,    // Enable the character counter
//   charCounterMax: 50, // Optionally, set a maximum character limit
//   //     heightMin: 300,
//   //     heightMax: 500,
//   //     saveInterval:2000,
//   // toolbarInline: false,
//   //     initOnClick: true,
//   events: {
//     // 'initialized': function() {
//     //   console.log('The editor has initialized');
//     // },
//     contentChanged: function () {
//       console.log("Content within the editor has changed");
//     },

//     "charCounter.exceeded": function () {
//       alert("excedded limit");
//       // showToast({message:"Limit excedded",type:})
//     },
//     // "save.before":function(html:string){
//     //   localStorage.setItem("htmlSaved",html)

//     // }
//     // }
//   },
// };
export const configuretext: Partial<FroalaOptions> = {
    toolbarInline: true,
  initOnClick: true,
  toolbarVisibleWithoutSelection: true,
  // toolbarInline: true,
  // initOnClick: true,
  // toolbarVisibleWithoutSelection: true,

  // placeholderText: "Job Title(e.g full stack developer)",

  // toolbarInline:true,

  //     charCounterCount: true,    // Enable the character counter
  charCounterMax: 500, // Optionally, set a maximum character limit
  //     heightMin: 300,
  //     heightMax: 500,
  //     saveInterval:2000,
  // toolbarButtons: [], // Remove all toolbar buttons
    htmlAllowedTags: [], // Disallow all HTML tags
    htmlAllowedAttrs: [], // Disallow all HTML attributes

    // placeholderText: "Start typing plain text...",
  fontSize: [
    "8",
    "9",
    "10",
    "11",
    "12",
    "14",
    "18",
    "24",
    "30",
    "36",
    "48",
    "60",
    "72",
    "96",
  ],
  toolbarButtons: [
    "bold",
    "italic",
    "underline",
    "fontFamily",
    "clearFormatting",
    "fontSize",
    "textColor",
    "formatOL",
    "formatUL",
    // "insertLink",
    // "undo",
    // "redo",
  ],
  

  // toolbarInline: false,
  // initOnClick: true,
  // toolbarVisibleWithoutSelection: true,

  placeholderText: "write and edit here all the description and responsiblites etc of the job",

  //     charCounterCount: true,    // Enable the character counter
  // charCounterMax: 300,      // Optionally, set a maximum character limit
  //     heightMin: 300,
  //     heightMax: 500,
  //     saveInterval:2000,
  events: {
    // 'initialized': function() {
    //   console.log('The editor has initialized');
    // },

    "charCounter.exceeded": function () {
      alert("excedded limit");
    },
    // "save.before":function(html:string){
    //   localStorage.setItem("htmlSaved",html)

    // }
    // }
  },
};

// export  const configuretext:Partial<FroalaOptions> = {

//     toolbarButtons: [
//       'bold', 'italic', 'underline',
//       'formatOL', 'formatUL',
//       'insertLink',
//      'undo', 'redo'
//     ],

//     placeholderText: 'Start typing here...',

//   };

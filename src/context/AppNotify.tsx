import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import {  useQuery } from "react-query";
import { validateToken } from "../Api";
type toastMessage = {
    type: "SUCCESS" | "ERROR",
    message: string
};
type AppNotify = {
    showToast: (toastMessage: toastMessage) => void;
    isLogged:boolean
};
const AppNotify = React.createContext<AppNotify | undefined>(undefined);
export const AppNotifyProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast,setToast]=useState<toastMessage | undefined >(undefined);
    const {isError}=useQuery("validateToken",validateToken,{
        retry:false
    })
    return (
        <AppNotify.Provider value={{
            showToast: (m) => setToast(m),
            isLogged:!isError
        }}>
            {toast && <Toast message={toast.message} type={toast.type} onClose={()=>setToast(undefined)}/>}
            {children}
        </AppNotify.Provider>
    )
};

export const AppContext = () => {
    const context = useContext(AppNotify);
    return context as AppNotify
}
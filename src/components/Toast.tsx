import  { useEffect } from 'react'
type ToastProps = {
    type: "SUCCESS" | "ERROR",
    message: string,
    onClose: () => void
}
const Toast = ({ message, type, onClose }: ToastProps) => {
    // const styles = type === "SUCCESS" ? "bg-green-600 text-sm" : "bg-green-600 text-sm"
     useEffect(() => {
        const timer =    setTimeout(() => {
            onClose()
        }, 2000)
        return () =>     clearTimeout(timer)
        

    },[onClose]);
    const styles = type === "SUCCESS" ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";
    return (
        <div className={styles}>
           <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
        </div>
    )
}

export default Toast
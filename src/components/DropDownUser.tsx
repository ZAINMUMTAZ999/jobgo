import { AllUserFetching } from "../Api";
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
  } from "@/components/ui/dropdown-menu";
import { BsCaretDownFill } from "react-icons/bs";

import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
// import user from "../../src/assets/user.png"

const DropDownUser = () => {

    const { data: userFetchigData } = useQuery("users", AllUserFetching);


    // console.log(userFetchigData?.user?.imageFile  "no")
    // const [userDetail, setUserDetail] = useState({
    //     email: "",
    //     firstName: "",
    //     lastName: ""
    // })
    // useEffect(() => {
    //     if (userFetchigData?.user) {
    //         setUserDetail(
    //             {
    //                 email: userFetchigData?.user?.email,
    //                 firstName: userFetchigData?.user?.firstName,
    //                 lastName: userFetchigData?.user?.lastName
    //             }
    //         )
    //     }
    // }, [userFetchigData]);

    return (
        <DropdownMenu>
            {/* <DropdownMenuTrigger>{userDetail?.email || ""}</DropdownMenuTrigger> */}
            <DropdownMenuTrigger className="flex items-center    focus:outline-none  ">
                <div>

                    <img className="w-10 h-10 rounded-full object-cover mr-2" src={userFetchigData?.user?.imageFile || ''}
                    />
                <BsCaretDownFill size={12} className=" flex ml-3" />
                {/* {userFetchigData?.user?.firstName} */}
                </div>

                {/* <img src={userFetchigData?.user?.imageFile}/> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel >
                    
                     {userFetchigData?.user?.email }
                    
                    </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <Link to="/userProfile" className="hover:cursor-pointer flex flex-1 justify-center bg-slate-100 p-1 hover:bg-slate-300" >
                        Profile

                    </Link>
                </DropdownMenuItem>
            

                <DropdownMenuItem><Logout /></DropdownMenuItem>
                {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
                {/* <DropdownMenuItem>Subscription</DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>

    )
};
export default DropDownUser;
import MainLayout from "../../layouts/main-layout";
import JobsTable from "./jobs-table";
import { IconButton } from "@mui/material";
import { DashboardTopBar } from "../../layouts/dashboard-top-bar";
import React, {useEffect, useState} from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { getAxiosRequestWithAuthorizationHeader } from "../../../utils/api-requests/axios-requests";
import { AxiosError } from "axios";
import { JobsInterface } from "../../../utils/constants";



const JobsComponent = () :JSX.Element =>{
    const [jobs, setJobs] = useState<JobsInterface[]>([]);
    return(
        <React.Fragment>
            <div className="lg:hidden w-full flex justify-center bg-white text-black">
                <div className="w-11/12 flex flex-col">
                    <div className="w-full">
                        <DashboardTopBar pageTitle="Hi Oluwadamilola" showControls={true}/>
                    </div>
                    <div className="w-full flex flex-col gap-2 my-8">
                        <p className="text-3xl text-black font-bold">My&nbsp;Jobs</p>
                        <form>
                            <div className="w-full bg-white border border-[#6157A0] rounded-md flex my-2 justify-between">
                                <div className="w-4/5 relative z-0">
                                    <input type="text" 
                                    className="p-3 rounded-md bg-white w-full text-sm text-black"
                                    placeholder="Search"/>
                                    
                                    {/* <div className="w-full bg-white rounded-md h-80 absolute border border-[#6157A0]">

                                    </div> */}
                                </div>
                                <div className="flex flex-row gap-1">
                                    <IconButton sx={{padding : 0}}>
                                        <KeyboardArrowDownRoundedIcon/>
                                    </IconButton>
                                    <input type="submit"
                                    value={"Submit"}
                                    className="bg-[#6157A0] text-white text-sm py-2 px-3 outline-none rounded"/>
                               </div>
                            </div>
                        </form>
                    </div>
                    <JobsTable/>
                </div>
               
            </div>
            <div className="hidden lg:flex">
                <MainLayout>
                    <div className="w-11/12">
                        <div className="w-full flex justify-between my-8">
                            <p className="text-3xl text-black font-bold ">My&nbsp;Jobs</p>
                            <form>
                                <div className="bg-white border border-[#6157A0] rounded-md">
                                    <input type="text" className="p-2 rounded-md bg-white text-sm text-black"
                                    placeholder="Search"/>
                                    <IconButton sx={{padding : 0}}>
                                        <KeyboardArrowDownRoundedIcon/>
                                    </IconButton>
                                    <input type="submit"
                                    value={"Submit"}
                                    className="bg-[#6157A0] text-white text-sm py-2 px-3 outline-none rounded"/>
                                </div>
                            </form>
                        </div>
                        <JobsTable/>
                    </div>
                </MainLayout>
            </div>  
        </React.Fragment> 
    );
}

export default JobsComponent;
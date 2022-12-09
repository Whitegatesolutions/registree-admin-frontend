import MainLayout from "../../layouts/main-layout";
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import JobsTable from "./jobs-table";
import { Box, Container, Grid, IconButton } from "@mui/material";
import { DashboardTopBar } from "../../layouts/dashboard-top-bar";
import React from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const JobsComponent = () :JSX.Element =>{

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
                            <div className="w-full bg-white border border-[#6157A0] rounded-md flex justify-between">
                                <input type="text" className="p-3 rounded-md bg-white text-sm text-black"
                                placeholder="Search"/>
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
                            <p className="text-3xl text-black font-bold">My&nbsp;Jobs</p>
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
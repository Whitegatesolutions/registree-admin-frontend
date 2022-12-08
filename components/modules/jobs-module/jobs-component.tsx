import MainLayout from "../../layouts/main-layout";
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import JobsTable from "./jobs-table";
import { Box, Container, Grid } from "@mui/material";
import { DashboardTopBar } from "../../layouts/dashboard-top-bar";
import React from 'react';

const JobsComponent = () :JSX.Element =>{

    return(
        <React.Fragment>
            <div className="lg:hidden w-full flex justify-center">
                <div className="w-11/12 flex flex-col">
                    <div className="w-full">
                        <DashboardTopBar pageTitle="Hi Oluwadamilola" showControls={true}/>
                    </div>
                    <div className="w-full flex justify-between my-8">
                        <p className="text-3xl text-black font-bold">My&nbsp;Jobs</p>
                    </div>
                    <JobsTable/>
                </div>
               
            </div>
            <div className="hidden lg:flex">
                <MainLayout>
                    <div className="w-11/12">
                        <div className="w-full flex justify-between my-8">
                            <p className="text-3xl text-black font-bold">My&nbsp;Jobs</p>
                        </div>
                        <JobsTable/>
                    </div>
                </MainLayout>
            </div>  
        </React.Fragment> 
    );
}

export default JobsComponent;
import MainLayout from "../../layouts/main-layout";
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import UserManagementTable from './user-management-table';
import { Box, Container } from "@mui/material";
import { DashboardTopBar } from "../../layouts/dashboard-top-bar";
import React, {useState} from 'react';
import JobsTable from "../jobs-module/jobs-table";
import { AddUserDialog } from "./add-user-dialog";

const UserManagement = () :JSX.Element =>{
    const [openDialog, setDialog] = useState<boolean>(false);

    return(
        <React.Fragment>
            <div className="lg:hidden w-full flex justify-center bg-white text-black">
                <div className="w-11/12 flex flex-col">
                    <div className="w-full">
                        <DashboardTopBar pageTitle="Hi Oluwadamilola" showControls={true}/>
                    </div>
                    <div className="w-full flex flex-col gap-2 my-4">
                        <p className="text-3xl text-black font-bold">User&nbsp;Management</p>
                        <button 
                        onClick={() => setDialog(true)}
                        className="w-full text-center gap-1 text-sm font-semibold text-white my-2 py-3 px-4 rounded-md bg-[#6157A0]">
                            {/* <ControlPointRoundedIcon sx={{fontSize : '18px'}}/> */}
                            Add&nbsp;User
                        </button>
                    </div>
                    <UserManagementTable open={openDialog} close={() => setDialog(false)}/> 
                </div>
            </div>
            <div className="hidden lg:flex">
                <MainLayout>
                    <div className="w-11/12">
                        <div className="w-full flex justify-between my-4">
                            <p className="text-xl md:text-2xl lg:text-3xl text-black font-bold">User&nbsp;Management</p>
                            <button
                                onClick={() => setDialog(true)}
                                className="flex justify-center items-center gap-1 text-xs font-semibold text-white py-2 px-4 rounded-md bg-[#6157A0]">
                                <ControlPointRoundedIcon sx={{fontSize : '18px'}}/>
                                Add&nbsp;User
                            </button>
                        </div>
                        <UserManagementTable open={openDialog} close={() => setDialog(false)}/>
                    </div>
                </MainLayout>
            </div>  
            
        </React.Fragment>
    );
}

export default UserManagement;

import MainLayout from "../../layouts/main-layout";
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import JobsTable from "./jobs-table";

const JobsComponent = () :JSX.Element =>{

    return(
        <MainLayout>
           <div className="w-11/12">
                <div className="w-full flex justify-between my-8">
                    <p className="text-3xl text-black font-bold">My&nbsp;Jobs</p>
                    {/* <button className="flex justify-center items-center gap-1 text-xs font-semibold text-white py-2 px-4 rounded-md bg-[#6157A0]">
                        <ControlPointRoundedIcon sx={{fontSize : '18px'}}/>
                        Add&nbsp;User
                    </button> */}
                </div>

                {/* jobs table */}
                <JobsTable/>
                
           </div>
        </MainLayout>
    );
}

export default JobsComponent;
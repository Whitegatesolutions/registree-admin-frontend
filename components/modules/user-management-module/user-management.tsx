import MainLayout from "../../layouts/main-layout";
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import UserManagementTable from './user-management-table';

const UserManagement = () :JSX.Element =>{

    return(
        <MainLayout>
           <div className="w-11/12">
                <div className="w-full flex justify-between my-4">
                    <p className="text-xl md:text-2xl lg:text-3xl text-black font-bold">User Management</p>
                    <button className="flex justify-center items-center gap-1 text-xs font-semibold text-white py-2 px-4 rounded-md bg-[#6157A0]">
                        <ControlPointRoundedIcon sx={{fontSize : '18px'}}/>
                        Add&nbsp;User
                    </button>
                </div>

                {/* users table */}
                <UserManagementTable/>
           </div>
        </MainLayout>
    );
}

export default UserManagement;
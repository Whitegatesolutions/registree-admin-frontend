import React, {FC,Fragment} from "react";
import { SidebarElementValuesObject } from "../../utils/constants copy";
import { SideBarNavigation } from "./sidebar";
import { DashboardTopBar } from "./dashboard-top-bar";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import { getAxiosRequestWithAuthorizationHeader } from "../../utils/api-requests/axios-requests";
import { useQuery } from "@tanstack/react-query";

type Props = {
    children ?: JSX.Element
};
export const UserSideNavigationValues : SidebarElementValuesObject = {
    firstName : 'Oluwadamilola',
    lastName : 'Adeyemi',
    image : '/static-img.png',
    body : [
        {
            
            icon : <CurrencyExchangeOutlinedIcon sx={{fontSize : '18px'}}/>,
            link : '/transactions',
            title : 'Transactions'
        },
        {
            icon : <BusinessOutlinedIcon sx={{fontSize : '18px'}}/>,
            link : '/business-owners',
            title : 'Business Owners'
        },
        {
            icon : <GroupsOutlinedIcon sx={{fontSize : '18px'}}/>,
            link : '/user-management',
            title : 'User Management'
        },
        {
            icon : <SupervisorAccountOutlinedIcon sx={{fontSize : '18px'}}/>,
            link : '/roles-permissions',
            title : 'Roles & Permissions'
        },
        {
            icon : <ContentPasteSearchOutlinedIcon sx={{fontSize : '18px'}}/>,
            link : '/audit-trail',
            title : 'Audit Trail'
        }
    ]
};
export const returnValues = () :SidebarElementValuesObject => {
    return UserSideNavigationValues;
}
//className="w-full flex justify-center lg:justify-start lg:ml-8 md:py-4 md:px-0"
const MainLayout : FC<Props> = ({children}) : JSX.Element => {
    const {data, error} = useQuery(['top-bar-name'], 
    () => getAxiosRequestWithAuthorizationHeader('user/profile/find-user-by-token'));  
    return(
        <Fragment>
            <div className="flex w-full">
                <SideBarNavigation values={returnValues()}/>
                <div className="flex-1 bg-white text-black">
                    <DashboardTopBar pageTitle={data?.data?.data.firstName} showControls={true}/>
                    <div className="w-full flex justify-center lg:justify-start lg:ml-8 md:py-4">
                        {children}
                    </div>
                </div>
            </div>
            
        </Fragment>
    );
}

export default MainLayout;
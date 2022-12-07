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

type Props = {
    children : JSX.Element
};
const UserSideNavigationValues : SidebarElementValuesObject = {
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

const MainLayout : FC<Props> = ({children}) : JSX.Element => {
    return(
        <Fragment>
           <div className="flex">
                <SideBarNavigation values={returnValues()}/>
                <main className="flex-1 bg-white text-black">
                    <DashboardTopBar pageTitle="Hi Oluwadamilola" showControls={true}/>
                    <div className="w-full flex justify-center lg:justify-start lg:ml-8 md:py-4 md:px-0">
                        {children}
                    </div>
                </main>
           </div>
        </Fragment>
    );
}

export default MainLayout;
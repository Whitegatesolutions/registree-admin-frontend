import React, {FC, useState, useEffect, useContext} from 'react';
import Image from 'next/image';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';
import { Constants } from '../../utils/constants';


type Props={
    children : JSX.Element,
};
//https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940

const AuthLayoutComponent :FC<Props> = ({children}) : JSX.Element => {

    //const {theme, setTheme} = useContext(ThemeContext);
    // const [theme, setTheme] = useState<boolean>(false);

    // const toggleTheme = () : void => {
    //     setTheme(!theme);
    // }

    // useEffect(() => {
    //     if(theme){
    //         localStorage.setItem('theme', 'dark');
    //     }
    //     else localStorage.setItem('theme', 'light');
    //     appTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    // },[theme]);

    return(
        <div className="w-full h-auto flex flex-col lg:flex-row-reverse overflow-x-hidden">
            <div className='lg:w-1/2 hidden lg:flex'>
                <div className='h-screen overflow-hidden container'>
                    <div className='w-full h-screen content'>
                        <object data={Constants.COVER_PHOTO} width="100%" height="100%" className='object-cover'/>
                    </div>
                    <div className='overlay bg-[#6157A0] bg-opacity-30'/>
                </div>
            </div>
            <div className='w-full bg-white lg:w-1/2 h-auto lg:max-h-screen lg:overflow-y-auto'>
                {children}
            </div>
        </div>
    );
}

export default AuthLayoutComponent;
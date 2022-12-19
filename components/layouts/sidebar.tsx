import { Avatar } from '@mui/material';
import React, {FC} from 'react';
import { useRouter, NextRouter } from 'next/router';
import { SidebarElementValuesObject } from '../../utils/constants copy';
import { TailwindCssStyles } from '../../utils/tailwindStyles';
import { getAxiosRequestWithAuthorizationHeader } from '../../utils/api-requests/axios-requests';
import { useQuery } from '@tanstack/react-query';


type Props={
    values : SidebarElementValuesObject
}
export const SideBarNavigation :FC<Props> = ({values : {body}}) : JSX.Element => {
    const {data, error} = useQuery(['side-image'], 
    () => getAxiosRequestWithAuthorizationHeader('user/profile/find-user-by-token')); 

    const router : NextRouter = useRouter();

    return(
        <div>
            <div className='hidden lg:flex lg:w-72 bg-[#6157A0] h-full text-white'>
                <div className='fixed lg:flex lg:w-72 h-full bg-[#6157A0]'>
                    <div className="w-full h-auto mt-20">
                        <div className="flex justify-center">
                            <Avatar src={data?.data?.data.profileImageUrl} sx={{
                                width : '110px',
                                height : '110px',
                                // backgroundColor : '#fff'
                            }}/>
                        </div>

                        <div className='text-center my-4 text-lg font-semibold'>
                            <p className='capitalize'>{data?.data?.data.firstName}</p>
                            <p className='capitalize'>{data?.data?.data.lastName}</p>
                        </div>

                        <section className='my-8 w-full flex flex-col'>
                            {body && body.map((data,i) => 
                                <div key={i} 
                                onClick={() => router.push(data.link)}
                                className={
                                    router.pathname.includes(data.link)?
                                    'w-full flex justify-center text-base font-semibold cursor-pointer bg-white text-[#6157A0]'
                                    :'w-full flex justify-center text-white text-base font-semibold cursor-pointer hover:bg-[#F5F5F5] hover:bg-opacity-30'
                                }>
                                    <div className='w-3/5 flex justify-self-start'>
                                        <div className='flex flex-row items-center gap-2 py-2'>
                                            {data.icon}
                                            <p>{data.title}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
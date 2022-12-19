import { Dialog, DialogContent } from "@mui/material";
import { DaysArray, MonthsArray, Years } from "../../../utils/collections";
import React from 'react';

type Props={
    open : boolean,
    close : React.MouseEventHandler<HTMLDivElement>,
    refetch : any
};

export const AddUserDialog:React.FC<Props> = ({open,close, refetch})  : JSX.Element => {

    //use the refetch method to populate the table
    return(
        <React.Fragment>
            {
                open && 
                <div id="backDropLoader" className="z-20" onClick={close}>
                    <div className="w-11/12 md:w-4/5 lg:w-1/2 bg-white modal p-8">
                        <form>
        
                            <div className="flex flex-col gap-1 mb-4">
                                <p className='font-bold'>Name</p>
                                <input type="text" className='py-2.5 text-sm px-4 rounded-md border border-[#CBCBCB]'/>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                                <div className="flex flex-col w-full sm:w-1/2 gap-1">
                                    <p className='font-bold'>Gender</p>
                                    <select name="day" className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                </div>
                                <div className="flex flex-col w-full sm:w-1/2 gap-1">
                                    <p className='font-bold'>Role</p>
                                    <select name="day" className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>
                            </div>
        
                            <div className="w-full flex flex-col sm:flex-row gap-4 items-center mb-4">
                                <div className="flex flex-col w-full sm:w-1/2 gap-1">
                                    <p className='font-bold'>Status</p>
                                    <select name="day" className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
        
                                <div className='flex flex-col w-full sm:w-1/2 gap-1'>
                                    <p className='font-bold'>Date&nbsp;Joined</p>
                                    <div className='basis-full flex flex-row items-center gap-2 text-[#303030]'>
                                        <select name="day" className='w-1/3 border border-[#CBCBCB] py-2 px-3 rounded-md'>
                                        <option value="day">Day</option>
                                        {DaysArray.map((day : number, i:number) => 
                                        <option value={day} key={i}>{day < 10 ? `0${day}` : day}</option>
                                        )}
                                        </select>
                                        <select name="month" className='w-1/3 border border-[#CBCBCB] py-2 px-3 rounded-md'>
                                        <option value="month">Month</option>
                                        {MonthsArray.map((month : string, i:number) => 
                                        <option value={month.substring(0,3)} key={i}>{month}</option>
                                        )}
                                        </select>
                                        <select name="year" className='w-1/3 border border-[#CBCBCB] py-2 px-3 rounded-md'>
                                        <option value="year">Year</option>
                                        {Years.map((year : number, i:number) => 
                                        <option value={year} key={i}>{year}</option>
                                        )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button type={"submit"}
                            className="w-full text-sm font-semibold text-white my-2 py-2 px-4 rounded-md bg-[#6157A0]">
                                Add&nbsp;User
                            </button>
                        </form>
                    </div>
                </div>

            }
       </React.Fragment>
    );
}
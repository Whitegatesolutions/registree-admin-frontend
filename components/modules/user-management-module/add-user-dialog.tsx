import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import { DaysArray, MonthsArray, Years } from "../../../utils/collections";
import React from 'react';
import { postAxiosRequestWithAuthorizationHeader } from "../../../utils/api-requests/axios-requests";
import { AxiosError } from "axios";
import { AxiosRequestInterface } from "../../../utils/constants";

type Props={
    open : boolean,
    handleClose : React.MouseEventHandler<HTMLDivElement | HTMLButtonElement> | any,
    refetch : any
};

export const AddUserDialog:React.FC<Props> = ({open, handleClose ,refetch})  : JSX.Element => {

    const [userWithPrivilege, setNewUserWithPrivilege] = React.useState({
        firstName : '',
        lastName : '',
        email : '',
        role : 'ADMIN',
        gender : 'MALE',
        status : true
    });
    const [disabled, setDisabled] = React.useState({
    disable : false,
    message : '',
    severity : ''
    });

    React.useEffect(() => {},[userWithPrivilege]);

    const firstNameChangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        setNewUserWithPrivilege({...userWithPrivilege, firstName : value});
    }

    const lastNameChangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        setNewUserWithPrivilege({...userWithPrivilege, lastName : value});
    }

    const emailChangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        setNewUserWithPrivilege({...userWithPrivilege, email : value});
    }

    const roleChangeHandler = ({target} : React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = target;
        setNewUserWithPrivilege({...userWithPrivilege, role : value});
        
    }

    const genderChangeHandler = ({target} : React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = target;
        setNewUserWithPrivilege({...userWithPrivilege, gender : value});
    
    }

    const statusChangeHandler = ({target} : React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = target;
        
        value === "false" ? setNewUserWithPrivilege({...userWithPrivilege, status : false})
        : setNewUserWithPrivilege({...userWithPrivilege, status : true})
         
    }

    const OnsubmitHandler = async (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled({...disabled, disable : true});
        const obj : AxiosRequestInterface = {
            uri : 'user/create-user/with-privileges',
            body : userWithPrivilege
        };

        postAxiosRequestWithAuthorizationHeader(obj)
        .then((response) => {

            const {data : {success, code, message}} = response;
            if(code === 200 && success){
                setDisabled({...disabled, disable : false, message, severity : 'success'});
                refetch();

                setTimeout(() => {
                    handleClose(e);
                },1000);
            }
        }).catch((error : AxiosError) => {
            if(error.isAxiosError){
                const {data : {success, message}} : any = error.response;
                setDisabled({...disabled, disable : false, message, severity : 'error'});
                setTimeout(() => {
                    handleClose(e);
                },1000);

            }
        });
    }
    //use the refetch method to populate the table
    return(
        <div className="w-11/12 md:w-4/5 lg:w-1/2 bg-white modal p-8">
            <form onSubmit={OnsubmitHandler}>

                <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                    <div className="flex flex-col w-full sm:w-1/2 gap-1">
                        <p className='font-bold'>First&nbsp;Name</p>
                        <input 
                        type="text" 
                        className='py-2.5 text-sm px-4 bg-white text-black rounded-md border border-[#CBCBCB]'
                        onChange={(e) => firstNameChangeHandler(e)}
                        />
                    </div>

                    <div className="flex flex-col w-full sm:w-1/2 gap-1">
                        <p className='font-bold'>Last&nbsp;Name</p>
                        <input 
                        type="text" 
                        className='py-2.5 text-sm px-4 bg-white text-black rounded-md border border-[#CBCBCB]'
                        onChange={(e) => lastNameChangeHandler(e)}/>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                    <div className="flex flex-col w-full sm:w-1/2 gap-1 bg-white text-black">
                        <p className='font-bold'>Gender</p>
                        <select 
                        name="gender" 
                        className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'
                        onChange={(e) => genderChangeHandler(e)}>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-full sm:w-1/2 gap-1 bg-white text-black">
                        <p className='font-bold'>Role</p>
                        <select 
                        name="role" 
                        className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'
                        onChange={(e) => roleChangeHandler(e)}>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-4 items-center mb-4">

                    <div className="flex flex-col w-full sm:w-1/2 gap-1">
                        <p className='font-bold'>E-mail</p>
                        <input 
                        type="email" 
                        className='py-2.5 text-sm px-4 bg-white text-black rounded-md border border-[#CBCBCB]'
                        onChange={(e) => emailChangeHandler(e)}/>
                    </div>

                    <div className="flex flex-col w-full sm:w-1/2 gap-1 bg-white text-black">
                        <p className='font-bold'>Status</p>
                        <select 
                        name="status" 
                        className='w-full border border-[#CBCBCB] py-2 px-3 rounded-md'
                        onChange={(e) => statusChangeHandler(e)}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    {/* <div className='flex flex-col w-full sm:w-1/2 gap-1'>
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
                    </div> */}
                </div>
                <button type={"submit"}
                disabled={disabled.disable ? true : false}
                className="w-full text-sm font-semibold 
                text-white my-2 py-2 px-4 
                rounded-md bg-[#6157A0]
                disabled:bg-[#EFF0F6] 
                disabled:shadow-none 
                disabled:text-gray-500 disabled:cursor-default">
                    {disabled.disable && <CircularProgress size={'1rem'} sx={{color : 'rgb(203 213 225)', marginRight : '6px'}}/>} 
                    {disabled.disable ? "Please Wait" : "Add User"}
                </button>
            </form>
        </div>
    );
}
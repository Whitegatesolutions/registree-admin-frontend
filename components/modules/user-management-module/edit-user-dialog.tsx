import { CircularProgress, Dialog, DialogContent, IconButton } from "@mui/material";
import { DaysArray, MonthsArray, Years } from "../../../utils/collections";
import React from 'react';
import { multipleFilePostRequest, patchAxiosRequestWithAuthorizationHeader, postAxiosRequestWithAuthorizationHeader } from "../../../utils/api-requests/axios-requests";
import { AxiosError } from "axios";
import { AxiosRequestInterface, EditUserDialogInterface } from "../../../utils/constants";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

type Props={
    handleClose : React.MouseEventHandler<HTMLDivElement | HTMLButtonElement> | any,
    refetch : any,
    user : EditUserDialogInterface
};

export const EditUserDialog:React.FC<Props> = ({ 
    handleClose,
    refetch,
    user
    })  : JSX.Element => {

    const [userWithPrivilege, setNewUserWithPrivilege] = React.useState<EditUserDialogInterface>(user);
    const [file, setNewProfile] = React.useState<File | null>(null);

    const [disabled, setDisabled] = React.useState({
    disable : false,
    message : '',
    severity : ''
    });

    const [boolStates, setBooleanStates] = React.useState({
        rememberMe : false,
        viewPassword : false
    });

    React.useEffect(() => {},[userWithPrivilege]);

    const firstNameChangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        setNewUserWithPrivilege({...userWithPrivilege, firstName : value});
        console.log(value);
    }

    const lastNameChangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        setNewUserWithPrivilege({...userWithPrivilege, lastName : value});
        console.log(value);
    }

    const emailChangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        setNewUserWithPrivilege({...userWithPrivilege, email : value});
    }

    const roleChangeHandler = ({target} : React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = target;
        setNewUserWithPrivilege({...userWithPrivilege, role : value});
        
    }

    const setPasswordOnchangeHandler = ({target} : React.ChangeEvent<HTMLInputElement>) => {
        const {value} = target;
        setNewUserWithPrivilege({...userWithPrivilege, password : value});
    
    }

    const statusChangeHandler = ({target} : React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = target;
        
        value === "false" ? setNewUserWithPrivilege({...userWithPrivilege, status : false})
        : setNewUserWithPrivilege({...userWithPrivilege, status : true});

         
    }

    const profileImageChangeHandler = ({target} : any) =>{
        const file = target.files[0];
        if(file)
        setNewProfile(file);
    }

    const OnsubmitHandler = async (e : React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled({...disabled, disable : true});

        // if(typeof file !== null){
        //     const filesPayload : FormData = new FormData();
        //     filesPayload.append("files[]", file as File);
    
        //     try{
        //         const fileResponse = await multipleFilePostRequest('upload-files', filesPayload);
    
        //         console.log(fileResponse.data);
        //         if(fileResponse.data.status === "SUCCESSFUL"){
        //             const {data} = fileResponse.data;
        //             const obj : AxiosRequestInterface = {
        //             uri : 'user',
        //             body : {
        //                 firstName : userWithPrivilege.firstName,
        //                 lastName : userWithPrivilege.lastName,
        //                 email : userWithPrivilege.email,
        //                 password : userWithPrivilege.password,
        //                 role : userWithPrivilege.role,
        //                 userId : userWithPrivilege.id,
        //                 profileImageUrl : data[0],
        //                 status : userWithPrivilege.status
        //             }};
        
        //             patchAxiosRequestWithAuthorizationHeader(obj)
        //             .then((response) => {
            
        //                 const {data : {success, code, message}} = response;
        //                 if(code === 200 && success){
        //                     setDisabled({...disabled, disable : false, message, severity : 'success'});
        //                     refetch();
            
        //                     setTimeout(() => {
        //                         handleClose(e);
        //                     },1000);
        //                 }
        //             }).catch((error : AxiosError) => {
        //                 if(error.isAxiosError){
        //                     const {data : {success, message}} : any = error.response;
        //                     setDisabled({...disabled, disable : false, message, severity : 'error'});
        //                     setTimeout(() => {
        //                         handleClose(e);
        //                     },1000);
            
        //                 }
        //             });
        //         }
        //     }catch(error){
        //         throw error;
        //     }
        // }else{
            const obj : AxiosRequestInterface = {
                uri : 'user',
                body : {
                    firstName : userWithPrivilege.firstName,
                    lastName : userWithPrivilege.lastName,
                    email : userWithPrivilege.email,
                    password : userWithPrivilege.password,
                    role : userWithPrivilege.role,
                    userId : userWithPrivilege.id,
                    status : userWithPrivilege.status
                }
            };
    
            patchAxiosRequestWithAuthorizationHeader(obj)
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
        //}

    }
    //use the refetch method to populate the table
    return(
        <div className="w-11/12 md:w-4/5 lg:w-1/2 max-h-[37rem] overflow-y-auto bg-white modal p-8">
            <form onSubmit={OnsubmitHandler}>

                <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                    <div className="flex flex-col w-full sm:w-1/2 gap-1">
                        <p className='font-bold'>First&nbsp;Name</p>
                        <input 
                        type="text" 
                        className='py-2.5 text-sm px-4 rounded-md border border-[#CBCBCB]'
                        onChange={(e) => firstNameChangeHandler(e)}
                        defaultValue={userWithPrivilege.firstName}
                        />
                    </div>

                    <div className="flex flex-col w-full sm:w-1/2 gap-1">
                        <p className='font-bold'>Last&nbsp;Name</p>
                        <input 
                        type="text" 
                        className='py-2.5 text-sm px-4 rounded-md border border-[#CBCBCB]'
                        onChange={(e) => lastNameChangeHandler(e)}
                        defaultValue={userWithPrivilege.lastName}/>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                    <div className="flex flex-col w-full sm:w-1/2 gap-1">
                        <p className='capitalize font-bold text-xs text-black'>Password</p>
                        <div  className={"text-black w-full bg-white rounded-md border border-[#CBCBCB] text-sm flex justify-between items-center" }>

                            <input type={boolStates.viewPassword ? "text" :"password"} 
                                className="px-4 py-2.5 rounded-md w-10/12 bg-white"
                                onChange={(e) => setPasswordOnchangeHandler(e)}/>

                            <IconButton onClick={() => setBooleanStates({...boolStates, viewPassword : !boolStates.viewPassword})}>
                                {boolStates.viewPassword ? <VisibilityOffOutlinedIcon sx={{
                                    color : '#000'
                                }}/> : <RemoveRedEyeOutlinedIcon
                                sx={{
                                    color : '#000'
                                }}/>}
                            </IconButton>
                            
                        </div>
                    </div>
                    <div className="flex flex-col w-full sm:w-1/2 gap-1">
                        <p className='font-bold'>Role</p>
                        <select 
                        name="role" 
                        className='w-full border border-[#CBCBCB] py-3 px-3 rounded-md'
                        onChange={(e) => roleChangeHandler(e)}
                        defaultValue={userWithPrivilege.role}>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-4 items-center mb-4">

                    <div className="flex flex-col w-full sm:w-1/2 gap-1">
                        <p className='font-bold'>E-mail</p>
                        <input 
                        type="email" 
                        className='py-2.5 text-sm px-4 rounded-md border border-[#CBCBCB]'
                        onChange={(e) => emailChangeHandler(e)}
                        defaultValue={userWithPrivilege.email}/>
                    </div>

                    <div className="flex flex-col w-full sm:w-1/2 gap-1">
                        <p className='font-bold'>Status</p>
                        <select 
                        name="status" 
                        className='w-full border border-[#CBCBCB] py-3 px-3 rounded-md'
                        onChange={(e) => statusChangeHandler(e)}>
                            <option value="default">{userWithPrivilege.status ? "Active" : "Inactive"}</option>
                            <option value="true">{!userWithPrivilege.status ? "Active" : "Inactive"}</option>
                        </select>
                    </div>
                </div>
{/* 
                <div className="flex flex-col w-full gap-1 mb-4">
                    <p className='font-bold'>Select&nbsp;Image&nbsp;File&nbsp;</p>
                    
                    <input type="file" id="signature" 
                    className=' rounded-md border border-[#CBCBCB] pl-4 py-1 w-full'
                    accept='.jpg,.jpeg,.png,.gif'
                    onChange={(e) => profileImageChangeHandler(e)}
                    />
                </div> */}

                <button type={"submit"}
                disabled={disabled.disable ? true : false}
                className="w-full text-sm font-semibold 
                text-white my-2 py-2 px-4 
                rounded-md bg-[#6157A0]
                disabled:bg-[#EFF0F6] 
                disabled:shadow-none 
                disabled:text-gray-500 disabled:cursor-default">
                    {disabled.disable && <CircularProgress size={'1rem'} sx={{color : 'rgb(203 213 225)', marginRight : '6px'}}/>} 
                    {disabled.disable ? "Please Wait" : "Save Changes"}
                </button>
            </form>
        </div>
    );
}
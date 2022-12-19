import * as React from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteAxiosRequestWithAuthorizationHeader } from '../../../utils/api-requests/axios-requests';
import { AxiosError } from 'axios';

type Props={
    open :boolean,
    handleClose : React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>,
    id : string,
    refetch : any
};

export default function DeleteUserDialog( {open, handleClose, id, refetch} : Props) {
   const [disabled, setDisabled] = React.useState({
    disable : false,
    message : '',
    severity : ''
   });

    //console.log('id', id);

    const handleDeleteUser = async(e : React.MouseEvent<HTMLButtonElement>) => {
        setDisabled({...disabled, disable : true});
        await deleteAxiosRequestWithAuthorizationHeader(`user/${id}`)
        .then((response) => {
            const {data : {code, success, message}} = response;
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
  return (
    <React.Fragment>
    {
        open && 
        <div id="backDropLoader" className="z-20" onClick={handleClose}>
            {/* {disabled.severity === "success" ?
             <Alert severity={"success"}>{disabled.message}</Alert>
             :<Alert severity={"error"}>{disabled.message}</Alert>
            } */}
            <div className="w-fit bg-white modal px-6 py-4">
                <p className='text-black font-bold py-2'>Are you Sure you want to delete this user?</p>

                <div className='flex justify-end gap-4 mt-6'>
                    <button 
                    onClick={handleClose}
                    disabled={disabled.disable ? true : false}
                    className='text-md font-bold p-2 rounded-md capitalize bg-[#6157A0] text-[#fff]
                    disabled:bg-[#EFF0F6] 
                    disabled:shadow-none 
                    disabled:text-gray-500 disabled:cursor-default'>
                        cancel
                    </button>
                    <button 
                    onClick={handleDeleteUser}
                    disabled={disabled.disable ? true : false}
                    className='text-md font-bold p-2 rounded-md capitalize
                    bg-[#6157A0] text-[#fff]
                    disabled:bg-[#EFF0F6] 
                    disabled:shadow-none 
                    disabled:text-gray-500 disabled:cursor-default'>
                        ok
                    </button>
                </div>
            </div>
        
        </div>
    }
    </React.Fragment>
  );
}

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import { JobsInterface } from '../../../utils/constants';
import { FC } from 'react';
import { getAxiosRequestWithAuthorizationHeader } from '../../../utils/api-requests/axios-requests';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ComponentLoader } from '../loader-spinner';
import useWindowFocus from 'use-window-focus';
import axios from 'axios';


const columns = [
  { id: 'jobTagId', label: 'Job ID', width : 'fit-content'},
  { id: 'businessName', label: 'Business Name', width : 200 },
  {
    id: 'jobType',
    label: 'Job Type',
    width : 'fit-content',
    //align: 'right',
    format: (value : any) => value.toLocaleString('en-US'),
  },
  {
    id: 'regDate',
    label: 'Reg Date',
    width : 'fit-content',
    //align: 'right',
    format: (value : any) => value.toLocaleString('en-US'),
  },
  {
    id: 'businessOwner',
    label: 'Business Owner',
    width : 'fit-content',
    //align: 'right',
    format: (value : any) => value.toFixed(2),
  },
  {
    id: 'jobState',
    label: 'Job State',
    width : 'fit-content',
    //align: 'right',
    format: (value : any) => value.toLocaleString('en-US'),
  },
  {
    id: 'action',
    label: '',
    width : 'fit-content',
    align: 'right',
    format: (value : any) => value.toFixed(2),
  }
];

const Action = () :JSX.Element =>{
    return(
        <Tooltip title="download">
          <IconButton sx={{padding : '0.2rem'}}>
            <object data="/download-icon.png" className='w-4 h-4 object-contain'/>
          </IconButton>
        </Tooltip>
    );
} 
const returnColorForJobStatus = (status : string) => {
  switch(status){
    case "QUERIED":
      return 'bg-[#FF2D2D]';
    case "PENDING" : 
      return 'bg-[#2B85F0]';
      case "ONGOING" : 
      return 'bg-[#2B85F0]';
    case "COMPLETED" : 
      return 'bg-[#16C807]';
  }
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: '#FFFAFA',
    },
    '&:nth-of-type(odd)': {
      backgroundColor: '#DFDDEC',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      fontWeight : 600,
      marginBottom : 2,
      fontFamily : 'BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
    },
}));
  
var focus : boolean = false;

export default function JobsTable() {
 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [jobs, setJobs] = React.useState<JobsInterface[]>([]);
  // const [isLoading, setLoader] = React.useState<boolean>(false);
  // const [error, setError] = React.useState({
  //   isError : false,
  //   message : ''
  // });
  //checking if window is focused in other to refresh the data
  const windowFocus : boolean = useWindowFocus();
  focus = windowFocus;

  const handleChangePage = (event : any, newPage : any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event : any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // useEffect(() => {
  //   setLoader(true);
  //   getAxiosRequestWithAuthorizationHeader('job/find/find-open-jobs')
  //   .then((response) => {
  //       const {data:{data, success, code}} = response;
  //       if(code === 200 && success){
  //         setJobs([...data]);
  //         setLoader(false);
  //         setError({...error, message:"", isError : false});
  //       }

  //   }).catch((error) => {
  //     setLoader(false);  
  //     if(error?.AxiosError){
  //       const {data:{message, code, success}} = error;
  //       setError({...error, message, isError : true});
  //     }
  //   });
  // },[focus]);

  const {data, isLoading, isError} = useQuery(['jobs'], 
  () => getAxiosRequestWithAuthorizationHeader('job/find/find-open-jobs'));

  console.log(data?.data?.data);
  if(isError){
    return <p className='text-red-500'>An error has occurred!</p>
  }
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column :any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ 
                    width: column.width, 
                    paddingTop :6, paddingBottom : 6, 
                    border : 'none',
                    fontSize : 13,
                    fontWeight : 700,
                    fontFamily : 'BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
                }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {/* {isLoading && <ComponentLoader/>} */}
            {data && data?.data?.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row :any, i : number) => {
                return (
                      <>
                        <StyledTableRow role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column : any) => {
                            const value = row[column.id];
      
                           if(column.id === "regDate"){
                             return(
                                <StyledTableCell key={column.id} align={column.align}
                                sx={{paddingTop :'10px',
                                paddingBottom : '10px', 
                                border : 'none',
                                textTransform : 'capitalize'}}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : new Date(row.dateCreated).toDateString()}
                                </StyledTableCell>
                              );
                            }
                            if(column.id === "businessOwner"){
                              return(
                                <StyledTableCell key={column.id} align={column.align}
                                sx={{paddingTop :'10px',
                                paddingBottom : '10px', 
                                border : 'none',
                                textTransform : 'capitalize'}}>
                                {/* {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : row?.user.firstName.concat(` ${row?.user.lastName}`)} */}
                                    <p>Business Owner</p>
                                </StyledTableCell>
                              );
                            }
                            
                            if(column.id === "businessName"){
                              return(
                                <StyledTableCell key={column.id} align={column.align}
                                sx={{paddingTop :'10px',
                                paddingBottom : '10px', 
                                border : 'none',
                                textTransform : 'capitalize'}}>
                                  <p>{row?.businessNameRegistration?.firstNameSuggestion}</p>
                                  <p>{row?.businessNameRegistration?.secondNameSuggestion}</p>
                                </StyledTableCell>
                              );
                            }
                            if(column.id === "jobState"){
                              return(
                                <StyledTableCell key={column.id} align={column.align}
                                sx={{paddingTop :'10px',
                                paddingBottom : '10px', 
                                border : 'none',
                                textTransform : 'capitalize'}}>
                                    <div key={column.id} className={`${returnColorForJobStatus(row.processStatus)} w-fit px-3 py-2 text-white text-[10px] font-semibold rounded-2xl`}>
                                        {row.processStatus}
                                    </div>
                                </StyledTableCell>
                              );
                            }
                            if(column.id === "action"){
                              return(
                                <StyledTableCell key={column.id} align={column.align}
                                sx={{paddingTop :'10px',
                                paddingBottom : '10px', 
                                border : 'none',
                                textTransform : 'capitalize'}}>
                                  <Action/>
                                </StyledTableCell>
                              );
                            }
                            return (
                                <StyledTableCell key={column.id} align={column.align}
                                sx={{paddingTop :'10px',
                                paddingBottom : '10px', 
                                border : 'none',
                                textTransform : 'capitalize'}}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </StyledTableCell>
                            );
                            })} 
                        </StyledTableRow>  
                      <div className='bg-white p-1 w-full'/>  
                    </>              
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {data && data?.data?.data.length >= 5 && <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data && data?.data?.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}/> }
    </Paper> 
  );
}


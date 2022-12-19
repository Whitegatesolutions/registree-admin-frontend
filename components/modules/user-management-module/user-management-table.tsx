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
import { CircularProgress, IconButton } from '@mui/material';
import { getAxiosRequestWithAuthorizationHeader } from '../../../utils/api-requests/axios-requests';
import { useQuery } from '@tanstack/react-query';
import { ComponentLoader } from '../loader-spinner';
import DeleteUserDialog from './delete-user-dialog';
import { AddUserDialog } from './add-user-dialog';
import { CustomDivBackDrop } from '../../backdrop';
import { EditUserDialog } from './edit-user-dialog';

const columns = [
  { id: 'serial', label: 'S/N', width : 'fit-content'},
  { id: 'name', label: 'Name', width : 'fit-content' },
  {
    id: 'dateCreated',
    label: 'Date Joined',
    width : 'fit-content',
    //align: 'right',
    format: (value : any) => value.toLocaleString('en-US'),
  },
  {
    id: 'gender',
    label: 'Gender',
    width : 'fit-content',
    //align: 'right',
    format: (value : any) => value.toLocaleString('en-US'),
  },
  {
    id: 'role',
    label: 'Role',
    width : 'fit-content',
    //align: 'right',
    format: (value : any) => value.toFixed(2),
  },
  {
    id: 'status',
    label: 'Status',
    width : 'fit-content',
    //align: 'right',
    format: (value : any) => value.toLocaleString('en-US'),
  },
  {
    id: 'action',
    label: 'Action',
    width : 'fit-content',
    //align: 'right',
    format: (value : any) => value.toFixed(2),
  }
];

const Action = ( {id, refetch, user} : any) :JSX.Element =>{
  const [openDialog, setDialog] = React.useState({
    edit : false,
    delete : false
  });

    return(
      <React.Fragment>
        <div className='flex flex-row items-center gap-1'>
          <IconButton sx={{padding : '0.4rem'}}
          onClick={() => setDialog({...openDialog, edit : !openDialog.edit})}>
            <object data="/icons.png" className='w-4 h-4 object-contain'/>
          </IconButton>

          <IconButton sx={{padding : '0.4rem'}} onClick={() => setDialog({...openDialog, delete : !openDialog.delete})}>
            <object data="/delete.png" className='w-4 h-4 object-contain'/>
          </IconButton>
        </div>

        {openDialog.delete && <DeleteUserDialog 
        open={openDialog.delete}
        id={id}
        handleClose={() => setDialog({...openDialog, delete : !openDialog.delete})}
        refetch={refetch}/>}
        {openDialog.delete && <CustomDivBackDrop 
        close={() => setDialog({...openDialog, delete : !openDialog.delete})}/>}

      {openDialog.edit && <EditUserDialog 
        handleClose={() => setDialog({...openDialog, edit : !openDialog.edit})}
        refetch={refetch}
        user={user}/>}
        {openDialog.edit && <CustomDivBackDrop 
        close={() => setDialog({...openDialog, edit : !openDialog.edit})}/>}
      </React.Fragment>
    );
} 

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#FFFAFA',
    },
    '&:nth-of-type(even)': {
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

  type Props={
    open : boolean,
    close : React.MouseEventHandler<HTMLDivElement>
  }
export default function UserManagementTable({open, close} : Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const {data, isLoading, isError, refetch} = useQuery(['users'], 
  () => getAxiosRequestWithAuthorizationHeader('user/find/users-by-role/ADMIN'));

  //console.log('response', data?.data?.data);

  const handleChangePage = (event : any, newPage : any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event : any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if(isError){
    return <p className='text-red-500'>An Error Has Occurred!</p>
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
            {isLoading && <ComponentLoader/>}
                {data?.data?.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row :any, rowindex : number) => {
                     return (
                        <>
                          <StyledTableRow role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column : any, i:number) => {
                              const value = row[column.id];
                              if(column.id === "serial"){
                                 return(
                                  <StyledTableCell key={column.id} align={column.align}
                                  sx={{paddingTop :'10px',
                                  paddingBottom : '10px', 
                                  border : 'none',
                                  textTransform : 'capitalize'}}>
                                      {rowindex+1}
                                  </StyledTableCell>
                                 ); 
                              }
                              if(column.id === "name"){
                                return(
                                  <StyledTableCell key={column.id} align={column.align}
                                  sx={{paddingTop :'10px',
                                  paddingBottom : '10px', 
                                  border : 'none',
                                  textTransform : 'capitalize'}}>
                                    <span>{row.firstName}&nbsp;</span>
                                    <span>{row.lastName}</span>
                                  </StyledTableCell>
                                );
                              }

                              if(column.id === "dateCreated"){
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
                              if(column.id === "status"){
                                return(
                                  <StyledTableCell key={column.id} align={column.align}
                                  sx={{paddingTop :'10px',
                                  paddingBottom : '10px', 
                                  border : 'none',
                                  textTransform : 'capitalize'}}>
                                  {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : row.status ? 'ACTIVE' : 'INACTIVE'}
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
                                    <Action id={row.id} refetch={refetch} user={row}/>
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
        {data?.data?.data.length >= 5 && <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data?.data?.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />}

      {open && <AddUserDialog open={open} handleClose={close} refetch={refetch}/>}
      {open && <CustomDivBackDrop close={close}/>}
    </Paper>
  );
}

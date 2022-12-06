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
import { IconButton } from '@mui/material';

const columns = [
  { id: 'serial', label: 'S/N', width : 'fit-content'},
  { id: 'name', label: 'Name', width : 'fit-content' },
  {
    id: 'dateJoined',
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

const Action = () :JSX.Element =>{
    return(
        <div className='flex flex-row items-center gap-1'>
          <IconButton sx={{padding : '0.2rem'}}>
              <object data="/icons.png" className='w-4 h-4 object-contain'/>
          </IconButton>

          <IconButton sx={{padding : '0.2rem'}}>
              <object data="/delete.png" className='w-4 h-4 object-contain'/>
          </IconButton>
        </div>
    );
} 
function createData(
    serial : number,
    name : string,
    dateJoined : string, 
    gender : string, 
    role : string, 
    status : string, 
    action : JSX.Element) {
  return { serial, name, dateJoined, gender, role, status,action };
}

const rows = [
  createData(1,'Philip olajide', '4/10/2022', "male", "Intern", "Active",<Action/>),
  createData(2,'Azizat Taiwo', '17/03/2022', "female", "Lawyer", "Inactive",<Action/>),
  createData(3,'Ugo NwaKwo', '28/11/2022', "male", "Intern", "Active",<Action/>),
  createData(4,'Stephen Balla', '13/08/2022', "male", "Lawyer", "Inactive",<Action/>),
  createData(5,'Oyindamola Olambiwoninu', '31/05/2022', "Female", "Lawyer", "Active",<Action/>),
  createData(6,'Ogechi Nwachukwu', '25/04/2022', "Female", "Lawyer", "Inactive",<Action/>),
//   createData(7,'Oyindamola Olambiwoninu', '31/05/2022', "Female", "Lawyer", "Active",<Action/>),
//   createData(8,'Ogechi Nwachukwu', '25/04/2022', "Female", "Lawyer", "Inactive",<Action/>)
];

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

export default function UserManagementTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event : any, newPage : any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event : any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="w-full flex justify-center">
        <div className='w-11/12 md:w-full'>
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
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row :any, i : number) => {
                            return (
                                <>
                                    <StyledTableRow role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column : any) => {
                                        const value = row[column.id];
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
                {/* <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
            </Paper>
        </div>
    </div>
  );
}

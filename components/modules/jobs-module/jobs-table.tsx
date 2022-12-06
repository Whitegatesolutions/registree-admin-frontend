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
import { IconButton, Tooltip } from '@mui/material';

const columns = [
  { id: 'jobId', label: 'Job ID', width : 'fit-content'},
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
function createData(
    jobId : string,
    businessName : string,
    jobType : string, 
    regDate : string, 
    businessOwner : string, 
    jobState : string, 
    action : JSX.Element) {
  return { jobId, businessName, jobType, regDate, businessOwner, jobState,action };
}
const returnColorForJobStatus = (status : string) => {
  switch(status){
    case "Queried":
      return 'bg-[#FF2D2D]';
    case "Pending" : 
      return 'bg-[#2B85F0]';
    case "Completed" : 
      return 'bg-[#16C807]';
  }
}
const rows = [
  createData('BNR317','Nigerian breweries,Federal breweries,Pepsi Co', 'Business Name Registration', "26/06/2022", "Tobi Afolabi", "Pending",<Action/>),
  createData('CPR717','Cadbury', 'Compliance Report', "26/06/2022", "Tobi Afolabi", "Pending",<Action/>),
  createData('FAC393','Kuda Bank', 'Firm Acquisition', "26/06/2022", "Tobi Afolabi", "Queried",<Action/>),
  createData('AUD766','Nigerian Port Authority', 'Audit', "26/06/2022", "Tobi Afolabi", "Pending",<Action/>),
  createData('BNR803','FCMB', 'Business Name Registration', "26/06/2022", "Tobi Afolabi", "Completed",<Action/>),

];

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

export default function JobsTable() {
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
                                if(column.id === "jobState"){
                                  return(
                                    <StyledTableCell key={column.id} align={column.align}
                                    sx={{paddingTop :'10px',
                                    paddingBottom : '10px', 
                                    border : 'none',
                                    textTransform : 'capitalize'}}>
                                    {/* {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value} */}
                                        <div className={`${returnColorForJobStatus(value)} w-fit px-3 py-2 text-white text-[10px] font-semibold rounded-2xl`}>
                                            {value}
                                        </div>
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

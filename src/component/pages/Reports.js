import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import logo from '../../assets/logo.png';
import Link from '@mui/material/Link';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calculation, date) {
  return { name, calculation, date };
}

const rows = [
    createData('L2-N1, Advance S5', '120+238 to 120+240', 'October 7, 2022 -3:20pm'),
    createData('L2-N1, Advance S5', '120+238 to 120+240', 'October 7, 2022 -3:20pm'),
    createData('L2-N1, Advance S5', '120+238 to 120+240', 'October 7, 2022 -3:20pm'),
    createData('L2-N1, Advance S5', '120+238 to 120+240', 'October 7, 2022 -3:20pm'),
    createData('L2-N1, Advance S5', '120+238 to 120+240', 'October 7, 2022 -3:20pm'),
  
    createData('L2-N1, Advance S5', '120+238 to 120+240', 'October 7, 2022 -3:20pm'),
    createData('L2-N1, Advance S5', '120+238 to 120+240', 'October 7, 2022 -3:20pm'),
    createData('L2-N1, Advance S5', '120+238 to 120+240', 'October 7, 2022 -3:20pm'),
    createData('L2-N1, Advance S5', '120+238 to 120+240', 'October 7, 2022 -3:20pm'),
    createData('L2-N1, Advance S5', '120+238 to 120+240', 'October 7, 2022 -3:20pm'),
  ].sort((a, b) => (a.calculation < b.calculation ? -1 : 1));

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <div style = {{backgroundColor: '#F2F2F2', display: 'block', color: 'black', padding: '2%', cursor: 'context-menu' }}>
      <Link href="/"><img alt="logo" src={logo}/></Link>
      <div style={{ fontSize: '15px', fontWeight: 'bold', float: 'right', display: 'flex' }}>
      <Link href="/post"><div>POST</div></Link>
      <Link href="/"><div style={{marginRight: '30px', marginLeft: '20px'}}>LOGOUT</div></Link>
      </div>
    </div>
    <div style={{ color: 'white', margin: '3% 10%' }}> 
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>ADVANCE</TableCell>
                        <TableCell >CHAINAGE</TableCell>
                        <TableCell >DATE + TIME</TableCell>
                        <TableCell >{''}</TableCell>
                    </TableRow>
                </TableHead>
            <TableBody>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
            ).map((row) => (
                <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell >{row.calculation}</TableCell>
                    <TableCell >{row.date}</TableCell>
                    <TableCell style={{cursor: 'pointer'}} >{'download'}</TableCell>
                </TableRow>
            ))}

            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
                </TableRow>
            )}
            </TableBody>
            <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {
                    'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                />
            </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>
    </div>
    </>
  );
}
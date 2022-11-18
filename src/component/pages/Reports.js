import React, { useState, useEffect } from 'react'
import axios from 'axios';
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
import pdfLogo from '../../assets/pdfLogo.JPG';

import Link from '@mui/material/Link';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';


function TablePaginationActions (props) {
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

const token = localStorage.getItem('token')

const config = { headers: {  Authorization: token } };

export default function CustomPaginationActionsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [posts, setPosts] = useState(null);
  const [post, setPost] = useState(null);

  console.log('post', post)



  useEffect(() => {
      axios.get('https://geosystem.herokuapp.com/api/getAllPosts', config).then((res)=>{
        setPosts(res.data.data);
      })

  }, []);

  const handleLogout = (event) => {
    event.preventDefault()

    localStorage.removeItem('token')

    window.location.href = "./"
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log('poooossstttt', post);


  const handleDownload = async(id) => {
    const res = await axios.get(`https://geosystem.herokuapp.com/api/getOnePost/${id}`, config)
    await setPost(res.data.data)

    console.log('res', post);

    exportPdf()

  }

  function exportPdf(){

    const page = document.getElementById('my-page')
    html2canvas(page).then((canvas)=>{
      const imgData = canvas.toDataURL("image/png")

      const pdf = new jsPDF("p", "pt", "a4")

      pdf.addImage(imgData, "JPEG", 10, 50)
      pdf.save('FACE-MAPPING-REPORT.pdf')
    })
  }

  return (
    <>
      <div style = {{backgroundColor: '#F2F2F2', display: 'block', color: 'black', padding: '2%', cursor: 'context-menu' }}>
        <Link href="/"><img alt="logo" src={logo}/></Link>
        <div style={{ fontSize: '15px', fontWeight: 'bold', float: 'right', display: 'flex' }}>
        <Link href="/post"><div>POST</div></Link>
        <Link onClick={handleLogout} style={{marginRight: '30px', marginLeft: '20px'}}>LOGOUT</Link>
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
                  ? posts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : posts
              )?.map((post) => (
                  <TableRow
                      key={post.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                      <TableCell component="th" scope="row">{post.advanceName}</TableCell>
                      <TableCell >{post.advanceLocationFrom} To {post.advanceLocationTo}</TableCell>
                      <TableCell >{post.date}</TableCell>
                      <TableCell onClick={()=>handleDownload(post.id)} value={post.id} style={{cursor: 'pointer'}} >{'download'}</TableCell>
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
                  count={posts?.length}
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

      <div id="my-page">
          <div style={{ border: '2px solid black', display: 'flex' }}>
                <div style={{margin: '8px', borderRight: '1px solid black', paddingRight: '5px', width: '25%'}}>
                    <h4 style = {{ color: 'black' }}>Face Mapping Report</h4>
                      <div>{post?.date}</div>
                </div>
                <div style={{margin: '8px', borderRight: '1px solid black', paddingRight: '5px', width: '25%'}}>
                    <div style = {{ color: 'black' }}>LOCATION</div>
                      <h4>{post?.advanceLocationFrom}</h4>
                      <h4>{post?.advanceLocationTo}</h4>

                </div>
                <div style={{margin: '8px', borderRight: '1px solid black', paddingRight: '5px', width: '15%'}}>
                    <div style = {{ color: 'black' }}>DEPTH OF COVER</div>
                    <div> {post?.depthCover}</div>

                    <div style = {{ color: 'black' }}>DRIVE DIRECTION</div>
                    <div> {post?.driveDirection}</div>
                </div>
                <div style={{margin: '8px', borderRight: '1px solid black', paddingRight: '5px', width: '15%'}}>
                    <div style = {{ color: 'black' }}>EXCAVATED</div>
                    <h4>{post?.excavated}</h4>

                    <div style = {{ color: 'black' }}>OVERBREAK</div>
                    <h4>{post?.overbreak}</h4>

                    <div style = {{ color: 'black' }}>UNDERBREAK</div>
                    <h4>{post?.underbreak}</h4>
                </div>
                <div style={{margin: '8px', paddingRight: '5px', width: '20%'}}>
                    <h4 style = {{ color: 'black' }}>NEOM, LOT 2 & 3</h4>
                    <img alt="logo" style={{ padding: '1%'}} src={pdfLogo}/>
                </div>
          </div>
          <div style={{ border: '2px solid black', display: 'flex' }}>
                <div style={{margin: '8px', borderRight: '1px solid black', paddingRight: '5px', width: '30%'}}>
                    <h4 style = {{ color: 'black' }}>Q INDEX</h4>
                    <div>{post?.qIndex}</div>

                    <h4 style = {{ color: 'black' }}>SUPPORTING</h4>
                    <div>{post?.massQuality}</div>
                </div>
                <div style={{margin: '8px', paddingRight: '5px', width: '40%', borderRight: '1px solid black'}}>
                    <img alt="sketch" src={post?.imageSketch} style={{ padding: '1%'}} />
                </div>
                <div style={{margin: '8px', paddingRight: '5px', width: '30%'}}>
                  <h3 style = {{ color: 'black' }}>NOTES</h3>
                <div>{post?.notes}</div>
          </div>
          </div>

      </div>
    </>
  );
}

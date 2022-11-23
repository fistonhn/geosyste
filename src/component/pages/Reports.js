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
    setPost(res.data.data)

    exportPdf()

  }

  function exportPdf(){

    const page = document.getElementById('my-page')
    html2canvas(page).then((canvas)=>{

      const pdf = new jsPDF()

      pdf.html(page, {
        callback: function(doc) {
            // Save the PDF
            doc.save('FACE-MAPPING-REPORT.pdf');
        },
        margin: [5, 5, 5, 5],
        autoPaging: 'text',
        x: 0,
        y: 0,
        width: 190, 
        windowWidth: 675 
    });

    })
  }

  return (
    <>
      <div style = {{backgroundColor: '#F2F2F2', display: 'block', color: '#333333', padding: '2%', cursor: 'context-menu' }}>
        <Link href="/"><img alt="logo" src={logo}/></Link>
        <div style={{ fontSize: '13px', fontWeight: 'bold', float: 'right', display: 'flex' }}>
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
                      <TableCell component="th" scope="row">{post?.advanceName !== 'undefined' ? post?.advanceName : ''}</TableCell>
                      <TableCell >{post.advanceLocationFrom !== 'undefined' ? post?.advanceLocationFrom : ''} To {post?.advanceLocationTo !== 'undefined' ? post?.advanceLocationTo : ''}</TableCell>
                      <TableCell >{post.date !== 'undefined' ? post?.date : ''}</TableCell>
                      <TableCell onClick={()=>handleDownload(post?.id)} value={post?.id} style={{cursor: 'pointer'}} >{'download'}</TableCell>
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
      <div style={{ display: 'nonec', padding: '0% 25%'}}>
        <div id="my-page" style={{ fontSize: '12px', minWidth: '705px', maxWidth: '705px', border: '1px solid #CECECE', overflow: 'hidden' }}>
            <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto auto', minWidth: '710px', maxWidth: '710px'}}>
              <div style={{ borderRight: '1px solid #CECECE', padding: '10px', fontSize: '30px'}}>
                  <h4 style = {{ color: '#333333', fontSize: '13px' }}>Face Mapping Report</h4>
                  <div style={{ fontSize: '11px', marginTop: '1px' }}>{post?.date !== 'undefined' ? post?.date : ''}</div>

                  <div style = {{ color: '#333333', fontSize: '13px', marginTop: '10px' }}>Excavation Method</div>
                  <h4 style={{ fontSize: '11px', marginTop: '1px' }}>{post?.excavationMethod !== 'undefined' ? post?.excavationMethod : ''}</h4>

                  <div style = {{ color: '#333333', fontSize: '13px' }}>RESS <span style={{marginLeft: '5px'}}> No.</span></div>
                  <h4 style={{ fontSize: '11px', marginTop: '1px' }}>{post?.ressNo !== 'undefined' ? post?.ressNo : ''}</h4>
              </div>
              <div style={{ borderRight: '1px solid #CECECE', padding: '10px', fontSize: '30px'}}>
                  <div style = {{ color: '#333333', fontSize: '13px' }}>LOCATION</div>
                  <h4 style={{ fontSize: '11px', marginTop: '1px' }}>{post?.tunnel !== 'undefined' ? post?.tunnel : ''}</h4>
                  <h4 style={{ fontSize: '11px', marginTop: '1px' }}>{post?.advanceName !== 'undefined' ? post?.advanceName : ''}</h4>

                  <h4 style={{ fontSize: '11px', marginTop: '1px' }}>{post?.advanceLocationFrom !== 'undefined' ? post?.advanceLocationFrom : ''}</h4>
                  <h4 style={{ fontSize: '11px', marginTop: '1px' }}>{post?.advanceLocationTo !== 'undefined' ? post?.advanceLocationTo : ''}</h4>

                  <div style = {{ color: '#333333', fontSize: '13px' }}>Excavation Section</div>
                  <h4 style={{ fontSize: '11px', marginTop: '1px' }}>{post?.excavationSection !== 'undefined' ? post?.excavationSection : ''}</h4>
              </div>
              <div style={{ borderRight: '1px solid #CECECE', padding: '10px', fontSize: '30px'}}>
                  <div style = {{ color: '#333333', fontSize: '13px' }}>DEPTH <span>OF</span> COVER</div>
                  <h4 style={{ fontSize: '11px', marginTop: '1px' }}> {post?.depthCover !== 'undefined' ? post?.depthCover : ''}</h4>

                  <div style = {{ color: '#333333', fontSize: '13px' }}>DRIVE <span>DIRECTION</span> </div>
                  <h4 style={{ fontSize: '11px', marginTop: '1px' }}> {post?.driveDirection !== 'undefined' ? post?.driveDirection : ''}</h4>
              </div>
              <div style={{ width: '97%', padding: '10px', fontSize: '30px'}}>
                  <h4 style = {{ color: '#333333', fontSize: '13px', textAlign: 'center' }}>NEOM, LOT 2 & 3</h4>
                  <img alt="logo" style={{ padding: '1%', display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%' }} width="80" height="80" src={pdfLogo}/>
              </div>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto', minWidth: '710px', maxWidth: '710px'}}>
              <div style={{ borderTop: '1px solid #CECECE', borderRight: '1px solid #CECECE', padding: '10px', fontSize: '30px'}}>
                  <h4 style = {{ color: '#333333', fontSize: '13px' }}>Q INDEX</h4>
                  <div style={{ fontSize: '11px', marginTop: '1px' }}>{post?.qIndex !== 'undefined' ? post?.qIndex : ''}{' '}{post?.massQuality !== 'undefined' ? post?.massQuality : ''}</div>

                  <h4 style = {{ color: '#333333', fontSize: '13px' }}>SUPPORTING</h4>
                  <div style={{ fontSize: '11px', marginTop: '1px' }}>{post?.supporting !== 'undefined' ? post?.supporting : ''}</div>
              </div>
              <div style={{ padding: '10px', fontSize: '30px', borderTop: '1px solid #CECECE', borderRight: '1px solid #CECECE'}}>
                  <img alt="sketch" width="360" height="250" src={post?.facemappingSketchImg} style={{ padding: '1%'}} />
              </div>
              <div style={{width: '98%', borderTop: '1px solid #CECECE', padding: '10px', fontSize: '30px'}}>
                  <h4 style = {{ color: '#333333', fontSize: '13px' }}>NOTES</h4>
                  <h4 style={{ fontSize: '11px', marginTop: '1px' }}> {post?.notes !== 'undefined' ? post?.notes : ''}</h4>
              </div>
            </div>
            <div style={{display: 'grid', borderTop: '1px solid #CECECE', gridTemplateColumns: 'auto auto auto', minWidth: '710px', maxWidth: '710px'}}>
              <div style={{ borderRight: '1px solid #CECECE',  padding: '10px', fontSize: '30px', minWidth: '550px', maxWidth: '550px', overflow: 'hidden'}}>
                  <h4 style = {{ color: '#333333', fontSize: '13px' }}>JOINTS</h4>
                  <table>
                          <tr style = {{ borderBottom: '1px solid #ddd' }} >
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px', whiteSpace: 'nowrap' }}>Set no.</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }} >Type</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }} >Dip</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }} >Dip direction</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }} >Roughness</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }} >Infilling</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }} >Weathering</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }} >Spacing</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }} >Aperture</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }} >Persistence</td>
                          </tr>
                          <tr style = {{ borderBottom: '1px solid #ddd' }} key={post?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <td  style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.setNo1 !== 'undefined' ? post?.setNo1 : ''}</td>
                              <td  style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.type1 !== 'undefined' ? post?.type1 : ''}</td>
                              <td  style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.dip1 !== 'undefined' ? post?.dip1 : ''}</td>
                              <td  style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.dipDirection1 !== 'undefined' ? post?.dipDirection1 : ''}</td>
                              <td  style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.roughness1 !== 'undefined' ? post?.roughness1 : ''}</td>
                              <td  style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.infilling1 !== 'undefined' ? post?.infilling1 : ''}</td>
                              <td  style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.weathering1 !== 'undefined' ? post?.weathering1 : ''}</td>
                              <td  style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.spacing1 !== 'undefined' ? post?.spacing1 : ''}</td>
                              <td  style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.aperture1 !== 'undefined' ? post?.aperture1 : ''}</td>
                              <td  style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.persistence1 !== 'undefined' ? post?.persistence1 : ''}</td>
                          </tr>
                          <tr style = {{ borderBottom: '1px solid #ddd' }} key={post?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.setNo2 !== 'undefined' ? post?.setNo2 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.type2 !== 'undefined' ? post?.type2 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.dip2 !== 'undefined' ? post?.dip2 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.dipDirection2 !== 'undefined' ? post?.dipDirection2 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.roughness2 !== 'undefined' ? post?.roughness2 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.infilling2 !== 'undefined' ? post?.infilling2 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.weathering2 !== 'undefined' ? post?.weathering2 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.spacing2 !== 'undefined' ? post?.spacing2 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.aperture2 !== 'undefined' ? post?.aperture2 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.persistence2 !== 'undefined' ? post?.persistence2 : ''}</td>
                          </tr>
                          <tr style = {{ borderBottom: '1px solid #ddd' }} key={post?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.setNo3 !== 'undefined' ? post?.setNo3 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.type3 !== 'undefined' ? post?.type3 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.dip3 !== 'undefined' ? post?.dip3 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.dipDirection3 !== 'undefined' ? post?.dipDirection3 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.roughness3 !== 'undefined' ? post?.roughness3 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.infilling3 !== 'undefined' ? post?.infilling3 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.weathering3 !== 'undefined' ? post?.weathering3 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.spacing3 !== 'undefined' ? post?.spacing3 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.aperture3 !== 'undefined' ? post?.aperture3 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.persistence3 !== 'undefined' ? post?.persistence3 : ''}</td>
                          </tr>
                          <tr style = {{ borderBottom: '1px solid #ddd' }} key={post?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.setNo4 !== 'undefined' ? post?.setNo4 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.type4 !== 'undefined' ? post?.type4 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.dip4 !== 'undefined' ? post?.dip4 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.dipDirection4 !== 'undefined' ? post?.dipDirection4 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.roughness4 !== 'undefined' ? post?.roughness4 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.infilling4 !== 'undefined' ? post?.infilling4 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.weathering4 !== 'undefined' ? post?.weathering4 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.spacing4 !== 'undefined' ? post?.spacing4 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.aperture4 !== 'undefined' ? post?.aperture4 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.persistence4 !== 'undefined' ? post?.persistence4 : ''}</td>
                          </tr>
                          <tr style = {{ borderBottom: '1px solid #ddd' }} key={post?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.setNo5 !== 'undefined' ? post?.setNo5 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.type5 !== 'undefined' ? post?.type5 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.dip5 !== 'undefined' ? post?.dip5 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.dipDirection5 !== 'undefined' ? post?.dipDirection5 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.roughness5 !== 'undefined' ? post?.roughness5 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.infilling5 !== 'undefined' ? post?.infilling5 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.weathering5 !== 'undefined' ? post?.weathering5 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.spacing5 !== 'undefined' ? post?.spacing5 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.aperture5 !== 'undefined' ? post?.aperture5 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.persistence5 !== 'undefined' ? post?.persistence5 : ''}</td>
                          </tr>
                          <tr key={post?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.setNo6 !== 'undefined' ? post?.setNo6 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.type6 !== 'undefined' ? post?.type6 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.dip6 !== 'undefined' ? post?.dip6 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.dipDirection6 !== 'undefined' ? post?.dipDirection6 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.roughness6 !== 'undefined' ? post?.roughness6 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.infilling6 !== 'undefined' ? post?.infilling6 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.weathering6 !== 'undefined' ? post?.weathering6 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.spacing6 !== 'undefined' ? post?.spacing6 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.aperture6 !== 'undefined' ? post?.aperture6 : ''}</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.persistence6 !== 'undefined' ? post?.persistence6 : ''}</td>
                          </tr>
                  </table>
              </div>
              <div style={{ padding: '10px', fontSize: '30px', minWidth: '100px', maxWidth: '100px'}}>
                  <h4 style = {{ color: '#333333', fontSize: '13px' }}>Q SYSTEM PARAMETERS</h4>
                  <table>                     
                          <tr style = {{ borderBottom: '1px solid #ddd' }}>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>RQD</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.rqd  !== 'undefined' ? post?.rqd : ''}</td>
                          </tr>
                          <tr style = {{ borderBottom: '1px solid #ddd' }}>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>Jn</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.jn !== 'undefined' ? post?.jn : ''}</td>
                          </tr>
                          <tr style = {{ borderBottom: '1px solid #ddd' }}>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>Jr</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.jr !== 'undefined' ? post?.jr : ''}</td>
                          </tr>
                          <tr style = {{ borderBottom: '1px solid #ddd' }}>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>Ja</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.ja !== 'undefined' ? post?.ja : ''} <span style={{color: '#757575'}}>deg</span></td>
                          </tr>
                          <tr style = {{ borderBottom: '1px solid #ddd' }}>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>Jw</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.jw !== 'undefined' ? post?.jw : ''} <span style={{color: '#757575'}}>kg/cm2</span></td>
                          </tr>
                          <tr >
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>SRF</td>
                              <td style = {{ fontSize: '10px', textAlign: 'left', padding: '8px' }}>{post?.srf !== 'undefined' ? post?.srf : ''}</td>
                          </tr>
                      
                  </table>
              </div>
            </div>
            <div style={{ borderBottom: '1px solid #CECECE', borderTop: '1px solid #CECECE', width: '102%', minWidth: '710px', maxWidth: '710px' }}>
              <div style={{display: 'flex'}}>
                <h4 style = {{ color: '#333333', marginLeft: '10px' }}>LITHOLOGY</h4>
                <h4 style = {{ color: '#333333', marginLeft: '10px' }}>DESCRIPTION</h4>
              </div>
                <div style={{ display: 'flex' }}>
                    <div style={{margin: '8px', width: '25%'}}>
                          <div style = {{ color: '#333333', fontSize: '13px', fontWeight: 600 }}>Strenght</div>
                          <div style={{fontSize: '10px'}}>{post?.strength !== 'undefined' ? post?.strength : ''}</div>
                          <div style = {{ color: '#333333', fontSize: '13px', fontWeight: 600, marginTop: '13px' }}>Brightness</div>
                          <div style={{fontSize: '10px'}}>{post?.brightness !== 'undefined' ? post?.brightness : ''}</div>
                          <div style = {{ color: '#333333', fontSize: '13px', fontWeight: 600, marginTop: '13px' }}>Tincture</div>
                          <div style={{fontSize: '10px'}}>{post?.tincture !== 'undefined' ? post?.tincture : ''}</div>
                    </div>
                    <div style={{margin: '8px', width: '25%'}}>
                          <div style = {{ color: '#333333', fontSize: '13px', fontWeight: 600 }}>Colour</div>
                          <div style={{fontSize: '10px'}}>{post?.colour !== 'undefined' ? post?.colour : ''}</div>
                          <div style = {{ color: '#333333', fontSize: '13px', fontWeight: 600, marginTop: '13px' }}>Texture</div>
                          <div style={{fontSize: '10px'}}>{post?.texture !== 'undefined' ? post?.texture : ''}</div>
                          <div style = {{ color: '#333333', fontSize: '13px', fontWeight: 600, marginTop: '13px' }}>Weathering</div>
                          <div style={{fontSize: '10px'}}>{post?.weather !== 'undefined' ? post?.weather : ''}</div>
                    </div>
                    <div style={{margin: '8px', width: '25%'}}>
                          <div style = {{ color: '#333333', fontSize: '13px', fontWeight: 600 }}>Grain Size</div>
                          <div style={{fontSize: '10px'}}>{post?.grainSize !== 'undefined' ? post?.grainSize : ''}</div>
                          <div style = {{ color: '#333333', fontSize: '13px', fontWeight: 600, marginTop: '13px' }}>Igneous Rock</div>
                          <div style={{fontSize: '10px'}}>{post?.igneousRock !== 'undefined' ? post?.igneousRock : ''}</div>
                          <div style = {{ color: '#333333', fontSize: '13px', fontWeight: 600, marginTop: '13px' }}>Other Rock Type</div>
                          <div style={{fontSize: '10px'}}>{post?.otherRockType !== 'undefined' ? post?.otherRockType : ''}</div>
                    </div>
                    <div style={{margin: '8px', width: '25%'}}>
                        <div style = {{ color: '#333333', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', marginRight: '1000px' }}>Additional Description</div>
                        <div style={{fontSize: '10px'}}>{post?.additionalDescription !== 'undefined' ? post?.additionalDescription : ''}</div>
                    </div>
                </div>
            </div>
            <div style={{ borderTop: '1px solid #CECECE', borderBottom: '1px solid #CECECE', display: 'flex', marginTop: '150px', minWidth: '710px', maxWidth: '710px' }}>
                  <div style={{margin: '8px', paddingRight: '5px', width: '33%'}}>
                      <img width="190" height="120" alt="sketch" src={post?.photos} style={{ padding: '1%'}} />
                  </div>
                  <div style={{margin: '8px', paddingRight: '5px', width: '33%'}}>
                      <img width="190" height="120" alt="sketch" src={post?.photos} style={{ padding: '1%'}} />
                  </div>
                  <div style={{margin: '8px', paddingRight: '5px', width: '33%'}}>
                      <img width="190" height="120" alt="sketch" src={post?.photos} style={{ padding: '1%'}} />
                  </div>
            </div>
            <div style={{ display: 'flex', marginTop: '10px', minWidth: '710px', maxWidth: '710px' }}>
                  <div style={{margin: '8px', paddingRight: '5px', width: '33%', border: '1px solid #CECECE'}}>
                      <div style={{ borderBottom: '1px solid #CECECE'}}>
                        <h5 style = {{ margin: '10px', color: '#333333', width: '110%' }}>LOGGED AND PREPARED BY FCS-JV</h5>
                      </div>
                      <div style={{ borderBottom: '1px solid #CECECE'}}>
                        <div style = {{ margin: '10px', color: '#333333' }}>Position</div>
                      </div>
                      <div style={{ paddingBottom: '100px'}}>
                        <div style = {{ margin: '10px', color: '#333333' }}>Signature</div>
                      </div>
                  </div>
                  <div style={{margin: '8px', paddingRight: '5px', width: '33%', border: '1px solid #CECECE'}}>
                      <div style={{ borderBottom: '1px solid #CECECE'}}>
                        <h5 style = {{ margin: '10px', color: '#333333' }}>REVIEWED BY EPM</h5>
                      </div>
                      <div style={{ borderBottom: '1px solid #CECECE'}}>
                        <div style = {{ margin: '10px', color: '#333333' }}>Position</div>
                      </div>
                      <div style={{ paddingBottom: '100px'}}>
                        <div style = {{ margin: '10px', color: '#333333' }}>Signature</div>
                      </div>
                  </div>
                  <div style={{margin: '8px', paddingRight: '5px', width: '34%', border: '1px solid #CECECE'}}>
                      <div style={{ borderBottom: '1px solid #CECECE'}}>
                        <h5 style = {{ margin: '10px', color: '#333333' }}>APPROUVED BY BEC</h5>
                      </div>
                      <div style={{ borderBottom: '1px solid #CECECE'}}>
                        <div style = {{ margin: '10px', color: '#333333', fontSize: '11px' }}>Position</div>
                      </div>
                      <div style={{ paddingBottom: '100px'}}>
                        <div style = {{ margin: '10px', color: '#333333', fontSize: '11px' }}>Signature</div>
                      </div>
                  </div>
            </div>
        </div>
      </div>
    </>
  );
}

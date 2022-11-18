import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from '../../assets/logo.png';
import Link from '@mui/material/Link';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Post = () => {
    const [qData, setQdata] = useState({ rqd: null, jn: null, jr: null, ja: null, jw: null, srf: null })
    const [data, setData] = useState(null)

    const [resError, setResError] = useState(null)
    const [resSuccess, setResSuccess] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const [imageSketch, setImageSketch] = useState(null)
    const [imagePhoto, setImagePhoto] = useState(null)


    const [qIndex, setQindex] = useState(null)
    const [massQuality, setMassQuality] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setResError(null)
            setResSuccess(null)
        }, 3000)
        return () => clearTimeout(timer)
      })

    const token = localStorage.getItem('token')
    if(token === null) return window.location.href = "./";

    const config = { headers: {  Authorization: token } };


    const handleChangeQ = (event) => {
        const { name, value } = event.target
        setQdata({ ...qData, [name]: value })
      }

    const handleCalculate = (e) => {
        e.preventDefault()

        const qIndexResult = (qData.rqd/qData.jn) * (qData.jr/qData.ja) * (qData.jw/qData.srf)

        setQindex(qIndexResult)

        let massQualityResult;

            if(0.001 <= parseFloat(qIndexResult) && parseFloat(qIndexResult) < 0.01){
              massQualityResult = "Exceptionally poor"

            } else if( 0.01 <= parseFloat(qIndexResult) && parseFloat(qIndexResult) < 0.1){
              massQualityResult = "Extremely poor"

            } else if(0.1 <= parseFloat(qIndexResult) && parseFloat(qIndexResult) < 1){
              massQualityResult = "Very poor"

            } else if(1 <= parseFloat(qIndexResult) && parseFloat(qIndexResult) < 4){
              massQualityResult = "Poor"

            } else if (4 <= parseFloat(qIndexResult) && parseFloat(qIndexResult) < 10){
              massQualityResult = "Fair"

            } else if( 10 <= parseFloat(qIndexResult) && parseFloat(qIndexResult) < 40){
              massQualityResult = "Good"
            }
             else if(40<= parseFloat(qIndexResult) && parseFloat(qIndexResult) < 100){
              massQualityResult = "Very good"
            }
            else if(100 <= parseFloat(qIndexResult) && parseFloat(qIndexResult) < 400){
                massQualityResult = "Extremely good"
            }
            else if(400 <= parseFloat(qIndexResult) && parseFloat(qIndexResult) < 1000){
              massQualityResult = "Exceptionally good"
            }  
            else if(parseFloat(qIndexResult) > 1000){
              massQualityResult = "Q INDEX is more than 1000"
            }
             else {
                massQualityResult = "No result"
            }

            setMassQuality(massQualityResult)

            localStorage.setItem('qIndexResult', qIndexResult)
            localStorage.setItem('massQualityResult', massQualityResult)

    }

    const handleLogout = (event) => {
        event.preventDefault()

        localStorage.removeItem('token')

        window.location.href = "./"
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }

    const handleImageSketch = (e) => { setImageSketch(e.target.files[0]) }

    const handleImagePhoto = (e) => { setImagePhoto(e.target.files[0]) }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(data===null) return setResError('Please fill fields')
        if(imageSketch===null) return setResError('Please upload face mapping sketch image')
        if(imagePhoto===null) return setResError('Please upload a photo')



        setIsLoading(true)

    try {

        let allData = new FormData();

        allData.append('tunnel', data.tunnel);
        allData.append('date', data.date);
        allData.append('advanceName', data.advanceName);
        allData.append('advanceLocationFrom', data.advanceLocationFrom);
        allData.append('advanceLocationTo', data.advanceLocationTo);
        allData.append('depthCover', data.depthCover);
        allData.append('driveDirection', data.driveDirection);
        allData.append('excavated', data.excavated);
        allData.append('overbreak', data.overbreak);
        allData.append('underbreak', data.underbreak);
        allData.append('excavationSection', data.excavationSection);
        allData.append('excavationMethod', data.excavationMethod);
        allData.append('ressNo', data.ressNo);

        allData.append('facemappingSketchImg', imageSketch);
        allData.append('water', data.water);
        allData.append('lPerMinPerM', data.place);
        allData.append('geologicalStructures', data.topic);
        

        allData.append('setNo1', data.setNo1);
        allData.append('setNo2', data.setNo2);
        allData.append('setNo3', data.setNo3);
        allData.append('setNo4', data.setNo4);
        allData.append('setNo5', data.setNo5);
        allData.append('setNo6', data.setNo6);

        allData.append('type1', data.type1);
        allData.append('type2', data.type2);
        allData.append('type3', data.type3);
        allData.append('type4', data.type4);
        allData.append('type5', data.type5);
        allData.append('type6', data.type6);

        allData.append('dip1', data.dip1);
        allData.append('dip2', data.dip2);
        allData.append('dip3', data.dip3);
        allData.append('dip4', data.dip4);
        allData.append('dip5', data.dip5);
        allData.append('dip6', data.dip6);

        allData.append('dipDirection1', data.dipDirection1);
        allData.append('dipDirection2', data.dipDirection2);
        allData.append('dipDirection3', data.dipDirection3);
        allData.append('dipDirection4', data.dipDirection4);
        allData.append('dipDirection5', data.dipDirection5);
        allData.append('dipDirection6', data.dipDirection6);

        allData.append('roughness1', data.roughness1);
        allData.append('roughness2', data.roughness2);
        allData.append('roughness3', data.roughness3);
        allData.append('roughness4', data.roughness4);
        allData.append('roughness5', data.roughness5);
        allData.append('roughness6', data.roughness6);

        allData.append('infilling1', data.infilling1);
        allData.append('infilling2', data.infilling2);
        allData.append('infilling3', data.infilling3);
        allData.append('infilling4', data.infilling4);
        allData.append('infilling5', data.infilling5);
        allData.append('infilling6', data.infilling6);

        allData.append('weathering1', data.weathering1);
        allData.append('weathering2', data.weathering2);
        allData.append('weathering3', data.weathering3);
        allData.append('weathering4', data.weathering4);
        allData.append('weathering5', data.weathering5);
        allData.append('weathering6', data.weathering6);

        allData.append('spacing1', data.spacing1);
        allData.append('spacing2', data.spacing2);
        allData.append('spacing3', data.spacing3);
        allData.append('spacing4', data.spacing4);
        allData.append('spacing5', data.spacing5);
        allData.append('spacing6', data.spacing6);

        allData.append('aperture1', data.aperture1);
        allData.append('aperture2', data.aperture2);
        allData.append('aperture3', data.aperture3);
        allData.append('aperture4', data.aperture4);
        allData.append('aperture5', data.aperture5);
        allData.append('aperture6', data.aperture6);

        allData.append('persistence1', data.persistence1);
        allData.append('persistence2', data.persistence2);
        allData.append('persistence3', data.persistence3);
        allData.append('persistence4', data.persistence4);
        allData.append('persistence5', data.persistence5);
        allData.append('persistence6', data.persistence6);

        allData.append('remarks1', data.remarks1);
        allData.append('remarks2', data.remarks2);
        allData.append('remarks3', data.remarks3);
        allData.append('remarks4', data.remarks4);
        allData.append('remarks5', data.remarks5);
        allData.append('remarks6', data.remarks6);

        allData.append('strength', data.strength);
        allData.append('brightness', data.brightness);
        allData.append('tincture', data.tincture);
        allData.append('colour', data.colour);
        allData.append('texture', data.texture);
        allData.append('weather', data.weather);

        allData.append('grainSize', data.grainSize);
        allData.append('igneousRock', data.igneousRock);
        allData.append('otherRockType', data.otherRockType);
        allData.append('additionalDescription', data.additionalDescription);
        allData.append('notes', data.notes);
        allData.append('photos', imagePhoto);
        allData.append('qIndex', qIndex);
        allData.append('massQuality', massQuality);


        allData.append('rqd', qData.rqd);
        allData.append('jn', qData.jn);
        allData.append('jr', qData.jr);
        allData.append('ja', qData.ja);
        allData.append('jw', qData.jw);
        allData.append('srf', qData.srf);

        const createPost = await axios.post('https://geosystem.herokuapp.com/api/createPost', allData, config)
        console.log('createPost', createPost);

        if(createPost.data.status === 201) {
            setResSuccess(createPost.data.message)
        } else {
            setResError('Error happen')
        }


    } catch (error) {
        if (error.response) {
            setResError(error.response.data.error)
            setIsLoading(false)

        }
    }

        setIsLoading(false)


        
    }
  return (
    <>
        <div style = {{backgroundColor: '#F2F2F2', display: 'block', color: 'black', padding: '2%', cursor: 'context-menu' }}>
            <Link href="/"><img alt="logo" src={logo}/></Link>
            <div style={{ fontSize: '15px', fontWeight: 'bold', float: 'right', display: 'flex' }}>
            <Link href="/reports"><div>REPORTS</div></Link>
            <Link onClick={handleLogout} style={{marginRight: '30px', marginLeft: '20px'}}>LOGOUT</Link>
            </div>
        </div>
        <div style={{ color: 'white', margin: '5%' }}> 

            <Grid container spacing={2} style={{ borderBottom: '2px solid black' }}>
                <Grid xs={6} style = {{ paddingRight: '7%' }}>
                    <h2 style = {{ color: 'black' }}>BASIC DATA</h2>
                    <div style = {{display: 'block' }}>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Tunnel</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="tunnel"
                                value={data?.tunnel}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Date</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="date"
                                value={data?.date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div style = {{display: 'block' }}>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Advance Name</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="advanceName"
                                value={data?.advanceName}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', whiteSpace: 'nowrap', color: 'black', fontSize: '13px' }}>Advance Location</h6>
                            <h6 style = {{ marginRight: '15px', marginTop: '13px', color: 'black', fontSize: '13px' }}>From</h6>
                            <TextField
                                style = {{ width: '40%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="advanceLocationFrom"
                                value={data?.advanceLocationFrom}
                                onChange={handleChange}
                            />
                            <h6 style = {{  marginLeft: '10px', marginRight: '10px', marginTop: '13px', color: 'black', fontSize: '13px' }}>To</h6>
                            <TextField
                                style = {{ width: '40%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="advanceLocationTo"
                                value={data?.advanceLocationTo}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Depth of cover</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="depthCover"
                                value={data?.depthCover}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Drive Direction</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="driveDirection"
                                value={data?.driveDirection}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </Grid>
                {/* <Grid xs={0} style = {{ paddingRight: '7%' }}>
                <h2 style = {{ color: 'black' }}> </h2>

                    <div style = {{display: 'block' }}>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Advance Name</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="advanceName"
                                value={data?.advanceName}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', whiteSpace: 'nowrap', color: 'black', fontSize: '13px' }}>Advance Location</h6>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', color: 'black', fontSize: '13px' }}>From</h6>
                            <TextField
                                style = {{ width: '40%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="advanceLocationFrom"
                                value={data?.advanceLocationFrom}
                                onChange={handleChange}
                            />
                            <h6 style = {{  marginLeft: '10px', marginRight: '10px', marginTop: '13px', color: 'black', fontSize: '13px' }}>To</h6>
                            <TextField
                                style = {{ width: '40%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="advanceLocationTo"
                                value={data?.advanceLocationTo}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Depth of cover</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="depthCover"
                                value={data?.depthCover}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Drive Direction</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="driveDirection"
                                value={data?.driveDirection}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </Grid> */}
                <Grid xs={6}>
                    <h2 style = {{ color: 'black' }}>EXCAVATION</h2>
                        <div style = {{display: 'flex', marginBottom:'3%' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black' }}>Excavated</h6>
                            <TextField
                                style = {{width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="excavated"
                                value={data?.excavated}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black' }}>Overbreak</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="overbreak"
                                value={data?.overbreak}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black' }}>Underbreak</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="underbreak"
                                value={data?.underbreak}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black' }}>Excavation Section</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="excavationSection"
                                value={data?.excavationSection}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black' }}>Excavation Method</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="excavationMethod"
                                value={data?.excavationMethod}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black' }}>RESS no.</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                                name="ressNo"
                                value={data?.ressNo}
                                onChange={handleChange}
                            />
                        </div>
                </Grid>
            </Grid>

            <div style={{ borderBottom: '2px solid black' }}>
                <h2 style = {{ color: 'black' }}>Q SYSTEM</h2>
                <div style = {{display: 'flex', width: '50%', color: 'black' }}>
                    <div>
                        <h6 style = {{ marginBottom: '6px', fontSize: '13px' }}>RQD</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="rqd"
                            value={qData?.rqd}
                            onChange={handleChangeQ}
                        />
                    </div>
                    <div style={{ marginLeft: '3%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Jn</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="jn"
                            value={qData?.jn}
                            onChange={handleChangeQ}
                        />
                    </div>
                    <div style={{ marginLeft: '3%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Jr</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="jr"
                            value={qData?.jr}
                            onChange={handleChangeQ}
                        />
                    </div>
                    <div style={{ marginLeft: '3%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Ja</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="ja"
                            value={qData?.ja}
                            onChange={handleChangeQ}
                        />
                    </div>

                    <div style={{ marginLeft: '3%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Jw</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="jw"
                            value={qData?.jw}
                            onChange={handleChangeQ}
                        />
                    </div>
                    <div style={{ marginLeft: '3%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>SRF</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="srf"
                            value={qData?.srf}
                            onChange={handleChangeQ}
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', color: 'black', marginTop: '20px', marginBottom: '3%' }}>
                <Button onClick={handleCalculate} style={{ backgroundColor: 'black', marginRight: '20px' }} size="small" variant="contained">CALCULATE Q</Button>
                {qIndex !== null && 
                    <div style = {{ backgroundColor: '#F1F1F1', padding: '10px' }}>
                    <span style={{fontWeight: 'bold', padding: '20px'}}>Q INDEX= {qIndex}</span> | 
                    <span style={{ padding: '20px'}}>{massQuality}</span>
                </div>}
                </div>
            </div>

            <div style={{ borderBottom: '2px solid black' }}>
                <h2 style = {{ color: 'black' }}>FACEMAPPING SKETCH</h2>
                <Button
                    style = {{  marginBottom: '3%', color: 'black', backgroundColor: 'white', border: '1px dotted black', padding: '6%', width: '100%', fontSize: '12px' }}
                    variant="contained"
                    component="label"
                >
                <div style={{marginRight: '5px', marginBottom: '20px'}}>Upload Face Mapping Sketch</div>

                <input
                    style={{ marginBottom: '20px' }}
                    type="file"
                    // hidden
                    name="facemappingSketchImg"
                    onChange={handleImageSketch}
                />
                </Button>
            </div>

            <Grid container spacing={2} style={{ borderBottom: '2px solid black', marginTop: '20px' }}>
                <Grid xs={6} style = {{ paddingRight: '7%' }}>
                    <h2 style = {{ color: 'black' }}>ROCK MASS DESCRIPTION</h2>
                    <div style = {{display: 'block' }}>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '20%', color: 'black', fontSize: '13px' }}>Water</h6>
                            <TextField
                                style = {{ width: '80%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                rows={3}
                                name="water"
                                value={data?.water}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{ display: 'flex', marginBottom: '10%' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '20%', color: 'black', fontSize: '13px' }}>L/min/m</h6>
                            <TextField
                                style = {{ width: '80%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                rows={3}
                                name="lPerMinPerM"
                                value={data?.lPerMinPerM}
                                onChange={handleChange}                            
                            />
                        </div>
                    </div>
                </Grid>

                <Grid xs={6}>
                        <div style = {{display: 'flex', marginTop: '10%' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Geological Structures (dykes, veins, contacts, bedding, foliation, etc)</h6>
                            <TextField
                                style = {{width: '70%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                size="small"
                                rows={3}
                                name="geologicalStructures"
                                value={data?.geologicalStructures}
                                onChange={handleChange} 
                            />
                        </div>
                </Grid>
            </Grid>

            <div style={{ borderBottom: '2px solid black' }}>
                <h2 style = {{ color: 'black' }}>JOINTS</h2>

                <div style = {{display: 'flex', color: 'black' }}>
                    <div>
                        <h6 style = {{ marginBottom: '6px', fontSize: '13px' }}>Set no.</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="setNo1"
                            value={data?.setNo1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Type</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="type1"
                            value={data?.type1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Dip</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="dip1"
                            value={data?.dip1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Dip direction</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="dipDirection1"
                            value={data?.dipDirection1}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Roughness</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="roughness1"
                            value={data?.roughness1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Infilling</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="infilling1"
                            value={data?.infilling1}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Weathering</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="weathering1"
                            value={data?.weathering1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Spacing</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="spacing1"
                            value={data?.spacing1}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Aperture</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="aperture1"
                            value={data?.aperture1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Persistence</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="persistence1"
                            value={data?.persistence1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Remarks</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="remarks1"
                            value={data?.remarks1}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', color: 'black', marginTop: '1%' }}>
                    <div >
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="setNo2"
                            value={data?.setNo2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%',  }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="type2"
                            value={data?.type2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="dip2"
                            value={data?.dip2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="dipDirection2"
                            value={data?.dipDirection2}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="roughness2"
                            value={data?.roughness2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="infilling2"
                            value={data?.infilling2}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="weathering2"
                            value={data?.weathering2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="spacing2"
                            value={data?.spacing2}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="aperture2"
                            value={data?.aperture2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="persistence2"
                            value={data?.persistence2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="remarks2"
                            value={data?.remarks2}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', color: 'black', marginTop: '1%' }}>
                    <div>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="setNo3"
                            value={data?.setNo3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="type3"
                            value={data?.type3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="dip3"
                            value={data?.dip3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="dipDirection3"
                            value={data?.dipDirection3}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="roughness3"
                            value={data?.roughness3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="infilling3"
                            value={data?.infilling3}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="weathering3"
                            value={data?.weathering3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="spacing3"
                            value={data?.spacing3}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="aperture3"
                            value={data?.aperture3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="persistence3"
                            value={data?.persistence3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="remarks3"
                            value={data?.remarks3}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', color: 'black', marginTop: '1%' }}>
                    <div>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="setNo4"
                            value={data?.setNo4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="type4"
                            value={data?.type4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="dip4"
                            value={data?.dip4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="dipDirection4"
                            value={data?.dipDirection4}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="roughness4"
                            value={data?.roughness4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="infilling4"
                            value={data?.infilling4}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="weathering4"
                            value={data?.weathering4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="spacing4"
                            value={data?.spacing4}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="aperture4"
                            value={data?.aperture4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="persistence4"
                            value={data?.persistence4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="remarks4"
                            value={data?.remarks4}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', color: 'black', marginTop: '1%' }}>
                    <div>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="setNo5"
                            value={data?.setNo5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="type5"
                            value={data?.type5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="dip5"
                            value={data?.dip5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="dipDirection5"
                            value={data?.dipDirection5}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="roughness5"
                            value={data?.roughness5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="infilling5"
                            value={data?.infilling5}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="weathering5"
                            value={data?.weathering5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="spacing5"
                            value={data?.spacing5}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="aperture5"
                            value={data?.aperture5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="persistence5"
                            value={data?.persistence5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="remarks5"
                            value={data?.remarks5}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', color: 'black', marginTop: '1%', marginBottom: '5%' }}>
                    <div>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="setNo6"
                            value={data?.setNo6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="type6"
                            value={data?.type6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="dip6"
                            value={data?.dip6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="dipDirection6"
                            value={data?.dipDirection6}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="roughness6"
                            value={data?.roughness6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="infilling6"
                            value={data?.infilling6}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="weathering6"
                            value={data?.weathering6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="spacing6"
                            value={data?.spacing6}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="aperture6"
                            value={data?.aperture6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="persistence6"
                            value={data?.persistence6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                            name="remarks6"
                            value={data?.remarks6}
                            onChange={handleChange}
                        />
                    </div>
                </div>

            </div>

            <Grid container spacing={2} style={{ borderBottom: '2px solid black', marginTop: '20px' }}>
                <Grid xs={6} style = {{ paddingRight: '7%' }}>
                    <h2 style = {{ color: 'black' }}>LITHOLOGY DESCRIPTION</h2>
                    <div style = {{display: 'block' }}>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '20%', color: 'black', fontSize: '13px' }}>Strength</h6>
                            <TextField
                                style = {{ width: '80%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                rows={3}
                                name="strength"
                                value={data?.strength}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{ display: 'flex', marginBottom: '10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '20%', color: 'black', fontSize: '13px' }}>Brightness</h6>
                            <TextField
                                style = {{ width: '80%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                rows={3} 
                                name="brightness"
                                value={data?.brightness}
                                onChange={handleChange}                           
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '20%', color: 'black', fontSize: '13px' }}>Tincture</h6>
                            <TextField
                                style = {{ width: '80%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                rows={3}
                                name="tincture"
                                value={data?.tincture}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{ display: 'flex', marginBottom: '10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '20%', color: 'black', fontSize: '13px' }}>Colour</h6>
                            <TextField
                                style = {{ width: '80%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                rows={3} 
                                name="colour"
                                value={data?.colour}
                                onChange={handleChange}                           
                            />
                        </div>                        
                        <div style = {{display: 'flex', marginBottom: '10%' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '20%', color: 'black', fontSize: '13px' }}>Texture</h6>
                            <TextField
                                style = {{ width: '80%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                rows={3}
                                name="texture"
                                value={data?.texture}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </Grid>

                <Grid xs={6} style={{ marginTop: '5%'}}>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Weathering</h6>
                            <TextField
                                style = {{width: '70%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                size="small"
                                rows={3} 
                                name="weather"
                                value={data?.weather}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Grain Size</h6>
                            <TextField
                                style = {{width: '70%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                size="small"
                                rows={3} 
                                name="grainSize"
                                value={data?.grainSize}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Igneous Rock</h6>
                            <TextField
                                style = {{width: '70%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                size="small"
                                rows={3} 
                                name="igneousRock"
                                value={data?.igneousRock}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Other Rock Type</h6>
                            <TextField
                                style = {{width: '70%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                size="small"
                                rows={3} 
                                name="otherRockType"
                                value={data?.otherRockType}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Additional Description</h6>
                            <TextField
                                style = {{width: '70%' }}
                                id="standard-multiline-static"
                                multiline
                                label="Type"
                                size="small"
                                rows={3} 
                                name="additionalDescription"
                                value={data?.additionalDescription}
                                onChange={handleChange}
                            />
                        </div>
                </Grid>
            </Grid>

            <div style={{ borderBottom: '2px solid black', marginTop: '5%' }}>
                <h2 style = {{ color: 'black' }}>NOTES</h2>
                <div style = {{display: 'flex', marginBottom:'5%' }}>
                    <TextField
                        style = {{ width: '50%' }}
                        id="standard-multiline-static"
                        multiline
                        label="Type notes"
                        rows={5}
                        name="notes"
                        value={data?.notes}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div style={{ borderBottom: '2px solid black' }}>
                <h2 style = {{ color: 'black' }}>PHOTOS</h2>
                <Button
                    style = {{  marginBottom: '3%', color: 'black', backgroundColor: 'white', border: '1px dotted black', padding: '6%', width: '100%', fontSize: '12px', display: 'flex' }}
                    variant="contained"
                    component="label"
                >
                <div style={{marginRight: '5px', marginBottom: '20px'}}>Upload photos</div>
                <input
                    style={{ marginBottom: '20px' }}
                    type="file"
                    // hidden
                    name="photos"
                    onChange={handleImagePhoto}
                />
                </Button>
            </div>
            {resError !== null &&<Alert style={{ marginTop: '10px', width: '50%', marginLeft: '22%'}} severity="error">{resError}</Alert>}
            {resSuccess !== null &&<Alert style={{ marginTop: '10px', width: '50%', marginLeft: '22%'}} severity="success">{resSuccess}</Alert>}


            <Button onClick={handleSubmit} style={{ backgroundColor: 'black', marginTop: '20px', width: '100px', fontSize: '13px' }} size="small" variant="contained">SAVE</Button>
        </div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    </>

  );
}
export default Post;

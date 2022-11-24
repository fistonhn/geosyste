import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
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
    const [qData, setQdata] = useState({ rqd: undefined, jn: undefined, jr: undefined, ja: undefined, jw: undefined, srf: undefined })
    const [data, setData] = useState(null)

    const [resError, setResError] = useState(null)
    const [resSuccess, setResSuccess] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const [imageSketch, setImageSketch] = useState(null)
    const [imagePhoto, setImagePhoto] = useState([])


    const [qIndex, setQindex] = useState(undefined)
    const [massQuality, setMassQuality] = useState(undefined)

    const [supporting, setSupporting] = React.useState(' ');

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

    const handleImagePhoto = (e) => { setImagePhoto([...imagePhoto, e.target.files[0]]) }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(data===null) return setResError('Please fill at least one field')
        if(imageSketch===null) return setResError('Please upload face mapping sketch image')
        if(imagePhoto===null) return setResError('Please upload a photo')

        setIsLoading(true)

    try {
        let allData = new FormData();

        for(let i = 0; i < imagePhoto.length; i++ ){
            allData.append("photos", imagePhoto[i]);
        }

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
        // allData.append('photos', imagePhoto);
        allData.append('qIndex', qIndex);
        allData.append('massQuality', massQuality);


        allData.append('rqd', qData.rqd);
        allData.append('jn', qData.jn);
        allData.append('jr', qData.jr);
        allData.append('ja', qData.ja);
        allData.append('jw', qData.jw);
        allData.append('srf', qData.srf);
        allData.append('supporting', supporting);

        // const createPost = await axios.post('https://geosystem.herokuapp.com/api/createPost', allData, config)
        const createPost = await axios.post('http://localhost:7000/api/createPost', allData, config)

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

    const handleSupporting = (event) => {
        setSupporting(event.target.value);

        console.log('supporting', supporting)
      };
  return (
    <div style={{fontFamily: 'Open Sans', fontStyle: 'normal', fontWeight: 400, fontSize: '14px', lineHeight: '48px'}}>
        <div style = {{backgroundColor: '#F2F2F2', display: 'block', padding: '2%', cursor: 'context-menu' }}>
            <Link href="/"><img alt="logo" src={logo}/></Link>

            <div style={{ fontSize: '15px', fontWeight: 'bold', float: 'right', display: 'flex' }}>
                <Link href="/reports"> <div>REPORTS</div> </Link>
                <Link onClick={handleLogout} style={{marginRight: '30px', marginLeft: '20px'}}>LOGOUT</Link>
            </div>
        </div>
        <div style={{ color: 'white', margin: '5%' }}> 
            <Grid container spacing={2} className="sec" style={{ marginLeft: '5px' }}>
                <Grid xs={4} className="basicData">
                  <h2>BASIC DATA</h2>
                    <label for="tunnel">Tunnel</label>
                    <input type="text"  placeholder='Type' onChange={handleChange} name="tunnel" value={data?.tunnel}/> <br/>

                    <label for="date">Date</label>
                    <input type="text"  placeholder='Type' onChange={handleChange} name="date" value={data?.date}/> <br/>

                    <label for="excavationSection">Excavation Section</label>
                    <input type="text"  placeholder='Type' onChange={handleChange} name="excavationSection" value={data?.excavationSection}/> <br/>

                    <label for="v">Excavation Method</label>
                    <input type="text"  placeholder='Type' onChange={handleChange} name="excavationMethod" value={data?.excavationMethod}/> <br/>

                    <label for="ressNo">RESS no.</label>
                    <input type="text"  placeholder='Type' onChange={handleChange} name="ressNo" value={data?.ressNo}/> <br/>
                </Grid>
                <Grid xs={4} className="basicData1">
                        <label for="advanceName">Advance Name</label>
                        <input type="text"  placeholder='Type' onChange={handleChange} name="advanceName" value={data?.advanceName}/> <br/>

                        <div className="advanceLocation">
                            <label>Advance Location From</label>

                            <input className='advanceLocationFrom' type="text"  placeholder='Type' onChange={handleChange} name="advanceLocationFrom" value={data?.advanceLocationFrom}/> <br/>

                            <label className='advanceLocationTo' for="advanceLocationTo">To</label>
                            <input type="text"  placeholder='Type' onChange={handleChange} name="advanceLocationTo" value={data?.advanceLocationTo}/> <br/>
                        </div>

                        <label for="depthCover">Depth of Cover</label>
                        <input type="text"  placeholder='Type' onChange={handleChange} name="depthCover" value={data?.depthCover}/> <br/>

                        <label for="driveDirection">Drive Direction</label>
                        <input type="text"  placeholder='Type' onChange={handleChange} name="driveDirection" value={data?.driveDirection}/> <br/>
                </Grid>
                <Grid xs={4} className="basicData2">
                    <h2>EXCAVATION</h2>
                        <label for="excavated">Excavated</label>
                        <input type="text"  placeholder='Type' onChange={handleChange} name="excavated" value={data?.excavated}/> <br/>

                        <label for="overbreak">Overbreak</label>
                        <input type="text"  placeholder='Type' onChange={handleChange} name="overbreak" value={data?.overbreak}/> <br/>

                        <label for="underbreak">Underbreak</label>
                        <input type="text"  placeholder='Type' onChange={handleChange} name="underbreak" value={data?.underbreak}/> <br/>
                </Grid>
            </Grid>

            <div className="sec">
                <h2>Q SYSTEM</h2>
                <div style = {{ display: 'flex'}}>
                    <div className='qSystem' style = {{width: '60%'}}>
                        <div style = {{display: 'flex', width: '50%' }}>
                            <div>
                                <label>RQD</label>
                                <input type="text"  placeholder='Type' onChange={handleChangeQ} name="rqd" value={qData?.rqd}/> <br/>
                            </div>
                            <div>
                                <label>Jn</label>
                                <input type="text"  placeholder='Type' onChange={handleChangeQ} name="jn" value={qData?.jn}/> <br/>
                            </div>
                            <div>
                                <label>Jr</label>
                                <input type="text"  placeholder='Type' onChange={handleChangeQ} name="jr" value={qData?.jr}/> <br/>
                            </div>
                            <div>
                                <label>Ja</label>
                                <input type="text"  placeholder='Type' onChange={handleChangeQ} name="ja" value={qData?.ja}/> <br/>
                            </div>
                            <div>
                                <label>Jw</label>
                                <input type="text"  placeholder='Type' onChange={handleChangeQ} name="jw" value={qData?.jw}/> <br/>
                            </div>
                            <div>
                                <label>SRF</label>
                                <input type="text"  placeholder='Type' onChange={handleChangeQ} name="srf" value={qData?.srf}/> <br/>
                            </div>
                        </div>

                        <div style = {{display: 'flex', marginTop: '20px', marginBottom: '3%', marginLeft: '15px' }}>
                            <Button onClick={handleCalculate} style={{ backgroundColor: 'black', marginRight: '20px' }} size="small" variant="contained">CALCULATE Q</Button>
                            {qIndex !== undefined && 
                            <div style = {{ backgroundColor: '#F1F1F1', color: 'black' }}>
                                <span style={{fontWeight: 'bold', padding: '20px'}}>Q INDEX= {qIndex}</span> | 
                                <span style={{ padding: '20px'}}>{massQuality}</span>
                            </div>
                            }
                        </div>
                    </div>
                    <div style = {{color: 'black', marginTop: '-70px'}}>
                        <h4>SUPPORTING</h4>
                        <div style={{marginBottom: '-5px', marginTop: '-15px'}}>Support type</div>
                        <select name="cars" id="cars" onChange={handleSupporting} style={{ padding: '8px 120px 8px 0px', borderColor: '#CECECE', color: '#666666' }}>
                            <option style={{ padding: '10px' }} value="Select support type">Select support type</option>
                            <option value="Support Type RT-1">Support Type RT-1</option>
                            <option value="Support Type RT-2B">Support Type RT-2B</option>
                            <option value="Support Type RT-3B">Support Type RT-3B</option>
                            <option value="Support Type RT-4B">Support Type RT-4B</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='imagePlace sec'>

                <h2 >FACEMAPPING SKETCH</h2>
                <Button style = {{  backgroundColor: 'white', border: '1px dotted black', padding: '6%', width: '100%', fontSize: '12px' }}>

                <div style={{marginRight: '5px', marginBottom: '20px'}}>Upload Face Mapping Sketch</div>
                <input
                    type="file"
                    // hidden
                    name="facemappingSketchImg"
                    onChange={handleImageSketch}
                    id="choose-fileccc"
                    value={data?.facemappingSketchImg}
                />
                </Button>
            </div>

            <Grid container spacing={2} style={{ marginLeft: '5px' }} className="sec">
                <Grid xs={6}>
                    <h2>ROCK MASS DESCRIPTION</h2>
                    <div style = {{display: 'block' }}>
                        
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <label for="water">Water</label>
                            <textarea  rows="4" cols="50" placeholder='Type' onChange={handleChange} name="water" value={data?.water}/> <br/>
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <label for="lPerMinPerM">L/min/m</label>
                            <textarea  rows="4" cols="50" placeholder='Type' onChange={handleChange} name="lPerMinPerM" value={data?.lPerMinPerM}/> <br/>
                        </div>
                    </div>
                </Grid>

                <Grid xs={6}>
                    <div style = {{ display: 'flex', marginTop: '5%' }}>
                        <label for="geologicalStructures">Geological Structures </label>
                        <textarea style ={{marginLeft: '100px'}}  rows="4" cols="50" placeholder='Type' onChange={handleChange} name="geologicalStructures" value={data?.geologicalStructures}/> <br/>
                    </div>
                </Grid>
            </Grid>

            <div className="joint sec">
                <h2>JOINTS</h2>

                <div style = {{display: 'flex' }}>
                    <div>
                        <label>Set no.</label>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="setNo1"
                            value={data?.setNo1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <label>Type</label>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="type1"
                            value={data?.type1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <label>Dip</label>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="dip1"
                            value={data?.dip1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <label>Dip direction</label>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="dipDirection1"
                            value={data?.dipDirection1}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <label>Roughness</label>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="roughness1"
                            value={data?.roughness1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <label>Infilling</label>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="infilling1"
                            value={data?.infilling1}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <label>Weathering</label>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="weathering1"
                            value={data?.weathering1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <label>Spacing</label>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="spacing1"
                            value={data?.spacing1}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <label>Aperture</label>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="aperture1"
                            value={data?.aperture1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <label>Persistence</label>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="persistence1"
                            value={data?.persistence1}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <label>Remarks</label>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="remarks1"
                            value={data?.remarks1}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', marginTop: '1%' }}>
                    <div >
                        <input
                            type="text"  
                            placeholder='Type'
                            name="setNo2"
                            value={data?.setNo2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%',  }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="type2"
                            value={data?.type2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="dip2"
                            value={data?.dip2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="dipDirection2"
                            value={data?.dipDirection2}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="roughness2"
                            value={data?.roughness2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="infilling2"
                            value={data?.infilling2}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="weathering2"
                            value={data?.weathering2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="spacing2"
                            value={data?.spacing2}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="aperture2"
                            value={data?.aperture2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="persistence2"
                            value={data?.persistence2}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="remarks2"
                            value={data?.remarks2}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', marginTop: '1%' }}>
                    <div>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="setNo3"
                            value={data?.setNo3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="type3"
                            value={data?.type3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="dip3"
                            value={data?.dip3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="dipDirection3"
                            value={data?.dipDirection3}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="roughness3"
                            value={data?.roughness3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="infilling3"
                            value={data?.infilling3}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="weathering3"
                            value={data?.weathering3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="spacing3"
                            value={data?.spacing3}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="aperture3"
                            value={data?.aperture3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="persistence3"
                            value={data?.persistence3}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="remarks3"
                            value={data?.remarks3}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', marginTop: '1%' }}>
                    <div>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="setNo4"
                            value={data?.setNo4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="type4"
                            value={data?.type4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="dip4"
                            value={data?.dip4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="dipDirection4"
                            value={data?.dipDirection4}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="roughness4"
                            value={data?.roughness4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="infilling4"
                            value={data?.infilling4}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="weathering4"
                            value={data?.weathering4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="spacing4"
                            value={data?.spacing4}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="aperture4"
                            value={data?.aperture4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="persistence4"
                            value={data?.persistence4}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="remarks4"
                            value={data?.remarks4}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', marginTop: '1%' }}>
                    <div>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="setNo5"
                            value={data?.setNo5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="type5"
                            value={data?.type5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="dip5"
                            value={data?.dip5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="dipDirection5"
                            value={data?.dipDirection5}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="roughness5"
                            value={data?.roughness5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="infilling5"
                            value={data?.infilling5}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="weathering5"
                            value={data?.weathering5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="spacing5"
                            value={data?.spacing5}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="aperture5"
                            value={data?.aperture5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="persistence5"
                            value={data?.persistence5}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="remarks5"
                            value={data?.remarks5}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', marginTop: '1%', marginBottom: '5%' }}>
                    <div>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="setNo6"
                            value={data?.setNo6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="type6"
                            value={data?.type6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="dip6"
                            value={data?.dip6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="dipDirection6"
                            value={data?.dipDirection6}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="roughness6"
                            value={data?.roughness6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="infilling6"
                            value={data?.infilling6}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="weathering6"
                            value={data?.weathering6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="spacing6"
                            value={data?.spacing6}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="aperture6"
                            value={data?.aperture6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="persistence6"
                            value={data?.persistence6}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <input
                            type="text"  
                            placeholder='Type'
                            name="remarks6"
                            value={data?.remarks6}
                            onChange={handleChange}
                        />
                    </div>
                </div>

            </div>

            <Grid container spacing={2} className="rithology sec" style={{ marginLeft: '5px' }} >
                <Grid xs={6}>
                    <h2>LITHOLOGY DESCRIPTION</h2>
                    <div style = {{display: 'block' }}>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <label style = {{ marginRight: '10px', marginTop: '13px', width: '20%', fontSize: '14px', weight: 400, color: '#333333' }}>Strength</label>
                            <textarea  
                                rows="3" 
                                cols="50"
                                name="strength"
                                value={data?.strength}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{ display: 'flex', marginBottom: '10px' }}>
                            <label style = {{ marginRight: '10px', marginTop: '13px', width: '20%', fontSize: '14px', weight: 400, color: '#333333' }}>Brightness</label>
                             <textarea  
                                rows="3" 
                                cols="50"
                                name="brightness"
                                value={data?.brightness}
                                onChange={handleChange}                           
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <label style = {{ marginRight: '10px', marginTop: '13px', width: '20%', fontSize: '14px', weight: 400, color: '#333333' }}>Tincture</label>
                             <textarea  
                                rows="3" 
                                cols="50"
                                name="tincture"
                                value={data?.tincture}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{ display: 'flex', marginBottom: '10px' }}>
                            <label style = {{ marginRight: '10px', marginTop: '13px', width: '20%', fontSize: '14px', weight: 400, color: '#333333' }}>Colour</label>
                             <textarea  
                                rows="3" 
                                cols="50"
                                name="colour"
                                value={data?.colour}
                                onChange={handleChange}                           
                            />
                        </div>                        
                        <div style = {{display: 'flex', marginBottom: '10%' }}>
                            <label style = {{ marginRight: '10px', marginTop: '13px', width: '20%', fontSize: '14px', weight: 400, color: '#333333' }}>Texture</label>
                             <textarea  
                                rows="3" 
                                cols="50"
                                name="texture"
                                value={data?.texture}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} style={{ marginTop: '5%'}}>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <label style = {{ marginRight: '10px', marginTop: '13px', width: '30%', fontSize: '14px', weight: 400, color: '#333333' }}>Weathering</label>
                            <textarea  
                                rows="3" 
                                cols="50"
                                name="weather"
                                value={data?.weather}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <label style = {{ marginRight: '10px', marginTop: '13px', width: '30%', fontSize: '14px', weight: 400, color: '#333333' }}>Grain Size</label>
                            <textarea  
                                rows="3" 
                                cols="50"
                                name="grainSize"
                                value={data?.grainSize}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <label style = {{ marginRight: '10px', marginTop: '13px', width: '30%', fontSize: '14px', weight: 400, color: '#333333' }}>Igneous Rock</label>
                            <textarea  
                                rows="3" 
                                cols="50"
                                name="igneousRock"
                                value={data?.igneousRock}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <label style = {{ marginRight: '10px', marginTop: '13px', width: '30%', fontSize: '14px', weight: 400, color: '#333333' }}>Other Rock Type</label>
                            <textarea  
                                rows="3" 
                                cols="50"
                                name="otherRockType"
                                value={data?.otherRockType}
                                onChange={handleChange}
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <label style = {{ marginRight: '10px', marginTop: '13px', width: '30%', fontSize: '14px', weight: 400, color: '#333333' }}>Additional Description</label>
                            <textarea  
                                rows="3" 
                                cols="50"
                                name="additionalDescription"
                                value={data?.additionalDescription}
                                onChange={handleChange}
                            />
                        </div>
                </Grid>
            </Grid>

            <div className="sec">
                <h2>NOTES</h2>
                <div style = {{display: 'flex', marginBottom:'5%' }}>
                    <textarea  
                        rows="8" 
                        cols="80"
                        name="notes"
                        value={data?.notes}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className='imagePlace sec'>
                <h2>PHOTOS</h2>
                <Button style = {{  marginBottom: '3%', backgroundColor: 'white', border: '1px dotted black', padding: '6%', width: '100%', fontSize: '12px', display: 'flex', color: 'black' }}>
                <div style={{marginRight: '5px', marginBottom: '20px'}}>Upload photos</div>

                    <input
                        type="file"
                        name="photos"
                        multiple="multiple"
                        onChange={handleImagePhoto}
                        // style={{display:'none'}}
                    />
                    <di style={{textAlign: 'left', marginLeft: '10px'}}>
                        {imagePhoto.map((photo)=>(
                            <li>{photo.name}</li>
                        ))}
                    </di>
                </Button>
            </div>

            {resError !== null &&<Alert style={{ marginTop: '10px', width: '50%', marginLeft: '22%'}} severity="error">{resError}</Alert>}
            {resSuccess !== null &&<Alert style={{ marginTop: '10px', width: '50%', marginLeft: '22%'}} severity="success">{resSuccess}</Alert>}


            <Button onClick={handleSubmit} style={{ backgroundColor: 'black', marginTop: '20px', width: '100px', fontSize: '14px', weight: 400, color: 'white' }} size="small" variant="contained">SAVE</Button>
        </div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    </div>

  );
}
export default Post;

import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from '../../assets/logo.png';
import Link from '@mui/material/Link';

const Post = () => {
    const [qData, setQdata] = useState({ rqd: null, jn: null, jr: null, ja: null, jw: null, srf: null })
    const [qIndex, setQindex] = useState(null)
    const [massQuality, setMassQuality] = useState(null)

    const handleChange = (event) => {
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


    }
  return (
    <>
        <div style = {{backgroundColor: '#F2F2F2', display: 'block', color: 'black', padding: '2%', cursor: 'context-menu' }}>
            <Link href="/"><img alt="logo" src={logo}/></Link>
            <div style={{ fontSize: '15px', fontWeight: 'bold', float: 'right', display: 'flex' }}>
            <Link href="/reports"><div>REPORTS</div></Link>
            <Link href="/"><div style={{marginRight: '30px', marginLeft: '20px'}}>LOGOUT</div></Link>
            </div>
        </div>
        <div style={{ color: 'white', margin: '5%' }}> 

            <Grid container spacing={2} style={{ borderBottom: '2px solid black' }}>
                <Grid xs={4} style = {{ paddingRight: '7%' }}>
                    <h2 style = {{ color: 'black' }}>BASIC DATA</h2>
                    <div style = {{display: 'block' }}>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Tunnel</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Date</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                            />
                        </div>
                    </div>
                </Grid>
                <Grid xs={4} style = {{ paddingRight: '7%' }}>
                    <div style = {{display: 'block' }}>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Advance Name</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
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
                            />
                            <h6 style = {{  marginLeft: '10px', marginRight: '10px', marginTop: '13px', color: 'black', fontSize: '13px' }}>To</h6>
                            <TextField
                                style = {{ width: '40%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                            />
                        </div>
                        <div style = {{display: 'flex', marginBottom:'10px' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Depth of cover</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black', fontSize: '13px' }}>Drive Direction</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                            />
                        </div>
                    </div>
                </Grid>
                <Grid xs={4}>
                    <h2 style = {{ color: 'black' }}>EXCAVATION</h2>
                        <div style = {{display: 'flex', marginBottom:'3%' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black' }}>Excavated</h6>
                            <TextField
                                style = {{width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black' }}>Overbreak</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black' }}>Underbreak</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black' }}>Excavation Section</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black' }}>Excavation Method</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
                            />
                        </div>
                        <div style = {{display: 'flex' }}>
                            <h6 style = {{ marginRight: '10px', marginTop: '13px', width: '30%', color: 'black' }}>RESS no.</h6>
                            <TextField
                                style = {{ width: '70%' }}
                                id="demo-helper-text-aligned"
                                label="Type"
                                size="small"
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                Upload Face Mapping Sketch
                <input
                    style={{ marginBottom: '20px' }}
                    type="file"
                    hidden
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
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Type</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Dip</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Dip direction</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Roughness</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Infilling</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Weathering</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Spacing</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Aperture</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Persistence</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <h6 style = {{ marginBottom: '6px', color: 'black', fontSize: '13px' }}>Remarks</h6>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', color: 'black', marginTop: '1%' }}>
                    <div>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', color: 'black', marginTop: '1%' }}>
                    <div>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', color: 'black', marginTop: '1%' }}>
                    <div>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', color: 'black', marginTop: '1%' }}>
                    <div>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                </div>

                <div style = {{display: 'flex', color: 'black', marginTop: '1%', marginBottom: '5%' }}>
                    <div>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>

                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
                        />
                    </div>
                    <div style={{ marginLeft: '1%' }}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label="Type"
                            size="small"
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
                    />
                </div>
            </div>

            <div style={{ borderBottom: '2px solid black' }}>
                <h2 style = {{ color: 'black' }}>PHOTOS</h2>
                <Button
                    style = {{  marginBottom: '3%', color: 'black', backgroundColor: 'white', border: '1px dotted black', padding: '6%', width: '100%', fontSize: '12px' }}
                    variant="contained"
                    component="label"
                >
                Upload photos
                <input
                    style={{ marginBottom: '20px' }}
                    type="file"
                    hidden
                />
                </Button>
            </div>

            <Button style={{ backgroundColor: 'black', marginTop: '20px', width: '100px', fontSize: '13px' }} size="small" variant="contained">SAVE</Button>
        </div>
    </>

  );
}
export default Post;

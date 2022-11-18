import React, { useState, useEffect } from 'react'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import logo from '../../assets/logo.png';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function Login() {
    const [data, setData] = useState({ username: null, password: null })

    const [resError, setResError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setResError(null)
        }, 4000)
        return () => clearTimeout(timer)
      })


    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        if(data?.username !== null && data?.password !== null) {
            try {
                    const newData = {
                        username: data?.username,
                        password: data?.password,
                    }
                    const response = await axios.post('https://geosystem.herokuapp.com/api/login', newData)

                    setIsLoading(false)
                    
                    if(response.status===201) {
                        localStorage.setItem('token', response.data.token)
                        window.location.href = "./post";
                    }

                } catch (error) {
                    if (error.response) {
                        setResError(error.response.data.error)
                        setIsLoading(false)

                    }
                }
        } else{
            setResError('Please enter username and password!')
            setIsLoading(false)
        }
    }

  return (
    <div>
        <img alt="logo" style={{ padding: '1%'}} src={logo}/>

        <div style={{ color: 'white', margin: '5%', textAlign: 'center', padding: '10%' }}> 
             {resError !== null &&<Alert style={{ marginTop: '10px', width: '50%', marginLeft: '22%'}} severity="error">{resError}</Alert>}

            <h4 style = {{ color: 'black', marginLeft: '-15%' }}>Face Mapping Report</h4>
            <div style = {{display: 'block', width: '30%', marginLeft: 'auto', marginRight: 'auto' }}>
                <div style = {{display: 'flex', marginBottom:'-10px' }}>
                    <h6 style = {{ marginRight: '5px', marginTop: '13px', color: 'black', fontSize: '13px' }}>Username</h6>
                    <TextField
                        id="demo-helper-text-aligned"
                        label="Type"
                        size="small"
                        name="username"
                        value={data?.username}
                        onChange={handleChange}
                    />
                </div>
                <div style = {{display: 'flex' }}>
                    <h6 style = {{ marginRight: '10px', marginTop: '13px', color: 'black', fontSize: '13px' }}>Password</h6>
                    <TextField
                        id="demo-helper-text-aligned"
                        label="Type"
                        size="small"
                        name="password"
                        value={data?.password}
                        onChange={handleChange}
                    />
                </div>
            </div>
              <Button onClick={handleSubmit} style={{ backgroundColor: 'black', marginTop: '-10px', width: '100px', fontSize: '13px', marginLeft: '-50px' }} size="small" variant="contained">Login</Button>

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
export default Login;

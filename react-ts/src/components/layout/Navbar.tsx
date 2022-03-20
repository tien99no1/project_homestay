import { AppBar, Button, TextField, Toolbar, Typography } from '@mui/material'
import { Box, height } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'
import { Outlet, Link } from 'react-router-dom'

import '../../css/Navbar.css'  
import styled from '@emotion/styled'

function Navbar() {
    const CustomTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: '#959392',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#959392',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#FFF',
            },
            '&:hover fieldset': {
              borderColor: '#FFF',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFF',
            },
        },
      });
      
  return (
    <AppBar position='sticky'color='inherit' >
        <Toolbar>
            <Box className='appBar' width = {1}>
                <Box className='nav-left' display={'flex'}>
                    <Link to='/' className='brand'>RikStay</Link>
                    <Box className='box-search'>
                    <CustomTextField
                    label="Tìm kiếm"
                    id="outlined-size-small"
                    size="small"
                    />
                    <Button className='btn-search' variant="outlined"><SearchIcon style={{margin: 0, color: '#fff'}}/></Button>
                    </Box>

                </Box>
                <Box>
                    <ul className='nav-right'>
                        <li className='nav-items'>
                            <Link to='/Guide'>Guide</Link>
                        </li>
                        <li className='nav-items'>
                           <Link to='/Host'>Host</Link>
                        </li>
                        <li className='nav-items'>
                            <Link to= '/SignIn'>Đăng ký</Link>
                        </li>
                        <li className='nav-items'>
                          <Link to='/Login'>Đăng nhập</Link>
                        </li>
                    </ul>
                </Box>
            </Box>
        </Toolbar>
    </AppBar>

  )
}

export default Navbar
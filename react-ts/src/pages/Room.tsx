import { Box, Container } from '@mui/material'
import React from 'react'
import BannerRoom from '../components/BannerRoom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';

function Room() {
  return (
    <>
    <Box><BannerRoom/></Box>
    <Container maxWidth='lg'>
      <Box  sx={{background:'#f0f0f0'}}>
        <Box className='room-left'>
          <Box>
            <p>Rikstay</p>
            <p>Vietnam</p>
            <p>Ha Noi</p>
            <p>Tay Ho</p>
          </Box>
          <Box>
            <h2>Hanoi Home 3 - Beautiful apartment</h2>
            <p><LocationOnIcon/> <b>Tây Hồ, Hà Nội, Việt Nam</b></p>
          </Box>

        </Box>
        <Box className='room-right'> </Box>
      </Box>
    </Container>
    </>
  )
}

export default Room
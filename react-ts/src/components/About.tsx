import React from 'react'
import {Box, Grid} from '@mui/material'

function About() {
  return (
    <Box sx={{ width: '100%' }}>
    <Grid container justifyContent={'space-around'} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item sm={6} md={2} xs={12}>
          <Box className='ABout'>
              <h2>RIKSTAY</h2>

          </Box>
      </Grid>
      <Grid item sm={6} md={2} xs={12}>
          <Box className='About'>
              <h5>Top homestay được yêu thích</h5>
          </Box>
      </Grid>
      
      <Grid item sm={6} md={2} xs={12}>
          <Box className='About'>
              <h5>Không gian ưa thích</h5>
          </Box>
      </Grid>
      <Grid item sm={6} md={2} xs={12}>
          <Box className='About'>
              <h5>Về chúng tôi</h5>
          </Box>
      </Grid>
      <Grid item sm={6} md={2} xs={12}>
          <Box className='About'>
              <h5>Tải ứng dụng RikStay</h5>
          </Box>
      </Grid>
    </Grid>
  </Box>
  )
}

export default About
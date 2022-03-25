import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

export default function BasicDateRangePicker() {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const minValue: Date = new Date(new Date());
  const maxValue: Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 90);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Check-in"
        endText="Check-out"
        minDate={minValue}
        maxDate={maxValue}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <Box className='input-date'>
            <TextField
            sx={{
                height: '1rem',
                width: '35%',
                marginBottom: '1rem',
                marginTop: '1rem',
              }} {...startProps} />
            <Box sx={{ margin: '2rem 1rem 0 1rem' }}>  đến </Box>
            <TextField
            sx={{
                width: '35%',
                marginBottom: '1rem',
                marginTop: '1rem',
              }}
             {...endProps} />
          </Box>
        )}
      />
    </LocalizationProvider>
  );
}
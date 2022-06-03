import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './form.scss';
import { addDays } from 'date-fns';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const MultiDatePicker = () => {
  const styles = {
    padding: '11px 16px',
    fontFamily: 'Montserrat',
    fontSize: 16,
    gap: 8,
  };

  const formControlStyle = {
    width: '160px',
    height: '40px',
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  return (
    <div className='container'>
      <div className='datePicker'>
        <div className='rdrMonthAndYearPickers'>
          <div className='monthAndYearWrapper'>
            <div className='rdrMonthPickers'>
              <FormControl className='formControl' style={formControlStyle}>
                <Select
                  style={formControlStyle}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  defaultValue={10}
                >
                  <MenuItem value={10}>October</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='rdrYearPicker'>
              <FormControl className='formControl' style={formControlStyle}>
                <Select
                  style={formControlStyle}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  defaultValue={10}
                >
                  <MenuItem value={10}>2019</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className='monthAndYearWrapper'>
            <div className='rdrMonthPickers'>
              <FormControl className='formControl' style={formControlStyle}>
                <Select
                  style={formControlStyle}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  defaultValue={10}
                >
                  <MenuItem value={10}>October</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='rdrYearPicker'>
              <FormControl className='formControl' style={formControlStyle}>
                <Select
                  style={formControlStyle}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  defaultValue={10}
                >
                  <MenuItem value={10}>2021</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <DateRangePicker
          style={{ fontWeight: 500 }}
          onChange={(item) => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction='horizontal'
        />

        <div className='buttonWrapper'>
          <Button variant='outlined' style={styles} size='medium'>
            Reset
          </Button>
          <Button size='medium' style={styles}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiDatePicker;

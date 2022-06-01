import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './form.scss';
import { addDays } from 'date-fns';
import { useState } from 'react';
import Button from '@mui/material/Button';

const DatePicker = () => {
  const styles = {
    padding: '11px 16px',
    fontFamily: 'Montserrat',
    fontSize: 16,
    gap: 8,
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

export default DatePicker;

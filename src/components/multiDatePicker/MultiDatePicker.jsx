import './multiDatePicker.scss';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import DatePicker, { range, getYear, getMonth } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { forwardRef, useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const MultiDatePicker = () => {
  const styles = {
    padding: '11px 16px',
    fontFamily: 'Montserrat',
    fontSize: 16,
    gap: 8,
  };

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [close, setClose] = useState(false);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      type='text'
      className='mutliDatePickerInput'
      onClick={onClick}
      ref={ref}
      defaultValue={value}
      placeholder={`${getDate('curr')} - ${getDate('next')}`}
    />
  ));

  function range(start, end) {
    return new Array(end - start + 1).fill().map((d, i) => i + start);
  }

  const rangeYears = range(1990, new Date().getFullYear());

  function getDate(date) {
    const d = new Date();

    if (date === 'curr') {
      const date = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return date + '/' + month + '/' + year;
    } else if (date === 'next') {
      const date = d.getDate() + 1;
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return date + '/' + month + '/' + year;
    }
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <div className='container'>
      <div className='datePickerWrapper'>
        <DatePicker
          className='datePickers'
          selectsRange={true}
          dateFormat='dd/MM/yyyy'
          selected={startDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          isClearable
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          monthsShown={2}
          calendarStartDay={3}
          customInput={<ExampleCustomInput />}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <>
              <div
                className='buttonSelect'
                style={{
                  marginTop: 24,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div className='selectWrapper'>
                  <select
                    style={{
                      appearance: 'none',
                    }}
                    className='selectBox'
                    value={months[date.getMonth()]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <KeyboardArrowDownOutlinedIcon className='datePickerIcon' />
                </div>

                <div className='selectWrapper'>
                  <select
                    className='selectBox'
                    style={{
                      appearance: 'none',
                    }}
                    value={date.getYear()}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {rangeYears.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <KeyboardArrowDownOutlinedIcon className='datePickerIcon' />
                </div>
              </div>
            </>
          )}
        >
          <div className='buttonWrapper'>
            <Button
              variant='outlined'
              style={styles}
              size='medium'
              onClick={() => setDateRange([null, null])}
            >
              Reset
            </Button>
            <Button size='medium' style={styles} onClick={() => setClose(true)}>
              Apply
            </Button>
          </div>
        </DatePicker>
      </div>
    </div>
  );
};

export default MultiDatePicker;

import './multiDatePicker.scss';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import DatePicker, { range, getYear, getMonth } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { forwardRef, useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseIcon from '@mui/icons-material/Close';

const MultiDatePicker = () => {
  const styles = {
    padding: '11px 16px',
    fontFamily: 'Montserrat',
    fontSize: 16,
    gap: 8,
  };

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // const [currYear, setCurrYear] = useState(new Date().getFullYear());
  // const [openOptions, setOpenOptions] = useState(false);
  const [close, setClose] = useState(false);
  const [open, setOpen] = useState(false);

  // if (startDate !== null) {
  //   const a = startDate.getDate();
  //   console.log(a);
  // } else if (endDate !== null) {
  //   const b = endDate.getDate();
  //   console.log(b);
  // }

  // const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  //   <>
  //     <input
  //       readOnly
  //       type='text'
  //       className='mutliDatePickerInput'
  //       onClick={onClick}
  //       ref={ref}
  //       defaultValue={value}
  //       placeholder={`${getDate('curr')} - ${getDate('next')}`}
  //     />
  //     {dateRange.map((date, i) =>
  //       date === null ? (
  //         <div className='CalendarPickerIcon' key={i}>
  //           <CalendarMonthOutlinedIcon className='calendarMultiDatePickerIcon' />
  //         </div>
  //       ) : (
  //         ''
  //       )
  //     )}
  //   </>
  // ));

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

  function range(start, end) {
    return new Array(end - start + 1).fill().map((d, i) => i + start);
  }

  //get year from 1990s to present
  const rangeYears = range(1990, new Date().getFullYear());

  function getDefaultDate(date) {
    const d = new Date();

    if (date === 'curr') {
      const date = `0${d.getDate()}`;
      const month = `0${d.getMonth() + 1}`;
      const year = d.getFullYear();
      return date + '/' + month + '/' + year;
    } else if (date === 'next') {
      const date = `0${d.getDate() + 1}`;
      const month = `0${d.getMonth() + 1}`;
      const year = d.getFullYear();
      return date + '/' + month + '/' + year;
    }
  }

  function getDateMonthYear(date) {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return day + '/' + month + '/' + year;
  }

  function closeAndResetDate() {
    setDateRange([null, null]);
    setOpen(false);
  }

  return (
    <div className='datePickerContainer'>
      <div className='datePickerWrapper'>
        <div className='InputDatePickerWrapper'>
          <input
            readOnly
            type='text'
            className={`${
              startDate !== null
                ? 'mutliDatePickerInput'
                : 'mutliDatePickerInput placeholderStart'
            }`}
            onClick={() => setOpen(!open)}
            // placeholder={`${getDefaultDate('curr')}- ${getDefaultDate('next')}`}
            value={`${
              startDate !== null && startDate !== false
                ? `${getDateMonthYear(startDate)} -`
                : `${getDefaultDate('curr')} -`
            } ${
              endDate !== null && endDate !== false
                ? getDateMonthYear(endDate)
                : ``
            }`}
          />
          {dateRange.map((date, i) =>
            date === null ? (
              <div className='CalendarPickerIcon' key={i}>
                <CalendarMonthOutlinedIcon className='calendarMultiDatePickerIcon' />
              </div>
            ) : (
              ''
            )
          )}
          {startDate !== null && (
            <div>
              <CloseIcon
                onClick={closeAndResetDate}
                className='closeBtn'
                fontSize='small'
                style={{ padding: 2 }}
              />
            </div>
          )}
        </div>
        {open && (
          <div className='dateWrapper'>
            <DatePicker
              // customInput={<ExampleCustomInput />}
              className='datePickers'
              showYearDropdown
              scrollableYearDropdown
              selectsDisabledDaysInRange
              selectsRange={true}
              showTimeSelect
              dateFormat='dd/MM/yyyy'
              selected={startDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              inline
              minDate={new Date('01/01/1990')}
              // isClearable
              selectsEnd
              selectsStart
              startDate={startDate}
              endDate={endDate}
              monthsShown={2}
              calendarStartDay={3}
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
                    className={`${
                      open ? 'buttonSelect datePickerIsActive' : 'buttonSelect'
                    }`}
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
                        onChange={({ target: { value } }) => {
                          return changeMonth(months.indexOf(value));
                        }}
                      >
                        {months.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <KeyboardArrowDownOutlinedIcon className='datePickerIcon active' />
                    </div>

                    <div className='selectWrapper'>
                      <select
                        className='selectBox'
                        style={{
                          appearance: 'none',
                        }}
                        defaultValue={new Date().getFullYear()}
                        value={rangeYears[date.getFullYear()]}
                        onChange={({ target: { value } }) => {
                          //value: year
                          return changeYear(value);
                        }}
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
                <Button
                  size='medium'
                  style={styles}
                  onClick={() => setOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </DatePicker>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiDatePicker;

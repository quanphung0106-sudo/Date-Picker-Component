import React, { useState } from 'react';
import { compose } from 'recompose';
import { useIntl } from 'react-intl';
import withFormikField from '../../withFormikField';
import DatePicker from 'react-datepicker';
import Select from '../../Select';
import { Popover, Icon, MenuItem, SvgIcon } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/ic_calendar.svg';
import TextField from '../../TextField';
import { getMonth, getYear } from 'date-fns';
import {
  getLabelMonth,
  MONTHS,
  YEARS,
} from '../../constants/DateDropdownSelect';
import { formatDate, YEAR_MONTH_DATE } from '../../../../utils/date';
import styles from './styles.module.scss';
import CustomScrollbar from '../../Scrollbar';
import clsx from 'clsx';
const InputDatepicker = compose(withFormikField)(function InputDatepicker(
  props
) {
  const {
    label,
    placeholder,
    form = {},
    field = {},
    formik,
    onChange,
    fullWidth = false,
    anchorOrigin = {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin = {
      vertical: 'top',
      horizontal: 'left',
    },
    ...others
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [startDate, setStartDate] = useState(new Date());
  const intl = useIntl();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getIndexMonth = (label) => {
    let index = null;
    if (label) {
      MONTHS.filter((item, i) => {
        if (
          intl.formatMessage({
            id: item.label || ' ',
          }) === label
        ) {
          index = i;
        }
      });
    }
    return index;
  };

  return (
    <>
      <TextField
        className={clsx(
          fullWidth ? styles.widthfull : '',
          open ? styles.inputActive : ''
        )}
        name={'dateOfIncorporation'}
        inputProps={{ 'aria-label': 'Without label' }}
        formik
        label={label}
        placeholder={placeholder}
        aria-describedby={id}
        onClick={handleClick}
        InputProps={{
          endAdornment: (
            <SvgIcon
              style={{ position: 'relative', top: '-4px' }}
              viewBox='0 0 24 24'
              component={CalendarIcon}
            />
          ),
        }}
        disableClearable
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        classes={{ paper: styles.datePickerCustom }}
      >
        <DatePicker
          className={styles.yearFromDatePickerWrap}
          showDatePicker
          dateFormat='dd MMM yyyy'
          inline
          selected={startDate}
          onChange={(date) => {
            handleClose();
            form.setFieldValue(
              field.name,
              formatDate(date, YEAR_MONTH_DATE),
              false
            );
            setStartDate(date);
          }}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className={styles.headerDatePicker}>
              {/* {console.log(date)} */}

              <ChevronLeft
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              />
              <div className={styles.headerMiddleDatePicker}>
                <Select
                  withFormControlProps={{ fullWidth: true }}
                  value={intl.formatMessage({
                    id: getLabelMonth('get_by_index', getMonth(date)) || ' ',
                  })}
                  renderValue={() => {
                    return intl.formatMessage({
                      id: getLabelMonth('get_by_index', getMonth(date)) || ' ',
                    });
                  }}
                  MenuProps={{
                    component: 'div',
                    MenuListProps: { component: 'div' },
                  }}
                  component={'div'}
                  className={styles.selectMonthPicker}
                >
                  <CustomScrollbar>
                    <div>
                      {MONTHS.map((option) => {
                        return (
                          <MenuItem
                            key={option.key}
                            value={intl.formatMessage({
                              id: getLabelMonth(option.value) || ' ',
                            })}
                            component='div'
                            onClick={() => {
                              let idx = getIndexMonth(
                                intl.formatMessage({
                                  id: getLabelMonth(option.value) || ' ',
                                })
                              );
                              changeMonth(idx);
                            }}
                          >
                            {intl.formatMessage({
                              id: getLabelMonth(option.value) || ' ',
                            })}
                          </MenuItem>
                        );
                      })}
                    </div>
                  </CustomScrollbar>
                </Select>

                <Select
                  withFormControlProps={{ fullWidth: true }}
                  value={getYear(date)}
                  renderValue={() => {
                    return getYear(date);
                  }}
                  MenuProps={{
                    component: 'div',
                    MenuListProps: { component: 'div' },
                  }}
                  component={'div'}
                  className={styles.selectYearPicker}
                >
                  <CustomScrollbar>
                    <div>
                      {YEARS.map((option) => (
                        <MenuItem
                          key={option}
                          value={option}
                          component='div'
                          onClick={() => {
                            changeYear(option);
                          }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </div>
                  </CustomScrollbar>
                </Select>
              </div>
              <ChevronRight
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              />
            </div>
          )}
        />
      </Popover>
    </>
  );
});
export default InputDatepicker;

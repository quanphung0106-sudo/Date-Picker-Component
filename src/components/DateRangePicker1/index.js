import React, { useEffect, useRef } from 'react';
import { DateRange } from 'react-date-range';
import styles from './styles.module.scss';

const DateRangePickers = (props) => {
  return <DateRange className={styles.dateRangePicker} {...props} />;
};

export default DateRangePickers;

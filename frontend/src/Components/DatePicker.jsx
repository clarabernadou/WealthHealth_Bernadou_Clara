import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { getYear, getMonth } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function CustomDatePicker({ value, onChange }) {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (value) {
      setStartDate(value);
    }
  }, [value]);

  const handleChange = (date) => {
    setStartDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  const years = Array.from({ length: getYear(new Date()) - 1900 }, (_, index) => 1901 + index);
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
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div style={{ margin: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faChevronLeft} onClick={decreaseMonth} disabled={prevMonthButtonDisabled} />
          <FontAwesomeIcon
            icon={faHome}
            onClick={() => {
              const currentDate = new Date();
              changeMonth(getMonth(currentDate));
              changeYear(getYear(currentDate));
            }}
          />

          <select value={getYear(date)} onChange={({ target: { value } }) => changeYear(Number(value))}>
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FontAwesomeIcon icon={faChevronRight} onClick={increaseMonth} disabled={nextMonthButtonDisabled} />
        </div>
      )}
      selected={startDate}
      onChange={handleChange}
    />
  );
}

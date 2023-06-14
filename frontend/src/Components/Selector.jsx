import React, { useState } from 'react';
import Select from 'react-select';

function Selector({ onChange, inputOptions }) {
  const [stateValue, setStateValue] = useState('');

  const handleChange = (selectedOption) => {
    setStateValue(selectedOption);
    onChange(selectedOption.value);
  };

  return (
    <Select
      placeholder={inputOptions[0].label}
      options={inputOptions}
      value={stateValue}
      onChange={handleChange}
      id='state'
    />
  );
}

export default Selector;
import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  // Create initial state
  initialState: [
    {
      firstName: '',
      lastName: '',
      birthDate: '',
      startDate: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      department: '',
    },
    {
      firstName: '',
      lastName: '',
      birthDate: '',
      startDate: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      department: '',
    },
  ],
  reducers: {
    // Create an 'addData' action
    addData: (state, action) => {
      const { firstName, lastName, birthDate, startDate, street, city, state: addressState, zipCode, department } = action.payload; // Extract payload values from the action
      
      // Create a new data object with the extracted values
      const newData = {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        startDate: startDate,
        address: {
          street: street,
          city: city,
          state: addressState,
          zipCode: zipCode,
        },
        department: department,
      };

      // Push the new data object into the state
      state.push(newData);
    },
  },
});

// Export the 'addData' action
export const { addData } = dataSlice.actions;

// Export the reducer function
export default dataSlice.reducer;

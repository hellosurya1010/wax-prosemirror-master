const { createSlice } = require("@reduxjs/toolkit");


export const referenceElementSlice = createSlice({
    initialState: [],
    name: "referenceElements",
    reducers: {
        addElements(state, action) {
            return action.payload;
        }
    }
});

export const referenceElementReducer = referenceElementSlice.reducer;

export const { addElements } = referenceElementSlice.actions;

export const referenceElementSelector = state => state.referenceElements;
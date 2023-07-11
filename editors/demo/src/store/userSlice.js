const { createSlice } = require("@reduxjs/toolkit");


export const userSlice = createSlice({
    name: 'user',
    initialState: { "token": null, "user_id": null, "user_email": null, "user_name": null },
    reducers: {
        updateAll(state, action) {
            state = action.payload;
        }
    }
});

export const userReducer = userSlice.reducer;
export const { updateAll } = userSlice.actions;

export const userSelector = state => state.user;

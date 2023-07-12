const { createSlice } = require("@reduxjs/toolkit");


export const userSlice = createSlice({
    name: 'user',
    initialState: { "token": null, "user_id": null, "user_email": null, "user_name": null },
    reducers: {
        updateAll(state, action) {
            return action.payload;
            state = action.payload;
            console.log(state);
            return state;
        }
    }
});

export const userReducer = userSlice.reducer;
export const { updateAll } = userSlice.actions;

export const userSelector = state => state.user;

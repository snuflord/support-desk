import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// NOTE - importing functions does not require to be in object brackets. 
import authService from './authService'

// get user from local storage: looking for key of user (defined in authService) and then retrieving associated data.

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    // setting state of user to user retrieved from local storage, or null
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// register new user
// exporting function so it can be imported in Register.jsx
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        // data returned (payload)
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString
        // rejecting with the values of any of the message types defined in message object.
        return thunkAPI.rejectWithValue(message)
    }
})


// login user
// exporting function so it can be imported in Register.jsx
// 'auth/login' is the url route created, which takes in the user object, and ...
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.logIn(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString
        // same error as register
        return thunkAPI.rejectWithValue(message)
    }
})

// LOG OUT USER

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

// name of reducer is auth, which is called in Register.jsx: const {} = useSelector(state => state.auth)
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // adding new reset reducer in the case of rejected - exported as authSlice.actions 
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    // here are our extra reducers that can be seen in redux dev tools: includes pending and rejected
    extraReducers: (builder) => {
        // in the case of pending - add a case to the builder, which takes in the state (initialState)
        builder.addCase(register.pending, (state) => {
            // if loading, set loading to true
            state.isLoading = true})

            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // action carries payload on the event of success (data)
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                // the payload here comes from .catch(error) in the register function. 
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // action carries payload on the event of success (data)
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                // the payload here comes from .catch(error) in the register function. 
                state.message = action.payload
                state.user = null
            })
    }
})

// authSlice is exported as a reducer, called in Store.js
export default authSlice.reducer
// reset reducer exported
export const {reset} = authSlice.actions
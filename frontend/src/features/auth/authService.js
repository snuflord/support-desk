import axios from 'axios'


const API_URL = '/api/users'
const API_USER_URL = '/api/users/login'

// Register User

// async function takes in userdata as function parameter 
const register = async (userData) => {
    // the response awaits a post request via axios (javascript library used to make http requests). It takes in the url, and then passes the user data entered by the user. 
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        // setItem to local storage: 'user' is the key. The returned data is parsed to string
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    // returns user data and token
    return response.data
}

// LOG USER IN

// async function takes in userdata as function parameter
const logIn = async (userData) => {
    
    const response = await axios.post(API_USER_URL, userData)

    if(response.data) {
        // setItem to local storage: 'user' is the key. The returned data is parsed to string
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    // returns user data and token
    return response.data
}



// LOG OUT USER - handles logging out user - called in authSlice as an async function

const logout = () => localStorage.removeItem('user')


// exporting above function in object (same name as file)
const authService =  {
    register,
    logIn,
    logout,
}

// exporting object that contains function - imported into authSlice
export default authService
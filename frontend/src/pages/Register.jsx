import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
// use selector allows us to select anything from global state, useDispatch dispatches actions, such as register. 
import {useSelector, useDispatch } from 'react-redux'
// importing register function from authSlice, which contains the asynchronous function. 
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Register() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

   const  {name, email, password, password2} = formData

   // declaring useDispatch function. 
   const dispatch = useDispatch()

   // auth is the state declared in authSlice.js - bringing in the properties from initialState, which is a part of the authSlice reducer.
   const {user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

   useEffect(() => {
    if(isError) {
        toast.error(message)
    }
    // redirect when logged in
    if(isSuccess || user) {
        navigate('/')
    }
    // reset reducer function imported from authSlice
    dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

   const onChange = (e) => {
    setFormData((prevstate) => ({
        ...prevstate,
        [e.target.id]: e.target.value
    }))
   }

   const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2) {
        toast.error('Passwords do not match')
    } else {
        const userData = {
            name,
            email,
            password,
        }
        // dispatch calls register function, taking in userData: the (user) function parameter in the register function. userData has been updated in this file, and sent to register function in authService.
        dispatch(register(userData))
    }
   }

   if(isLoading) {
    return <Spinner />
   }

  return (
    <>
        <section className="section heading">
            <h1>
                <FaUser/> Register
            </h1>
            <p>Create profile</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input type="text" className="form-control" id='name' placeholder='Enter name' value={name} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <input type="email" className="form-control" id='email' placeholder='Enter email' value={email} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <input type="password" className="form-control" id='password' placeholder='Create password' value={password} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <input type="password" className="form-control" id='password2' placeholder='Confirm password' value={password2} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <button className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register
import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import {useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const  { email, password, } = formData

    const navigate = useNavigate()

    // declaring useDispatch function. 
    const dispatch = useDispatch()

    // auth is the state declared in authSlice.js - bringing in the properties from initialState
    const {user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        // redirect when logged in
        if(isSuccess || user) {
            navigate('/')
        }
        // execute reset reducer function imported from authSlice
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
        
    const userData = {
        email,
        password
    }
    // login function from authSlice
    dispatch(login(userData))
   }

   if(isLoading) {
    return <Spinner />
   }

  return (
    <>
        <section className="section heading">
            <h1>
                <FaSignInAlt/> Sign In 
            </h1>
            <p>Log in for support</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                
                <div className='form-group'>
                    <input type="email" className="form-control" id='email' placeholder='Enter email' value={email} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <input type="password" className="form-control" id='password' placeholder='Enter password' value={password} onChange={onChange} required/>
                </div>
            
                <div className="form-group">
                    <button className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login
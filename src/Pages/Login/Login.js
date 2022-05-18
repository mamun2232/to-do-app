import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react';
import { useAuthState, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import './login.css'
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import Loading from '../Utilites/Loading';

const Login = () => {
      const { register, handleSubmit, watch, formState: { errors } } = useForm();
      const navigate = useNavigate()
      const [user] = useAuthState(auth)
      const emailRef = useRef('')
      const location = useLocation()
       // create account 
        // create account 
      const [
            signInWithEmailAndPassword,
            Cuser,
            loading,
            error,
          ] = useSignInWithEmailAndPassword(auth);

      

       // signUp gooogle 
       const [signInWithGoogle, Guser, Gloading, Gerror] = useSignInWithGoogle(auth);

      
       const [sendPasswordResetEmail, sending, Perror] = useSendPasswordResetEmail(
            auth
          );

      const onSubmit = data => {
       signInWithEmailAndPassword(data.email, data.password)
      };

      

      let from = location.state?.from?.pathname || "/";

      const googleLogin = () =>{
            signInWithGoogle()

      }
        // show arror massage 
        let errorMassage;
        if(Gloading || loading){
            return <Loading></Loading>

      }

        if (error || Gerror) {
              errorMassage = <p className='text-danger'>{error?.message}</p>
  
  
        }
        if(user){
              navigate(from, { replace: true })
        }
        const forgatePasswordHundeler = ()=>{
            const email = emailRef.current.value
          
            if(email){
                  sendPasswordResetEmail(email)
                  toast('Reset Password sent')
       
                  }
                  else{
                        toast("Please Provite a email")

                  }

      }

      
    
      return (
            <div>
                   <div>
                  <div className="login-from bg-white">
                        <div>
                              <h3 className='text-center my-5 primary-text'>Please Login</h3>
                              <form onSubmit={handleSubmit(onSubmit)} >
                                    <div className="input-grups">

                                          <input
                                          ref={emailRef}
                                                {...register("email", {
                                                      required: {
                                                            value: true,
                                                            message: 'Email is Required'
                                                      },
                                                      pattern: {
                                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                                            message: 'Provide a valid Email'
                                                      }
                                                })}

                                                className='input-shadow ' placeholder='Email' type="email" name="email" id="" />
                                          <br />
                                          <label class="label">

                                                {errors.email?.type === 'required' && <span className='text-danger'>{errors.email.message}</span>}

                                                {errors.email?.type === 'pattern' && <span className='text-danger'>{errors.email.message}</span>}




                                          </label>
                                          <input
                                                {...register("password",
                                                      {
                                                            required: {
                                                                  value: true,
                                                                  massage: "Password is Requied"
                                                            },
                                                            minLength: {
                                                                  value: 6,
                                                                  message: 'Must be 6 characters or longer'
                                                            }

                                                      })}

                                                className='input-shadow' placeholder='Password' type="password" name="password" id=""  /><br />
                                                <small onClick={()=> forgatePasswordHundeler()} className='text-end text-primary'>Forgate Password</small>

                                          <label class="label">

                                                {errors.password?.type === 'required' && <span className='text-danger'>{errors.password.message}</span>}

                                                {errors.password?.type === 'minLength' && <span className='text-danger'>{errors.password.message}</span>}


                                          </label>

                                          {errorMassage }

                                          {/* <div className='mt-2'>
                                                                  <input onClick={() => setAgree(!agree)} type="checkbox" name="chack" id="" />
                                                                  <label className={`px-2 ${agree ? '' : 'text-danger'}`} htmlFor="">Accept Walton Terms and Conditions</label>
                                                            </div> */}
                                          {/* disabled={!agree}  */}
                                          <input className='primary-btn' type="submit" value="Login" />



                                    </div>
                              </form>
                              <p className='text-center mt-2'>To do app new? <span onClick={()=> navigate('/register')}>Please register</span></p>

                              <div className="socail-login mt-3">
                  <div className="login-bottom">
                        <div className='login'></div>
                        <div>
                              <p>or</p>

                        </div>
                        <div className='login'></div>
                  </div>
                  <div className="social-icon mt-3">
                        <div onClick={googleLogin} className='google '>
                        
                        <FcGoogle className='icon'></FcGoogle>
                        <span className='read-text'>Continue With google</span>
                        </div>
                  
                  </div>
            </div>

                        </div>


                  </div>
            </div>
            </div>
      );
};

export default Login;
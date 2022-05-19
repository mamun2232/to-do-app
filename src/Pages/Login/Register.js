import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Utilites/Loading';

const Register = () => {
      const { register, handleSubmit, watch, formState: { errors } } = useForm();
      const navigate = useNavigate()
      const [user] = useAuthState(auth)
       // create account 
       const [
            createUserWithEmailAndPassword,
            Cuser,
            loading,
            error,
      ] = useCreateUserWithEmailAndPassword(auth);

      //     update fofile 
      const [updateProfile, updating, Uperror] = useUpdateProfile(auth);

       // signUp gooogle 
       const [signInWithGoogle, Guser, Gloading, Gerror] = useSignInWithGoogle(auth);

      


      const onSubmit = async data => {
            await createUserWithEmailAndPassword(data.email, data.password)
            await updateProfile({ displayName: data.name })
      };
      const googleLogin = () =>{
            signInWithGoogle()

      }

      if(Gloading || loading){
            return <Loading></Loading>

      }
        // show arror massage 
        let errorMassage;

        if (error || Uperror) {
              errorMassage = <p className='text-danger'>{error?.message}</p>
  
  
        }

        if(user){
              navigate('/')
        }
      
      return (
            <div className=''>
                  <div className="login-from">
                        <div>
                              <h3 className='text-center my-5 primary-text'>Register</h3>
                              <form onSubmit={handleSubmit(onSubmit)} >
                                    <div className="input-grups">
                                          <input
                                                {...register("name", {
                                                      required: {
                                                            value: true,
                                                            message: 'Name is Required'
                                                      }

                                                })}
                                                className='input-shadow' placeholder='Name' type="text" name="name" id=""  />
                                          <label class="label">

                                                {errors.name?.type === 'required' && <span className='text-danger'>{errors.name.message}</span>}

                                          </label>
                                          <br />
                                          <input
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

                                                className='input-shadow mb-2' placeholder='Email' type="email" name="email" id="" />
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

                                          <label class="label">

                                                {errors.password?.type === 'required' && <span className='text-danger'>{errors.password.message}</span>}

                                                {errors.password?.type === 'minLength' && <span className='text-danger'>{errors.password.message}</span>}


                                          </label>

                                          {errorMassage }

                                         
                                          <input className='primary-btn' type="submit" value="Register" />



                                    </div>
                              </form>
                              <p className='text-center mt-2'>All Ready Account? <span className='text-primary pointer' onClick={()=> navigate('/login')}>Please Login</span></p>

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
                       
                        {/* <FaFacebook className='icon'></FaFacebook>
                        <FaGithub className='icon'></FaGithub> */}

                  </div>
            </div>

                        </div>


                  </div>
            </div>
      );
};

export default Register;
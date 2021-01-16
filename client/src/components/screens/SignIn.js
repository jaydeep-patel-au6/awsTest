import React, { Component, useState,useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {UserContext} from '../../App'
import M from "materialize-css";
import { ToastContainer, toast } from 'react-toastify'
import authSvg from '../assests/login.svg'


const SignIn = () => {
  var {state,dispatch}=useContext(UserContext)
  var history = useHistory();
  var [password, setPassword] = useState("");
  var [email, setEmail] = useState("");

  //Posting data

  var PostData = () => {
    fetch("/signIn", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user);
        if (data.error) {
          M.toast({ html: data.error, classes: "#d50000 red accent-4" });
        } else {
          localStorage.setItem("jwt",data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({type:"USER",payload:data.user})
          M.toast({
            html: " Signed In successfully",
            classes: "#4caf50 green",
          });
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // return (
  //   <div className="mycard ">
  //     <div className="card auth-card input-field">
  //       <h2>Recycal Yard</h2>

  //       <input
  //         type="text"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //       <button
  //         className="btn waves-effect waves-light #64b5f6 blue lighten-2"
  //         onClick={() => PostData()}
  //       >
  //         Login
  //       </button>
  //       <h6>
  //         <Link to="/signup">Don't have an account</Link>
        
  //       </h6>
  //       <h6>
  //         <Link to="/reset">Forgot Password</Link>
        
  //       </h6>
  //     </div>
  //   </div>

    
  // );
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
       
        <ToastContainer></ToastContainer>

        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
            <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                <div className='mt-12 flex flex-col items-center'>

                    <h1 className='text-2xl xl:text-3xl font-extrabold'>
                        Sign In for User
                    </h1>

                   

                    


                        {/* email */}
                        <input
                            className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        

                        {/* password */}
                        <input
                            className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                            type='password'
                            placeholder='Password'
                          
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />



                        {/* button */}
                        <button
                            onClick={() => PostData()}
                            type='submit'
                            className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                        >
                            <i className='mr-5 fas fa-user-plus fa 1x w-6  -ml-2' />
                           Login
                        </button>
                   


                    

                    {/* login */}
                    <div className='mt-5 flex flex-col items-center'>
                    
                        <a
                            className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                            href='/reset'
                            target='_self'
                        >
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-arrow-bar-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                   <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
                            </svg>
                            <span className='ml-4'>Forgot Password</span>
                        </a>
                       
                    </div>





                </div>
            </div>

            {/* side img */}
            <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
                <div
                    className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
                    style={{ backgroundImage: `url(${authSvg})` }}
                ></div>
            </div>
        </div>
    </div>
)
};

export default SignIn;

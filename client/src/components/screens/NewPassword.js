import React,{useState,useContext,} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'
import authSvg from '../assests/reset.svg'
import { ToastContainer, toast } from 'react-toastify'


const SignIn  = ()=>{
    const history = useHistory()
    const [password,setPasword] = useState("")
    const {token} = useParams()
    console.log(token)
    const PostData = ()=>{
        fetch("/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{

               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
//    return (
//       <div className="mycard">
//           <div className="card auth-card input-field">
//             <h2>Instagram</h2>
        
//             <input
//             type="password"
//             placeholder="enter a new password"
//             value={password}
//             onChange={(e)=>setPasword(e.target.value)}
//             />
//             <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
//             onClick={()=>PostData()}
//             >
//                Update password
//             </button>
    
//         </div>
//       </div>
//    )

return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
        <ToastContainer />
        <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
            <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                <div className='mt-12 flex flex-col items-center'>
                    <h1 className='text-2xl xl:text-3xl font-extrabold'>
                        Reset Your Password
        </h1>
                    <div className='w-full flex-1 mt-8 text-indigo-500'>

                      
                            <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                type='password'
                                placeholder='Enter New Password'
                                value={password}
                                onChange={(e)=>setPasword(e.target.value)}
                            />
                            
                            <button
                                onClick={()=>PostData()}
                                type='submit'
                                className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                            >
                                <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                                <span className='ml-3'>Submit</span>
                            </button>
                       
                    </div>
                </div>
            </div>
            <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
                <div
                    className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
                    style={{ backgroundImage: `url(${authSvg})` }}
                ></div>
            </div>
        </div>
  
    </div>
)
}


export default SignIn

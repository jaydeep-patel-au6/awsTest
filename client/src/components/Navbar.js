import React, { Component,useContext,useRef,useEffect,useState } from 'react';
import Profile from './screens/Profile';
import {Link,useHistory} from "react-router-dom";

import { UserContext } from './../App';
import ScrapRequest from './screens/ScrapRequest';
import M from 'materialize-css'

const NavBar = () => {
  const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])

     
  var renderList=()=>{
    if (state)   
    {
      return[
        <div className="container" style={{fontFamily:  'Sansita Swashed, cursive', fontSize: 25}}>
        <li><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Post craft Ideas</Link></li>,
        <li><Link to="/ScrapRequest">Scrap Request</Link></li>,
        <li><Link to="/ScrapDetails">ScrapDetails</Link></li>,
        <li><Link to="/Shopping">Shopping</Link></li>,

        <li><button
        className="m-1 btn btn-danger"
        onClick={() => {localStorage.clear()
          dispatch({type:"CLEAR"})
        history.push('/signin')}} 
      >
        LogOut
      </button></li></div>
      ]

    }else{
      return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>,
        <li><Link to="/adminData">Admin</Link></li>,
      ]

    }
  }

  const fetchUsers = (query)=>{
    setSearch(query)
    fetch('/search-users', {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(results=>{
      setUserDetails(results.user)
    })
 }

    return ( <nav>
        <div className="nav-wrapper white" >
          <Link to={state?"/" : "/signin"} className="brand-logo left ml-5" style={{fontFamily:  "Special Elite, cursive, Ultra, serif", fontSize: 28}}><i className="fa fa-recycle fa_custom fa-2x"></i>RecycleYard</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
        <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
      </nav> );
}
 
export default NavBar;
import React, { Component,useEffect,useState,useContext } from "react";
import {UserContext} from '../../App'

const Profile = () => {
  var [mypics,setPics]=useState([])
  var {state,dispatch}=useContext(UserContext)
  var [image, setImage] = useState("");
  var [url, setURL] = useState(undefined);
  useEffect(()=>
  {
fetch('/mypost',{
  headers:{
    "Authorization":"Bearer "+localStorage.getItem("jwt")
  }
}).then((res)=>res.json())
.then((result)=>{console.log("PROFILE",result)
setPics(result.mypost)})
  },[])

 useEffect(()=>
 {
   if(image)
   {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "djztjkizu");
    fetch("	https://api.cloudinary.com/v1_1/djztjkizu/image/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
       // setURL(data.url);
        // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
        // dispatch({type:"UPDATEPIC",payload:data.url})
        fetch('/updatepic',{
          method:"put",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body:JSON.stringify({
            pic:data.url
          })
 
        }).then((res)=>res.json())
        .then((result)=>
        {
          console.log("PHOTO",result)
         localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
        dispatch({type:"UPDATEPIC",payload:result.pic})
        window.location.reload();
        })
      })
      .catch((error) => {
        console.error("Error:", error);
      });

   }

 },[image])
 
  //UPDATE_PHOTO
  var updatePhoto=(file)=>
  {
    setImage(file)
  
  }

  return (
    <div style={{maxWidth:"550px",margin:"0px auto"}}>  
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state ? state.pic : "Loading..."}
          />
        
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue lighten-2">
            <span> Profile Pic</span>
            <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        </div>
        <div className='m-5 p-5'>
          <h1 className='m-1 p-1' style={{fontFamily: 'Shadows Into Light'}}><b>{state?state.name:"loading"}</b></h1>
          <p className='m-1 p-1'>{state?state.email:"loading"}</p>
          <div
            style={{
              display: "flex",
              width: "108%",
              justifyContent: "space-between",
            }}
          >
           
          </div>
          
        </div>
        
      </div>
      <div className="gallery">
        {
          mypics.map((item)=>
          {
            return(
              <img className="item" src={item.photo} alt={item.title }/>
            )
          })
        }
        </div>
    </div>
  );
};

export default Profile;
